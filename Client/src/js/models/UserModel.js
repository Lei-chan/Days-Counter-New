import { BASE_URL } from "../config.js";

const health = async function () {
  try {
    const res = await fetch(`${BASE_URL}/user/health`);

    if (!res.ok) return { success: false };

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Server not connected");
  }
};

class UserManageApi {
  _accessToken;
  _curUser;

  _removeCurUserInfo() {
    this._accessToken = null;
    this._curUser = null;
  }

  async _apiCall(url, options) {
    try {
      let res;
      res = await fetch(`${BASE_URL}${url}`, options);

      //If token expired, try to refresh once
      if (res.status === 403 || res.status === 401) {
        await this._refreshAccessToken();
        res = await fetch(`${BASE_URL}${url}`, options);
      }

      // return res;
      const data = await res.json();
      if (!res.ok) {
        const err = new Error(data.message);
        err.statusCode = res.status;
        err.name = data.name || "";
        throw err;
      }

      return data;
    } catch (err) {
      throw err;
    }
  }

  async _refreshAccessToken() {
    try {
      const data = await this._apiCall("/user/refresh", {
        method: "POST",
        credentials: "include",
      });
      this._accessToken = data.accessToken;
      return data.accessToken;
    } catch (err) {
      err.message = `Error while refreshing token: ${err}`;
      throw newError;
    }
  }

  async _saveUserData() {
    try {
      console.log("Final user data in UserManageApi", this._curUser);
      const data = await this.updateUser(this._curUser);
      console.log("User updated data was saved successfully 🎉", data.user);
    } catch (err) {
      throw err;
    }
  }

  /////OK!
  async login(username, password) {
    try {
      const data = await this._apiCall("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      this._accessToken = data.accessToken;
      this._curUser = data.user;

      let newRemainingDaysNow;
      let newRemainingDaysNowRooms;
      let newHowManyTimesClick;
      let newHowManyTimesClickRooms;
      let updatedRooms;

      if (this._curUser.goals.length) {
        newRemainingDaysNow = this._calcRemainingDays("goals");
        newHowManyTimesClick = this._calcHowManyTimesClick(
          this._curUser.remainingDaysPrev,
          newRemainingDaysNow
        );
      }

      if (this._curUser.rooms.length) {
        newRemainingDaysNowRooms = this._calcRemainingDays("rooms");
        newHowManyTimesClickRooms = this._calcHowManyTimesClick(
          this._curUser.remainingDaysPrevRooms,
          newRemainingDaysNowRooms
        );

        const roomIds = this._curUser.rooms.map((room) => room.roomId);

        updatedRooms = await this._getRooms(roomIds);
      }

      await this.updateUser({
        remainingDaysNow: newRemainingDaysNow || [],
        remainingDaysNowRooms: newRemainingDaysNowRooms || [],
        howManyTimesClick: newHowManyTimesClick || [],
        howManyTimesClickRooms: newHowManyTimesClickRooms || [],
        rooms: updatedRooms || [],
      });

      this._changeOrders("goals");
      this._changeOrders("rooms");

      console.log(this._curUser);
    } catch (err) {
      throw err;
    }
  }

  ////OK
  //UserInfo = { username, password, email=''}
  async createUser({ email = undefined, ...others }) {
    try {
      const userInfo = email ? { ...others, email } : { ...others };

      const data = await this._apiCall("/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userInfo),
      });

      this._accessToken = data.accessToken;
      this._curUser = data.user;
    } catch (err) {
      throw err;
    }
  }

  // async getCurrentUser() {
  //   try {
  //     if (!this._accessToken) await this._refreshAccessToken();
  //     const res = await this._apiCall("/user/get", {
  //       headers: {
  //         Authorization: `Bearer ${this._accessToken}`,
  //       },
  //       credentials: "include",
  //     });

  //     const data = await res.json();

  //     if (!res.ok)
  //       return {
  //         success: false,
  //         message: data.message,
  //         statusCode: res.status,
  //       };

  //     return data.user;
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }

  //updateInfo = { updateField: updateValue }
  async updateUser(updateInfo) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      const data = await this._apiCall("/user/update/general", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(updateInfo),
      });

      this._curUser = data.user;

      return data;
    } catch (err) {
      throw err;
    }
  }

  //////OK
  async logout() {
    try {
      await this._apiCall("/user/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
      });

      this._removeCurUserInfo();
    } catch (err) {
      throw err;
    }
  }

  /////Soon!!!
  // async deleteUser(password) {
  //   try {
  //     if (!this._accessToken) await this._refreshAccessToken();

  //     const data = await this._apiCall("/user/delete", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${this._accessToken}`,
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ password }),
  //     });

  //     this._removeCurUserInfo();

  //     console.log(data.message);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  /////OK!
  async _updateForDaysCounter(type) {
    try {
      const updatedRemainingDaysPrev = this._calcUpdatedRemainingDaysPrev(type);
      const updatedHowManyTimesClick = this._calcHowManyTimesClick(
        updatedRemainingDaysPrev,
        type === "goals"
          ? this._curUser.remainingDaysNow
          : this._curUser.remainingDaysNowRooms
      );

      type === "goals"
        ? await this.updateUser({
            remainingDaysPrev: updatedRemainingDaysPrev,
            howManyTimesClick: updatedHowManyTimesClick,
          })
        : await this.updateUser({
            remainingDaysPrevRooms: updatedRemainingDaysPrev,
            howManyTimesClickRooms: updatedHowManyTimesClick,
          });
    } catch (err) {
      throw err;
    }
  }

  /////OK
  async saveToDoListsComments(
    type,
    modifiedCard,
    newToDoLists,
    checkedOrNotArr,
    newComments
  ) {
    try {
      //update user
      const updateFor =
        type === "goals"
          ? this._curUser.goals[modifiedCard]
          : this._curUser.rooms[modifiedCard];

      let updatedGoalRoom;
      if (newToDoLists || newToDoLists === "") {
        const { toDoLists, toDoListsCheckbox, ...others } = updateFor;
        updatedGoalRoom = {
          toDoLists: newToDoLists,
          toDoListsCheckbox: checkedOrNotArr || [],
          ...others,
        };
      }

      if (newComments || newComments === "") {
        const { comments, ...others } = updateFor;
        updatedGoalRoom = { comments: newComments, ...others };
      }

      if (type === "goals") {
        const newGoals = this._curUser.goals.toSpliced(
          modifiedCard,
          1,
          updatedGoalRoom
        );

        await this.updateUser({ goals: newGoals });
      }

      if (type === "rooms") {
        const newRooms = this._curUser.rooms.toSpliced(
          modifiedCard,
          1,
          updatedGoalRoom
        );

        await this.updateUser({ rooms: newRooms });

        ///Update room
        const modifiedRoomId = this._curUser.rooms[modifiedCard].roomId;

        newToDoLists || newToDoLists === ""
          ? await this.updateRoom(modifiedRoomId, {
              toDoLists: newToDoLists,
              toDoListsCheckbox: checkedOrNotArr || [],
            })
          : await this.updateRoom(modifiedRoomId, { comments: newComments });
      }
    } catch (err) {
      throw err;
    }
  }

  /////OK!
  async saveGoalsInfo(goalsInfo) {
    try {
      const type = "goals";

      const newRemainingDaysPrev = [
        ...this._curUser.remainingDaysPrev,
        ...this._calcRemainingDays(type, goalsInfo),
      ];

      const newRemainingDaysNow = [
        ...this._curUser.remainingDaysNow,
        ...this._calcRemainingDays(type, goalsInfo),
      ];

      const newHowManyTimesClick = this._calcHowManyTimesClick(
        newRemainingDaysPrev,
        newRemainingDaysNow
      );
      console.log("howManyTimesClick:", this._curUser.howManyTimesClick);
      console.log("newHowManyTimesClick:", newHowManyTimesClick);

      await this.updateUser({
        goals: [...this._curUser.goals, ...goalsInfo],
        remainingDaysPrev: newRemainingDaysPrev,
        remainingDaysNow: newRemainingDaysNow,
        howManyTimesClick: newHowManyTimesClick,
      });

      this._changeOrders(type);
      // await this.saveHowManyTimesClick(type);

      return {
        message: `${
          type.at(0).toUpperCase + type.slice(1)
        } updated successfully!`,
      };
    } catch (err) {
      throw err;
    }
  }

  /////OK!
  async saveRoomsInfo(roomsInfo, roomType) {
    try {
      const type = "rooms";

      if (roomType !== "id") await this._roomsCreateSelect(type, roomsInfo);

      // await this._roomsCreateSelect(type, roomsInfo, sharingUsernames);

      if (roomType === "id") {
        const sharingUsernames = await this._findUserRooms(roomsInfo, roomType);
        await this._roomsJoinId(type, roomsInfo, sharingUsernames);
      }

      this._changeOrders(type);
    } catch (err) {
      throw err;
    }
  }

  /////OK!
  async _findUserRooms(roomsInfo) {
    try {
      const data = await Promise.all(
        roomsInfo.map((roomId) =>
          this._apiCall(`/room/findUsers/${roomId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
        )
      );

      const sharingUsernames = data.map((data) => [
        ...data.usernames,
        this._curUser.username,
      ]);

      console.log(sharingUsernames);

      return sharingUsernames;
    } catch (err) {
      console.error("Error while finding users for room", err);
      throw err;
    }
  }

  /////OK!
  async _roomsCreateSelect(type, roomsInfo) {
    try {
      const newRoomsWithUsernames = roomsInfo.map((room) => {
        return { ...room, usernames: [this._curUser.username] };
      });

      await this.createRooms(newRoomsWithUsernames);

      ///Update userInfo
      const newRemainingDaysPrevRooms = [
        ...this._curUser.remainingDaysPrevRooms,
        ...this._calcRemainingDays(type, roomsInfo),
      ];

      const newRemainingDaysNowRooms = [
        ...this._curUser.remainingDaysNowRooms,
        ...this._calcRemainingDays(type, roomsInfo),
      ];

      const newHowManyTimesClickRooms = this._calcHowManyTimesClick(
        newRemainingDaysPrevRooms,
        newRemainingDaysNowRooms
      );

      await this.updateUser({
        rooms: [...this._curUser.rooms, ...newRoomsWithUsernames],
        remainingDaysPrevRooms: newRemainingDaysPrevRooms,
        remainingDaysNowRooms: newRemainingDaysNowRooms,
        howManyTimesClickRooms: newHowManyTimesClickRooms,
      });
    } catch (err) {
      throw err;
    }
  }

  /////OK!
  async _roomsJoinId(type, roomIds, sharingUsernames) {
    try {
      await Promise.all(
        roomIds.map((roomId, i) =>
          this.updateRoom(roomId, { usernames: sharingUsernames[i] })
        )
      );

      const rooms = await this._getRooms(roomIds);

      ///Update userInfo
      const newRemainingDaysPrevRooms = [
        ...this._curUser.remainingDaysPrevRooms,
        ...this._calcRemainingDays(type, rooms),
      ];

      const newRemainingDaysNowRooms = [
        ...this._curUser.remainingDaysNowRooms,
        ...this._calcRemainingDays(type, rooms),
      ];

      const newHowManyTimesClickRooms = this._calcHowManyTimesClick(
        newRemainingDaysPrevRooms,
        newRemainingDaysNowRooms
      );

      await this.updateUser({
        rooms: [...this._curUser.rooms, ...rooms],
        remainingDaysPrevRooms: newRemainingDaysPrevRooms,
        remainingDaysNowRooms: newRemainingDaysNowRooms,
        howManyTimesClickRooms: newHowManyTimesClickRooms,
      });
    } catch (err) {
      throw err;
    }
  }

  /////OK!
  async createRooms(newRoomsWithUsernames) {
    try {
      const data = await Promise.all(
        newRoomsWithUsernames.map((newRoom) =>
          this._apiCall("/room/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRoom),
          })
        )
      );
    } catch (err) {
      throw err;
    }
  }

  /////OK!
  async _getRooms(roomIds) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      const data = await Promise.all(
        roomIds.map((roomId) =>
          this._apiCall(`/room/${roomId}`, {
            headers: {
              Authorization: `Bearer ${this._accessToken}`,
            },
            credentials: "include",
          })
        )
      );

      const rooms = data.map((data) => data.room);

      return rooms;
    } catch (err) {
      err.message = "Error while getting rooms";
      throw err;
    }
  }

  //////OK
  async updateRoom(roomId, updateInfo) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      const data = await this._apiCall(`/room/update/${roomId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(updateInfo),
      });

      console.log(data.room);
      return data.room;
    } catch (err) {
      throw err;
    }
  }

  ////////OK
  async editGoalRoom(editGoalRoomIndex, editedGoalRoomInfo, type) {
    try {
      if (type === "goals") {
        const newGoals = this._curUser.goals.fill(
          editedGoalRoomInfo,
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        const newRemainingDaysPrev = this._curUser.remainingDaysPrev.fill(
          ...this._calcRemainingDays(type, editedGoalRoomInfo),
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        const newRemainingDaysNow = this._curUser.remainingDaysNow.fill(
          ...this._calcRemainingDays(type, editedGoalRoomInfo),
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        const newHowManyTimesClick = this._calcHowManyTimesClick(
          newRemainingDaysPrev,
          newRemainingDaysNow
        );

        await this.updateUser({
          goals: newGoals,
          remainingDaysPrev: newRemainingDaysPrev,
          remainingDaysNow: newRemainingDaysNow,
          howManyTimesClick: newHowManyTimesClick,
        });
      }

      if (type === "rooms") {
        const newRooms = this._curUser.rooms.fill(
          editedGoalRoomInfo,
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        const newRemainingDaysPrevRooms =
          this._curUser.remainingDaysPrevRooms.fill(
            ...this._calcRemainingDays(type, editedGoalRoomInfo),
            editGoalRoomIndex,
            editGoalRoomIndex + 1
          );

        const newRemainingDaysNowRooms =
          this._curUser.remainingDaysNowRooms.fill(
            ...this._calcRemainingDays(type, editedGoalRoomInfo),
            editGoalRoomIndex,
            editGoalRoomIndex + 1
          );

        const newHowManyTimesClickRooms = this._calcHowManyTimesClick(
          newRemainingDaysPrevRooms,
          newRemainingDaysNowRooms
        );

        await this.updateUser({
          rooms: newRooms,
          remainingDaysPrevRooms: newRemainingDaysPrevRooms,
          remainingDaysNowRooms: newRemainingDaysNowRooms,
          howManyTimesClickRooms: newHowManyTimesClickRooms,
        });

        await this.updateRoom(editedGoalRoomInfo.roomId, editedGoalRoomInfo);
      }

      this._changeOrders(type);
    } catch (err) {
      throw err;
    }
  }

  ////OK
  async deleteGoal(deleteGoalIndex) {
    try {
      const newGoals = this._curUser.goals.toSpliced(deleteGoalIndex, 1);
      const newRemainingDaysPrev = this._curUser.remainingDaysPrev.toSpliced(
        deleteGoalIndex,
        1
      );
      const newRemainingDaysNow = this._curUser.remainingDaysNow.toSpliced(
        deleteGoalIndex,
        1
      );
      const newHowManyTimesClick = this._curUser.howManyTimesClick.toSpliced(
        deleteGoalIndex,
        1
      );

      await this.updateUser({
        goals: newGoals,
        remainingDaysPrev: newRemainingDaysPrev,
        remainingDaysNow: newRemainingDaysNow,
        howManyTimesClick: newHowManyTimesClick,
      });
    } catch (err) {
      throw err;
    }
  }

  ////OK
  async deleteRoom(deleteRoomIndex) {
    try {
      const deleteRoom = this._curUser.rooms[deleteRoomIndex];
      const deleteRoomId = deleteRoom.roomId;

      const sharingUsernames = deleteRoom.usernames;

      const newUsernames = sharingUsernames.filter(
        (username) => username !== this._curUser.username
      );

      ///delete room if no other users are in it / update room's usernames when user removed the room
      newUsernames.length
        ? await this.updateRoom(deleteRoomId, { usernames: newUsernames })
        : await this.deleteRoomDatabase(deleteRoomId);

      const newRooms = this._curUser.rooms.toSpliced(deleteRoomIndex, 1);
      const newRemainingDaysPrevRooms =
        this._curUser.remainingDaysPrevRooms.toSpliced(deleteRoomIndex, 1);
      const newRemainingDaysNowRooms =
        this._curUser.remainingDaysNowRooms.toSpliced(deleteRoomIndex, 1);
      const newHowManyTimesClickRooms =
        this._curUser.howManyTimesClickRooms.toSpliced(deleteRoomIndex, 1);

      await this.updateUser({
        rooms: newRooms,
        remainingDaysPrevRooms: newRemainingDaysPrevRooms,
        remainingDaysNowRooms: newRemainingDaysNowRooms,
        howManyTimesClickRooms: newHowManyTimesClickRooms,
      });
    } catch (err) {
      throw err;
    }
  }

  /////OK
  async deleteRoomDatabase(roomId) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      const data = await this._apiCall(`/room/delete/${roomId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
      });

      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  /////OK
  async removeSelected(selectedGoal) {
    try {
      const selectedGoalIndex = this._curUser.goals.findIndex(
        (goal) => goal === selectedGoal
      );

      const { selected, ...others } = selectedGoal;

      const newGoals = this._curUser.goals.fill(
        { ...others },
        selectedGoalIndex,
        selectedGoalIndex + 1
      );

      await this.updateUser({ goals: newGoals });
    } catch (err) {
      throw err;
    }
  }

  /////OK!
  //////////add selected for selected goals
  async saveSelectedGoals(selectedGoalsIndex) {
    try {
      let goalsWithSelected = this._curUser.goals;
      selectedGoalsIndex.forEach(
        (index) =>
          (goalsWithSelected = this._curUser.goals.fill(
            { ...this._curUser.goals[index], selected: true },
            index,
            index + 1
          ))
      );

      await this.updateUser({ goals: goalsWithSelected });
    } catch (err) {
      throw err;
    }
  }

  //when !goalRoom, _curUser's goals/rooms' dates are calculated, when goalRoom,  exists goalRoom's date is calculated
  _calcRemainingDays(type, goalRoom) {
    let calcFor;

    if (goalRoom) calcFor = Array.isArray(goalRoom) ? goalRoom : [goalRoom];

    if (!goalRoom)
      calcFor = type === "goals" ? this._curUser.goals : this._curUser.rooms;

    const remainingDays = calcFor.map((goalRoom) =>
      goalRoom.date
        ? Math.ceil(
            (new Date(goalRoom.date) - new Date()) / (1000 * 60 * 60 * 24)
          )
        : undefined
    );

    return remainingDays;
  }

  ////OK
  _calcUpdatedRemainingDaysPrev(type) {
    const remainingDaysNow =
      type === "goals"
        ? this._curUser.remainingDaysNow
        : this._curUser.remainingDaysNowRooms;

    const remainingDaysPrev =
      type === "goals"
        ? this._curUser.remainingDaysPrev
        : this._curUser.remainingDaysPrevRooms;

    const updatedRemainingDaysPrev = remainingDaysPrev.map((daysPrev, i) => {
      const daysNow = remainingDaysNow[i];

      //1) User can still click for the goal
      if (daysPrev !== daysNow) return --daysPrev;

      //2) User can nont click anymore
      if (daysPrev === daysNow) return daysPrev;
    });

    return updatedRemainingDaysPrev;
  }

  //////OK
  _calcHowManyTimesClick(remainingDaysPrev, remainingDaysNow) {
    const howManyTimesClick = remainingDaysPrev.map((daysPrev, i) => {
      const daysNow = remainingDaysNow[i];
      //1) User can not click for the goal
      if (daysPrev === daysNow) return 0;
      //2) User can click for the goal
      return daysPrev - daysNow;
    });

    return howManyTimesClick;
  }

  /////Check tomorrow
  _changeOrders(type = "goals") {
    try {
      const goalsOrRooms =
        type === "goals" ? this._curUser.goals : this._curUser.rooms;
      const sortedGoalsOrRooms = this._changeOrderGoals(goalsOrRooms);

      const [
        sortedRemainingDaysPrev,
        sortedRemainingDaysNow,
        sortedHowManyTimesClick,
      ] = this._changeOrderRemainingDaysHowManyTimesClick(
        goalsOrRooms,
        sortedGoalsOrRooms,
        type
      );

      if (type === "goals") {
        this._curUser.goals = sortedGoalsOrRooms;
        this._curUser.remainingDaysPrev = sortedRemainingDaysPrev;
        this._curUser.remainingDaysNow = sortedRemainingDaysNow;
        this._curUser.howManyTimesClick = sortedHowManyTimesClick;
      }

      if (type === "rooms") {
        this._curUser.rooms = sortedGoalsOrRooms;
        this._curUser.remainingDaysPrevRooms = sortedRemainingDaysPrev;
        this._curUser.remainingDaysNowRooms = sortedRemainingDaysNow;
        this._curUser.howManyTimesClickRooms = sortedHowManyTimesClick;
      }
    } catch (err) {
      throw err;
    }
  }

  /////Check tomorrow
  _changeOrderGoals(goalsOrRooms) {
    //Create array with undefined goal dates
    const undefinedDates = goalsOrRooms.filter(
      (goalOrRoom) => !goalOrRoom.date
    );

    //Sort goals in chronological order
    const sortedGoalsOrRoomsWithDates = goalsOrRooms
      .filter((goalOrRoom) => goalOrRoom.date)
      .toSorted((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        const dateAFormatted =
          dateA.getFullYear() +
          `${dateA.getMonth()}`.padStart(2, 0) +
          `${dateA.getDate()}`.padStart(2, 0);

        const dateBFormatted =
          dateB.getFullYear() +
          `${dateB.getMonth()}`.padStart(2, 0) +
          `${dateB.getDate()}`.padStart(2, 0);

        return dateAFormatted - dateBFormatted;
      });

    //Put undefined dates at the end of sorted goals
    const sortedGoalsOrRooms = [
      ...sortedGoalsOrRoomsWithDates,
      ...undefinedDates,
    ];
    return sortedGoalsOrRooms;
  }

  /////Check tomorrow
  _changeOrderRemainingDaysHowManyTimesClick(
    originalGoalsOrRooms,
    sortedGoalsOrRooms,
    type
  ) {
    const remainingDaysNow =
      type === "goals"
        ? this._curUser.remainingDaysNow
        : this._curUser.remainingDaysNowRooms;

    const remainingDaysPrev =
      type === "goals"
        ? this._curUser.remainingDaysPrev
        : this._curUser.remainingDaysPrevRooms;

    const howManyTimesClick =
      type === "goals"
        ? this._curUser.howManyTimesClick
        : this._curUser.howManyTimesClickRooms;

    //Create empty arrays with the same length of remainingDays arrays
    let sortedRemainingDaysPrev = new Array(remainingDaysPrev.length);
    let sortedRemainingDaysNow = new Array(remainingDaysNow.length);
    let sortedHowManyTimesClick = new Array(howManyTimesClick.length);

    originalGoalsOrRooms.forEach((originalGoalOrRoom, i) => {
      //Goal index in the current goals array is ...↓
      const curIndex = sortedGoalsOrRooms.findIndex(
        (sortedGoalOrRoom) => sortedGoalOrRoom === originalGoalOrRoom
      );

      //Putting remaining days for the goal to the goal index place in the current goals array
      sortedRemainingDaysPrev.fill(
        remainingDaysPrev[i],
        curIndex,
        curIndex + 1
      );
      sortedRemainingDaysNow.fill(remainingDaysNow[i], curIndex, curIndex + 1);
      sortedHowManyTimesClick.fill(
        howManyTimesClick[i],
        curIndex,
        curIndex + 1
      );
    });

    return [
      sortedRemainingDaysPrev,
      sortedRemainingDaysNow,
      sortedHowManyTimesClick,
    ];
  }

  /////OK
  async _updateUsernameEmail(updateInput, section) {
    try {
      const updateInfo =
        section === "username"
          ? { username: updateInput }
          : { email: updateInput };

      if (section !== "username" || !this._curUser.rooms.length)
        return await this.updateUser(updateInfo);

      const roomIds = this._curUser.rooms.map((room) => room.roomId);

      const sharingUsernamesWithourCurUser = this._curUser.rooms.map((room) =>
        room.usernames.filter((username) => username !== this._curUser.username)
      );
      console.log(sharingUsernamesWithourCurUser);

      const data = await Promise.all(
        roomIds.map((roomId, i) =>
          this.updateRoom(roomId, {
            usernames: [...sharingUsernamesWithourCurUser[i], updateInput],
          })
        )
      );

      await this.updateUser({ ...updateInfo, rooms: data });
    } catch (err) {
      throw err;
    }
  }

  //////OK
  async _updatePassword(curPassword, newPassword) {
    try {
      await this._apiCall("/user/update/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ curPassword, newPassword }),
      });

      // return data.message;
    } catch (err) {
      throw err;
    }
  }

  //For dev
  // async deleteAll() {
  //   try {
  //     const deletedUsers = await this._deleteAllUsers();
  //     const deletedTokens = await this._deleteAllTokens();
  //     const deletedRooms = await this._deleteAllRooms();

  //     console.log("deletedUsers", deletedUsers);
  //     console.log("deletedTokens", deletedTokens);
  //     console.log("deletedRooms", deletedRooms);
  //   } catch (err) {
  //     console.error("Error while deleting Users, tokens, and Rooms", err);
  //   }
  // }

  // async _deleteAllUsers() {
  //   try {
  //     const data = await this._apiCall("/user/deleteAll", {
  //       method: "DELETE",
  //     });

  //     return data;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async _deleteAllTokens() {
  //   try {
  //     const data = await this._apiCall("/user/deleteTokens", {
  //       method: "DELETE",
  //     });

  //     return data;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async _deleteAllRooms() {
  //   try {
  //     const data = await this._apiCall("/room/deleteAll", { method: "DELETE" });

  //     return data;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}

export default new UserManageApi();

(async function () {
  console.log(await health());
})();
