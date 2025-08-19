import { BASE_URL } from "../config.js";
import overlayMessageSpinnerView from "../views/overlayMessageSpinnerView.js";

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
      let data;
      res = await fetch(`${BASE_URL}${url}`, options);
      data = await res.json();

      //If token expired, try to refresh once
      if (
        (res.status === 403 || res.status === 401) &&
        data.name !== "validationFailed"
      ) {
        await this._refreshAccessToken();

        ///Use new Updated accessToken!
        options.headers.Authorization = `Bearer ${this._accessToken}`;

        res = await fetch(`${BASE_URL}${url}`, options);
        data = await res.json();
      }

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

  async _saveUserDataAsync(updatedUserInfo) {
    try {
      await this.updateUser(updatedUserInfo);
    } catch (err) {
      overlayMessageSpinnerView._asyncInit(
        "message",
        "error",
        overlayMessageSpinnerView._errorMessageSaveDataAsync
      );
      console.error(
        "User changed data might not have been saved in the database! 🙇‍♂️",
        err
      );
    }
  }

  ////For backup to save user data when user leaves the website
  async _saveUserData() {
    try {
      if (!this._curUser) return;

      navigator.sendBeacon(
        `${BASE_URL}/user/saveUserData`,
        JSON.stringify(this._curUser)
      );
    } catch (err) {
      throw err;
    }
  }

  /////update user data locally and save the data using saveUserDataAsync without awaiting for login
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

      if (this._curUser.goals.length) {
        this._curUser.remainingDaysNow = this._calcRemainingDays("goals");
        this._curUser.howManyTimesClick = this._calcHowManyTimesClick(
          this._curUser.remainingDaysPrev,
          this._curUser.remainingDaysNow
        );
      }

      if (this._curUser.rooms.length) {
        this._curUser.remainingDaysNowRooms = this._calcRemainingDays("rooms");
        this._curUser.howManyTimesClickRooms = this._calcHowManyTimesClick(
          this._curUser.remainingDaysPrevRooms,
          this._curUser.remainingDaysNowRooms
        );

        //////Update rooms
        const roomIds = this._curUser.rooms.map((room) => room.roomId);
        this._curUser.rooms = await this._getRooms(roomIds);
      }

      this._saveUserDataAsync({
        remainingDaysNow: this._curUser.remainingDaysNow || [],
        howManyTimesClick: this._curUser.howManyTimesClick || [],
        remainingDaysNowRooms: this._curUser.remainingDaysNowRooms || [],
        howManyTimesClickRooms: this._curUser.howManyTimesClickRooms || [],
        rooms: this._curUser.rooms || [],
      });
    } catch (err) {
      throw err;
    }
  }

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

  async logout() {
    try {
      await this._apiCall("/user/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
      });

      this._saveUserData();
      this._removeCurUserInfo();
    } catch (err) {
      throw err;
    }
  }

  async closeAccount(passwordInput) {
    try {
      await this._apiCall("/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ password: passwordInput }),
      });

      this._removeCurUserInfo();
    } catch (err) {
      throw err;
    }
  }

  ///save the result every time without receiving the updated data from the server side using a different function with await and catch the error
  ///Added the function to save asyncronously
  _updateForDaysCounter(type) {
    const updatedRemainingDaysPrev = this._calcUpdatedRemainingDaysPrev(type);
    const updatedHowManyTimesClick = this._calcHowManyTimesClick(
      updatedRemainingDaysPrev,
      type === "goals"
        ? this._curUser.remainingDaysNow
        : this._curUser.remainingDaysNowRooms
    );

    if (type === "goals") {
      this._curUser.remainingDaysPrev = updatedRemainingDaysPrev;
      this._curUser.howManyTimesClick = updatedHowManyTimesClick;

      this._saveUserDataAsync({
        remainingDaysPrev: updatedRemainingDaysPrev,
        howManyTimesClick: updatedHowManyTimesClick,
      });
    }

    if (type === "rooms") {
      this._curUser.remainingDaysPrevRooms = updatedRemainingDaysPrev;
      this._curUser.howManyTimesClickRooms = updatedHowManyTimesClick;

      this._saveUserDataAsync({
        remainingDaysPrevRooms: updatedRemainingDaysPrev,
        howManyTimesClickRooms: updatedHowManyTimesClick,
      });
    }
  }

  ///Added the function to save asyncronously
  saveToDoListsComments(
    type,
    modifiedCard,
    newToDoLists,
    checkedOrNotArr,
    newComments
  ) {
    if (type === "goals") {
      if (newToDoLists || newToDoLists === "") {
        this._curUser.goals[modifiedCard].toDoLists = newToDoLists;
        this._curUser.goals[modifiedCard].toDoListsCheckbox =
          checkedOrNotArr || [];
      }

      if (newComments || newComments === "")
        this._curUser.goals[modifiedCard].comments = newComments;

      return this._saveUserDataAsync({ goals: this._curUser.goals });
    }

    if (type === "rooms") {
      if (newToDoLists || newToDoLists === "") {
        this._curUser.rooms[modifiedCard].toDoLists = newToDoLists;
        this._curUser.rooms[modifiedCard].toDoListsCheckbox =
          checkedOrNotArr || [];
      }

      if (newComments || newComments === "")
        this._curUser.rooms[modifiedCard].comments = newComments;

      return this._saveUserDataAsync({ rooms: this._curUser.rooms });
    }
  }

  async saveGoalsInfo(goalsInfo) {
    try {
      const type = "goals";

      this._curUser.goals.push(...goalsInfo);
      this._curUser.remainingDaysPrev.push(
        ...this._calcRemainingDays(type, goalsInfo)
      );
      this._curUser.remainingDaysNow.push(
        ...this._calcRemainingDays(type, goalsInfo)
      );
      this._curUser.howManyTimesClick = this._calcHowManyTimesClick(
        this._curUser.remainingDaysPrev,
        this._curUser.remainingDaysNow
      );

      this._changeOrders(type);

      await this.updateUser(this._curUser);

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

      if (roomType !== "id") await this._roomsCreateSelect(type, roomsInfo);

      if (roomType === "id") {
        const sharingUsernames = await this._findUserRooms(roomsInfo, roomType);
        await this._roomsJoinId(type, roomsInfo, sharingUsernames);
      }

      this._changeOrders(type);
    } catch (err) {
      throw err;
    }
  }

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

      return sharingUsernames;
    } catch (err) {
      console.error("Error while finding users for room", err);
      throw err;
    }
  }

  async _roomsCreateSelect(type, roomsInfo) {
    try {
      const newRoomsWithUsernames = roomsInfo.map((room) => {
        return { ...room, usernames: [this._curUser.username] };
      });

      await this.createRooms(newRoomsWithUsernames);

      ///Update userInfo
      this._curUser.rooms.push(...newRoomsWithUsernames);
      this._curUser.remainingDaysPrevRooms.push(
        ...this._calcRemainingDays(type, roomsInfo)
      );
      this._curUser.remainingDaysNowRooms.push(
        ...this._calcRemainingDays(type, roomsInfo)
      );
      this._curUser.howManyTimesClickRooms = this._calcHowManyTimesClick(
        this._curUser.remainingDaysPrevRooms,
        this._curUser.remainingDaysNowRooms
      );

      this._changeOrders(type);

      //////also save goals to save selected goals
      await this.updateUser({
        rooms: this._curUser.rooms,
        remainingDaysPrevRooms: this._curUser.remainingDaysPrevRooms,
        remainingDaysNowRooms: this._curUser.remainingDaysNowRooms,
        howManyTimesClickRooms: this._curUser.howManyTimesClickRooms,
        goals: this._curUser.goals,
      });
    } catch (err) {
      throw err;
    }
  }

  async _roomsJoinId(type, roomIds, sharingUsernames) {
    try {
      await Promise.all(
        roomIds.map((roomId, i) =>
          this.updateRoom(roomId, { usernames: sharingUsernames[i] })
        )
      );

      const rooms = await this._getRooms(roomIds);

      ///Update userInfo
      this._curUser.rooms.push(...rooms);
      this._curUser.remainingDaysPrevRooms.push(
        ...this._calcRemainingDays(type, rooms)
      );
      this._curUser.remainingDaysNowRooms.push(
        ...this._calcRemainingDays(type, rooms)
      );
      this._curUser.howManyTimesClickRooms = this._calcHowManyTimesClick(
        this._curUser.remainingDaysPrevRooms,
        this._curUser.remainingDaysNowRooms
      );

      this._changeOrders(type);

      await this.updateUser({
        rooms: this._curUser.rooms,
        remainingDaysPrevRooms: this._curUser.remainingDaysPrevRooms,
        remainingDaysNowRooms: this._curUser.remainingDaysNowRooms,
        howManyTimesClickRooms: this._curUser.howManyTimesClickRooms,
      });
    } catch (err) {
      throw err;
    }
  }

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

      return data.room;
    } catch (err) {
      throw err;
    }
  }

  async editGoalRoom(editGoalRoomIndex, editedGoalRoomInfo, type) {
    try {
      if (type === "goals") {
        this._curUser.goals.fill(
          editedGoalRoomInfo,
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        this._curUser.remainingDaysPrev.fill(
          ...this._calcRemainingDays(type, editedGoalRoomInfo),
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        this._curUser.remainingDaysNow.fill(
          ...this._calcRemainingDays(type, editedGoalRoomInfo),
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        this._curUser.howManyTimesClick = this._calcHowManyTimesClick(
          this._curUser.remainingDaysPrev,
          this._curUser.remainingDaysNow
        );

        this._changeOrders(type);

        await this.updateUser({
          goals: this._curUser.goals,
          remainingDaysPrev: this._curUser.remainingDaysPrev,
          remainingDaysNow: this._curUser.remainingDaysNow,
          howManyTimesClick: this._curUser.howManyTimesClick,
        });
      }

      if (type === "rooms") {
        this._curUser.rooms.fill(
          editedGoalRoomInfo,
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        this._curUser.remainingDaysPrevRooms.fill(
          ...this._calcRemainingDays(type, editedGoalRoomInfo),
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        this._curUser.remainingDaysNowRooms.fill(
          ...this._calcRemainingDays(type, editedGoalRoomInfo),
          editGoalRoomIndex,
          editGoalRoomIndex + 1
        );

        this._curUser.howManyTimesClickRooms = this._calcHowManyTimesClick(
          this._curUser.remainingDaysPrevRooms,
          this._curUser.remainingDaysNowRooms
        );

        this._changeOrders(type);

        await this.updateUser({
          rooms: this._curUser.rooms,
          remainingDaysPrevRooms: this._curUser.remainingDaysPrevRooms,
          remainingDaysNowRooms: this._curUser.remainingDaysNowRooms,
          howManyTimesClickRooms: this._curUser.howManyTimesClickRooms,
        });

        await this.updateRoom(editedGoalRoomInfo.roomId, editedGoalRoomInfo);
      }
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

      //also save goals to save goals that selected mark were removed
      await this.updateUser({
        rooms: newRooms,
        remainingDaysPrevRooms: newRemainingDaysPrevRooms,
        remainingDaysNowRooms: newRemainingDaysNowRooms,
        howManyTimesClickRooms: newHowManyTimesClickRooms,
        goals: this._curUser.goals,
      });

      this._changeOrders("rooms");
    } catch (err) {
      throw err;
    }
  }

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

      return data;
    } catch (err) {
      throw err;
    }
  }

  //////add selected for selected goals
  _saveSelectedGoals(selectedGoalsIndex) {
    selectedGoalsIndex.forEach(
      (index) => (this._curUser.goals[index].selected = true)
    );
  }

  _removeSelected(selectedGoal) {
    const selectedGoalIndex = this._curUser.goals.findIndex(
      (goal) => goal === selectedGoal
    );

    this._curUser.goals[selectedGoalIndex].selected = false;
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
    } catch (err) {
      throw err;
    }
  }
}

export default new UserManageApi();

//For dev
// const health = async function () {
//   try {
//     const res = await fetch(`${BASE_URL}/user/health`);

//     if (!res.ok) return { success: false };

//     const data = await res.json();

//     return data;
//   } catch (err) {
//     console.error("Server not connected");
//   }
// };
// (async function () {
//   console.log(await health());
// })();
