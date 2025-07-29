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

      return res;
    } catch (err) {
      console.error("Error while using _apiCall", err);
      throw err;
    }
  }

  async _refreshAccessToken() {
    try {
      const res = await this._apiCall("/user/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Refresh failed");

      const data = await res.json();
      this._accessToken = data.accessToken;
      return data.accessToken;
    } catch (err) {
      console.error("Error while refreshing token:", err);
      throw err;
    }
  }

  async login(username, password) {
    try {
      const res = await this._apiCall("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = new Error(data.message);
        err.statusCode = res.status;
        throw err;
      }

      this._accessToken = data.accessToken;
      this._curUser = await this.getCurrentUser();

      const newRemainingDaysNow = this._calcRemainingDays("goals");
      const newRemainingDaysNowRooms = this._calcRemainingDays("rooms");

      let updatedRooms;

      if (this._curUser.rooms.length) {
        const roomIds = this._curUser.rooms.map((room) => room.roomId);

        updatedRooms = await this._getRooms(roomIds);
      }

      await this.updateUser({
        remainingDaysNow: newRemainingDaysNow,
        remainingDaysNowRooms: newRemainingDaysNowRooms,
        rooms: updatedRooms || [],
      });

      const newHowManyTimesClick = this._calcHowManyTimesClick("goals");
      const newHowManyTimesClickRooms = this._calcHowManyTimesClick("rooms");

      await this.updateUser({
        howManyTimesClick: newHowManyTimesClick,
        howManyTimesClickRooms: newHowManyTimesClickRooms,
      });

      return data.message;
    } catch (err) {
      throw err;
    }
  }

  //UserInfo = { username, password, email=''}
  async createUser({ email = undefined, ...others }) {
    try {
      const userInfo = email ? { ...others, email } : { ...others };

      const res = await this._apiCall("/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userInfo),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = new Error(data.message);
        err.statusCode = res.status;
        err.name = data.name;
        throw err;
      }

      this._accessToken = data.accessToken;

      this._curUser = await this.getCurrentUser();

      return data.message;
    } catch (err) {
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      if (!this._accessToken) await this._refreshAccessToken();
      const res = await this._apiCall("/user/get", {
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok)
        return {
          success: false,
          message: data.message,
          statusCode: res.status,
        };

      return data.user;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  //updateInfo = { updateField: updateValue }
  async updateUser(updateInfo) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      const res = await this._apiCall("/user/update/general", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(updateInfo),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = new Error(data.message);
        err.statusCode = res.status;
        err.name = data.name;
        throw err;
      }

      this._curUser = data.user;

      return data;
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    try {
      const res = await this._apiCall("/user/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok)
        return {
          success: false,
          message: data.message,
          statusCode: res.status,
        };

      this._removeCurUserInfo();
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(password) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      const res = await this._apiCall("/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok)
        return {
          success: false,
          message: data.message,
          statusCode: res.status,
        };

      this._curUser = null;

      return data.message;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

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

      console.log("To-Do lists / comments saved successfully!");
    } catch (err) {
      throw err;
    }
  }

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

      await this.updateUser({
        goals: [...this._curUser.goals, ...goalsInfo],
        remainingDaysPrev: newRemainingDaysPrev,
        remainingDaysNow: newRemainingDaysNow,
      });

      await this._changeOrders(type);
      await this.saveHowManyTimesClick(type);

      return {
        message: `${
          type.at(0).toUpperCase + type.slice(1)
        } updated successfully!`,
      };
    } catch (err) {
      throw err;
    }
  }

  async saveRoomsInfo(roomsInfo, roomType) {
    try {
      const type = "rooms";

      const sharingUserNames = await this.findUsersRooms(roomsInfo, roomType);

      if (roomType !== "id")
        await this._roomsCreateSelect(type, roomsInfo, sharingUserNames);

      if (roomType === "id")
        await this._roomsJoinId(type, roomsInfo, sharingUserNames);

      await this._changeOrders(type);
      await this.saveHowManyTimesClick(type);
    } catch (err) {
      throw err;
    }
  }

  async _roomsCreateSelect(type, roomsInfo, sharingUserNames) {
    try {
      const newRoomsWithUsernames = roomsInfo.map(function (room, i) {
        return { ...room, usernames: sharingUserNames[i] };
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

      await this.updateUser({
        rooms: [...this._curUser.rooms, ...newRoomsWithUsernames],
        remainingDaysPrevRooms: newRemainingDaysPrevRooms,
        remainingDaysNowRooms: newRemainingDaysNowRooms,
      });
    } catch (err) {
      throw err;
    }
  }

  async _roomsJoinId(type, roomIds, sharingUserNames) {
    try {
      for (const roomId of roomIds)
        await this.updateRoom(roomId, { usernames: sharingUserNames });

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

      await this.updateUser({
        rooms: [...this._curUser.rooms, ...rooms],
        remainingDaysPrevRooms: newRemainingDaysPrevRooms,
        remainingDaysNowRooms: newRemainingDaysNowRooms,
      });
    } catch (err) {
      throw err;
    }
  }

  async createRooms(newRoomsWithUsernames) {
    try {
      let rooms = [];
      for (let i = 0; i < newRoomsWithUsernames.length; i++) {
        const room = newRoomsWithUsernames[i];

        const res = await this._apiCall("/room/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(room),
        });

        const data = await res.json();

        if (!res.ok) {
          const err = new Error(data.message);
          err.statusCode = res.status;
          throw err;
        }

        rooms.push(data.room);
      }

      return {
        message: "Room created successfully",
        rooms,
      };
    } catch (err) {
      console.error("Error while creaing room", err);
      throw err;
    }
  }

  async _getRooms(roomIds) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      let rooms = [];
      for (const roomId of roomIds) {
        const res = await this._apiCall(`/room/${roomId}`, {
          headers: {
            Authorization: `Bearer ${this._accessToken}`,
          },
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          const err = new Error(data.message);
          err.statusCode = res.status;
          throw err;
        }

        rooms.push(data.room);
      }

      return rooms;
    } catch (err) {
      console.error("Error while getting rooms with ids");
      throw err;
    }
  }

  async findUsersRooms(roomsInfo, roomType) {
    try {
      let sharingUsernames = [];

      const formattedRoomsInfo = Array.isArray(roomsInfo)
        ? roomsInfo
        : [roomsInfo];

      const roomIds =
        roomType === "id"
          ? formattedRoomsInfo
          : formattedRoomsInfo.map((room) => room.roomId);

      for (const roomId of roomIds) {
        const res = await this._apiCall(`/room/findUsers/${roomId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          const err = new Error(data.message);
          err.statusCode = res.status;
          throw err;
        }

        sharingUsernames.push(...data.usernames, this._curUser.username);
      }

      return sharingUsernames;
    } catch (err) {
      console.error("Error while finding users for room", err);
      throw err;
    }
  }

  async updateRoom(roomId, updateInfo) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      const res = await this._apiCall(`/room/update/${roomId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(updateInfo),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = new Error(data.message);
        err.statusCode = res.status;
        throw err;
      }

      return data.room;
    } catch (err) {
      throw err;
    }
  }

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

        await this.updateUser({
          goals: newGoals,
          remainingDaysPrev: newRemainingDaysPrev,
          remainingDaysNow: newRemainingDaysNow,
        });

        // await this.updateUser({
        //   remainingDaysPrev: newRemainingDaysPrev,
        //   remainingDaysNow: this._calcRemainingDays(type),
        // });
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

        await this.updateUser({
          rooms: newRooms,
          remainingDaysPrevRooms: newRemainingDaysPrevRooms,
          remainingDaysNowRooms: newRemainingDaysNowRooms,
        });

        await this.updateRoom(editedGoalRoomInfo.roomId, editedGoalRoomInfo);
      }

      await this._changeOrders(type);
      await this.saveHowManyTimesClick(type);
    } catch (err) {
      throw err;
    }
  }

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

  async deleteRoomDatabase(roomId) {
    try {
      if (!this._accessToken) await this._refreshAccessToken();

      const res = await this._apiCall(`/room/delete/${roomId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        const err = new Error(data.message);
        err.statusCode = res.status;
        throw err;
      }

      return data;
    } catch (err) {
      throw err;
    }
  }

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
  ///remainingDaysNow, remainingDaysPrev, or remainingDaysBoth
  // async _saveRemainingDays(option, type = "goals") {
  //   try {
  //     if (option === "remainingDaysNow")
  //       type === "goals"
  //         ? await this.updateUser({
  //             remainingDaysNow: this._calcRemainingDays(type),
  //           })
  //         : await this.updateUser({
  //             remainingDaysNowRooms: this._calcRemainingDays(type),
  //           });

  //     if (option === "remainingDaysPrev")
  //       type === "goals"
  //         ? await this.updateUser({
  //             remainingDaysPrev: this._calcRemainingDays(type),
  //           })
  //         : await this.updateUser({
  //             remainingDaysPrevRooms: this._calcRemainingDays(type),
  //           });

  //     if (option === "remainingDaysBoth")
  //       type === "goals"
  //         ? await this.updateUser({
  //             remainingDaysNow: this._calcRemainingDays(type),
  //             remainingDaysPrev: this._calcRemainingDays(type),
  //           })
  //         : await this.updateUser({
  //             remainingDaysNowRooms: this._calcRemainingDays(type),
  //             remainingDaysPrevRooms: this._calcRemainingDays(type),
  //           });

  //     return {
  //       message: `Updated ${option} for ${type} successfully`,
  //     };
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async updateRemainingDaysPrev(type) {
    try {
      type === "goals"
        ? await this.updateUser({
            remainingDaysPrev: this._calcUpdatedRemainingDaysPrev(type),
          })
        : await this.updateUser({
            remainingDaysPrevRooms: this._calcUpdatedRemainingDaysPrev(type),
          });

      return `RemainingDaysPrev for ${type} updated successfully`;
    } catch (err) {
      throw err;
    }
  }

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

  async saveHowManyTimesClick(type) {
    try {
      type === "goals"
        ? await this.updateUser({
            howManyTimesClick: this._calcHowManyTimesClick(type),
          })
        : await this.updateUser({
            howManyTimesClickRooms: this._calcHowManyTimesClick(type),
          });

      return `howManyTimesClick for ${type} updated successfully`;
    } catch (err) {
      throw err;
    }
  }

  _calcHowManyTimesClick(type) {
    const remainingDaysNow =
      type === "goals"
        ? this._curUser.remainingDaysNow
        : this._curUser.remainingDaysNowRooms;

    const remainingDaysPrev =
      type === "goals"
        ? this._curUser.remainingDaysPrev
        : this._curUser.remainingDaysPrevRooms;

    const howManyTimesClick = remainingDaysPrev.map((daysPrev, i) => {
      const daysNow = remainingDaysNow[i];
      //1) User can not click for the goal
      if (daysPrev === daysNow) return 0;
      //2) User can click for the goal
      return daysPrev - daysNow;
    });

    return howManyTimesClick;
  }

  async _changeOrders(type = "goals") {
    try {
      const goals =
        type === "goals" ? this._curUser.goals : this._curUser.rooms;
      const sortedGoals = this._changeOrderGoals(goals);

      const [sortedRemainingDaysPrev, sortedRemainingDaysNow] =
        this._changeOrderRemainingDays(goals, sortedGoals, type);

      if (type === "goals") {
        await this.updateUser({ goals: sortedGoals });
        await this.updateUser({
          remainingDaysPrev: sortedRemainingDaysPrev,
          remainingDaysNow: sortedRemainingDaysNow,
        });
      }

      if (type === "rooms") {
        await this.updateUser({ rooms: sortedGoals });
        await this.updateUser({
          remainingDaysPrevRooms: sortedRemainingDaysPrev,
          remainingDaysNowRooms: sortedRemainingDaysNow,
        });
      }

      return {
        message: `${
          type.at(0).toUpperCase + type.slice(1)
        } and remainingDaysBoth updated successfully`,
      };
    } catch (err) {
      throw err;
    }
  }

  _changeOrderGoals(goals) {
    //Create array with undefined goal dates
    const undefinedDates = goals.filter((goal) => !goal.date);

    //Sort goals in chronological order
    const sortedGoalsWithDates = goals
      .filter((goal) => goal.date)
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
    const sortedGoals = [...sortedGoalsWithDates, ...undefinedDates];
    return sortedGoals;
  }

  _changeOrderRemainingDays(originalGoals, sortedGoals, type) {
    const remainingDaysNow =
      type === "goals"
        ? this._curUser.remainingDaysNow
        : this._curUser.remainingDaysNowRooms;

    const remainingDaysPrev =
      type === "goals"
        ? this._curUser.remainingDaysPrev
        : this._curUser.remainingDaysPrevRooms;

    //Create empty arrays with the same length of remainingDays arrays
    let sortedRemainingDaysPrev = new Array(remainingDaysPrev.length);
    let sortedRemainingDaysNow = new Array(remainingDaysNow.length);

    originalGoals.forEach((originalGoal, i) => {
      //Goal index in the current goals array is ...↓
      const curIndex = sortedGoals.findIndex(
        (sortedGoal) => sortedGoal === originalGoal
      );

      //Putting remaining days for the goal to the goal index place in the current goals array
      sortedRemainingDaysPrev.fill(
        remainingDaysPrev[i],
        curIndex,
        curIndex + 1
      );
      sortedRemainingDaysNow.fill(remainingDaysNow[i], curIndex, curIndex + 1);
    });

    return [sortedRemainingDaysPrev, sortedRemainingDaysNow];
  }

  async _updateUsernameEmail(updateInput, section) {
    try {
      const updateInfo =
        section === "username"
          ? { username: updateInput }
          : { email: updateInput };
      const data = await this.updateUser(updateInfo);

      return data.updatedFields;
    } catch (err) {
      throw err;
    }
  }

  async _updatePassword(curPassword, newPassword) {
    try {
      const res = await this._apiCall("/user/update/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ curPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = new Error(data.message);
        err.statusCode = res.status;
        throw err;
      }

      return data.message;
    } catch (err) {
      throw err;
    }
  }

  //For dev
  async deleteAll() {
    try {
      const deletedUsers = await this._deleteAllUsers();
      const deletedTokens = await this._deleteAllTokens();
      const deletedRooms = await this._deleteAllRooms();

      console.log("deletedUsers", deletedUsers);
      console.log("deletedTokens", deletedTokens);
      console.log("deletedRooms", deletedRooms);
    } catch (err) {
      console.error("Error while deleting Users, tokens, and Rooms", err);
    }
  }

  async _deleteAllUsers() {
    try {
      const res = await this._apiCall("/user/deleteAll", {
        method: "DELETE",
      });

      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async _deleteAllTokens() {
    try {
      const res = await this._apiCall("/user/deleteTokens", {
        method: "DELETE",
      });

      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async _deleteAllRooms() {
    try {
      const res = await this._apiCall("/room/deleteAll", { method: "DELETE" });

      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserManageApi();

(async function () {
  console.log(await health());
})();
