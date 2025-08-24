import { BASE_URL } from "../config.js";
import overlayMessageSpinnerView from "../views/overlayMessageSpinnerView.js";

class UserManageApi {
  _accessToken;
  _curUser;

  /**
   * Sets _accessToken and _curUser null
   * @returns {undefined}
   */
  _removeCurUserInfo() {
    this._accessToken = null;
    this._curUser = null;
  }

  /**
   * Handles any AJAX call using the url and options. If accessToken is expired, it generates a new accessToken and do the AJAX call again.
   * @param {String} url
   * @param {Object} options
   * @returns {Object} data from the server is returned
   */
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

  /**
   * Refreshes access token and set _accessToken the new token
   * @returns {undefined}
   */
  async _refreshAccessToken() {
    try {
      const data = await this._apiCall("/user/refresh", {
        method: "POST",
        credentials: "include",
      });
      this._accessToken = data.accessToken;
      // return data.accessToken;
    } catch (err) {
      err.message = `Error while refreshing token: ${err}`;
      throw newError;
    }
  }

  /**
   * Updates user info asynchronously. You can use this method without waiting for the result
   * @param {Object} updatedUserInfo
   * @returns {undefined}
   */
  async _saveUserDataAsync(updatedUserInfo) {
    try {
      await this.updateUser(updatedUserInfo);
    } catch (err) {
      console.error(err);
      overlayMessageSpinnerView._asyncInit(
        "message",
        "error",
        overlayMessageSpinnerView._errorMessageSaveDataAsync
      );
    }
  }

  /**
   * Updates room info asynchronously. You can use this method without waiting for the result
   * @param {String} roomId roomId for a room to be update
   * @param {Object} updatedInfo updated room info
   * @returns {undefined}
   */
  async _saveRoomDataAsync(roomId, updatedInfo) {
    try {
      await this.updateRoom(roomId, updatedInfo);
    } catch (err) {
      console.error(err);
      overlayMessageSpinnerView._asyncInit(
        "message",
        "error",
        overlayMessageSpinnerView._errorMessageSaveDataAsync
      );
    }
  }

  /**
   * Saves user data when user leaves the website as backup
   * @returns {undefined}
   */
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

  /**
   * Method for login. Set _accessToken and _curUser. Update _curUser locally and then save the updated data to the server without awaiting
   * @param {String} username Validates a user with the username
   * @param {String} password Validates a with the password
   * @returns {undefined}
   */
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

  /**
   * Method for creating a new user. Sets _accessToken and _curUser.
   * @param {Object} { username, password, [email=undefined]} Creates a new user with the argument. If email is a falsy value, it excludes the email section from the user info that will be created.
   * @returns {undefined}
   */
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

  /**
   * Updates user info except for password. Sets _curUser with the updated user data.
   * @param {Object} updateInfo { updateField: updateValue } Updates user info with the argument.
   * @returns {Object} data from the server is returned.
   */
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

  /**
   * Method for logout. Saves user info to the server and sets _accessToken and _curUser null.
   * @returns {undefined}
   */
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

  /**
   * Method for closing an account. Removes a user data from the server. Sets _accessToken and _curUser null.
   * @param {String} passwordInput Validates the user with the password input.
   * @returns {undefined}
   */
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

  /**
   * When user clicks the days counter button, it updates remainingDaysPrev and howManyTimesClick when type is 'goals', and remainingDaysPrevRooms and howManyTimesClickRooms when type is 'rooms', of _curUser locally. Then it saves the updated user data to the server without awaiting
   * @param {String} type type is 'goals' or 'rooms'.
   * @returns {undefined}
   */
  _updateForDaysCounter(type) {
    const updatedRemainingDaysPrev = this._calcUpdatedRemainingDaysPrev(type);
    const updatedHowManyTimesClick = this._calcHowManyTimesClick(
      updatedRemainingDaysPrev,
      type === "goals"
        ? this._curUser.remainingDaysNow
        : this._curUser.remainingDaysNowRooms
    );

    ///Updates _curUser data
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

      ///save the updated user data to the server asyncronously
      this._saveUserDataAsync({
        remainingDaysPrevRooms: updatedRemainingDaysPrev,
        howManyTimesClickRooms: updatedHowManyTimesClick,
      });
    }
  }

  /**
   * Updates toDoLists and checkedOrNot when user modified To-Do lists, and comments when user modified comments, of _curUser locally. Then it saves the updated user data to the server without awaiting
   * @param {String} type type is 'goals' or 'rooms'.
   * @param {Number} modifiedCard The index of a modified card or slide.
   * @param {String | null} [newToDoLists] If To-Do lists are modified, include the To-Do lists content texts, otherwise null.
   * @param {Array | null} [checkedOrNotArr] If To-Do lists are modified, include an array of true (checked) or false (not checked) for the checkboxes, otherwise null.
   * @param {String | null} [newComments] If comments are modified, include the comments content texts, otherwise null.
   * @returns {undefined}
   */
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

      //exludes MongoDB _id
      const { _id, roomId, ...others } = this._curUser.rooms[modifiedCard];

      this._saveRoomDataAsync(roomId, { roomId, ...others });
    }
  }

  /**
   * Saves the updated goals to _curUser locally and to the server with calculated remainingDaysPrev and remainingDaysNow, and sorted new goals info in chronological order by the dates.
   * @param {Object[]} goalsInfo an array containing new goals info of objects.
   * @returns {undefined}
   */
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

      await this.updateUser({
        goals: this._curUser.goals,
        remainingDaysPrev: this._curUser.remainingDaysPrev,
        remainingDaysNow: this._curUser.remainingDaysNow,
        howManyTimesClick: this._curUser.howManyTimesClick,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Creates new rooms with usernames that share them, and sorts them in chronological order by the dates.
   * @param {Object[] | String[]} roomsInfo If roomType is 'create' or 'select', an array of new rooms info objects. If roomType is 'id', an array of room ID strings.
   * @param {String} roomType roomType is 'create', 'select', or 'id, which is how to create new rooms.
   */
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

  /**
   * Finds usernames that share the same rooms.
   * @param {String[]} roomsInfo Takes an array of room IDs strings.
   * @returns {Array[]} An array that contains arrays of usernames that share the same rooms is returned.
   */
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

  /**
   * Method for creating new rooms with the roomType 'create' or 'select'. It saves the newRooms to the server and updates the user data in the server by calculating remainingDaysPrevRooms, remainigDaysNowRooms, and howManyTimesClickRooms, and sorts the new rooms info in chronological order by the dates.
   * @param {String} type type is always 'rooms'
   * @param {Object[]} roomsInfo Takes an array of new rooms info objects.
   * @returns {undefined}
   */
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

      ////also save goals to save selected goals
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

  /**
   * Updates the usernames of existing rooms and the user data in the server by calculating remainingDaysPrevRooms, remainigDaysNowRooms, and howManyTimesClickRooms, and sorts the new rooms info in chronological order by the dates.
   * @param {String} type type is always 'rooms'.
   * @param {String[]} roomIds Takes an array of room IDs strings.
   * @param {Arrays[]} sharingUsernames Takes an array that contains arrays of usernames that share the same rooms.
   * @returns {undefined}
   */
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

  /**
   * Saves new rooms info to the server.
   * @param {Object[]} newRoomsWithUsernames Takes an array of new rooms info objects that contains usernames sections.
   * @returns {undefined}
   */
  async createRooms(newRoomsWithUsernames) {
    try {
      await Promise.all(
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

  /**
   * Finds rooms info from roomIds.
   * @param {String[]} roomIds Takes an array of room IDs strings.
   * @returns {Object[]} an arrays of rooms info objects found by the roomIds are returned.
   */
  async _getRooms(roomIds) {
    try {
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

  /**
   * Updates room info.
   * @param {String} roomId Takes a room ID of a specific room you want to update.
   * @param {Object} updateInfo { updateField: updateValue } Updates the room info with the argument.
   * @returns {Object} The updated room data is returned.
   */
  async updateRoom(roomId, updateInfo) {
    try {
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

  /**
   * Updates user data in the server with the new edited goal when type is 'goals' or room info when type is 'rooms'. If type is 'rooms', it also updates the edited room info in the server.
   * @param {Number} editGoalRoomIndex Index of an edited goal when type is 'goals' and room when type is 'rooms'.
   * @param {Object} editedGoalRoomInfo  An edited new goal info when type is 'goals' and new room info when type is 'rooms'.
   * @param {*} type type is 'goals' or 'rooms'.
   * @returns {undefined}
   */
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

  /**
   * Updates user data in the server by deleting a goal and the remainingDaysPrev, the remainingDaysNow, and the howManyTimesClick for the goal.
   * @param {Number} deleteGoalIndex Takes an index of a goal to delete.
   * @returns {undefined}
   */
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

  /**
   * Updates user data in the server by deleting a room, the remainingDaysPrev, the remainingDaysNow, and the howManyTimesClick for the room. If no other people are in the room, it deletes the room in the server. If there are other people in the room, it updates the room in the server by removing the user's username. It also sorts the updated user's rooms info in chronological order by the dates.
   * @param {Number} deleteRoomIndex Takes an index of a room to delete.
   * @returns {undefined}
   */
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

  /**
   * Deletes a room found by roomId in the server.
   * @param {String} roomId Takes a room ID you want to delete from the server
   * @returns {undefined}
   */
  async deleteRoomDatabase(roomId) {
    try {
      await this._apiCall(`/room/delete/${roomId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
        credentials: "include",
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Marks selected goals to create rooms as selected.
   * @param {Number[]} selectedGoalsIndex Takes an array of indexes of goals selected to create rooms.
   * @returns {undefined}
   */
  _saveSelectedGoals(selectedGoalsIndex) {
    selectedGoalsIndex.forEach(
      (index) => (this._curUser.goals[index].selected = true)
    );
  }

  /**
   * Removes selected from a goal that was deleted from rooms.
   * @param {Number} selectedGoal Takes goal info of a goal deleted from rooms.
   * @returns {undefined}
   */
  _removeSelected(selectedGoal) {
    const selectedGoalIndex = this._curUser.goals.findIndex(
      (goal) => goal === selectedGoal
    );

    this._curUser.goals[selectedGoalIndex].selected = false;
  }

  /**
   * Calculates remainigDays from today to a goal, goals, a room, or rooms depending on the arguments provided.
   * @param {String} type type is 'goals' or 'rooms'. If you want to calculate goal/goals, type is 'goals', it you want to calculate room/rooms, type is 'rooms'.
   * @param {Object | Object[]} [goalRoom] Takes an goal info object or an array of goals info objects when type is 'goals', and an room info object or an array of rooms info objects when type is 'rooms'. If this is a falsy value or empty, user's remainingDays for type is calculated.
   * @returns {Array} A calculated remainingDays is returned.
   */
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

  /**
   * When user clicks the days counter button, it decreases the numbers of remainingDaysPrev when type is 'goals', and remainingDaysPrevRooms when type is 'rooms'.
   * @param {String} type type is 'goals' or 'rooms'.
   * @returns {Number[]} An updated remainingDaysPrev when type is 'goals' and an updated remainingDaysPrevRooms when type is 'rooms' is returned.
   */
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

  /**
   * Calculates howManyTimesClick using the remainingDaysPrev and remainingDaysNow provided.
   * @param {Number[]} remainingDaysPrev Takes a remainingDaysPrev to calculate howManyTimesClick.
   * @param {Number[]} remainingDaysNow  Takes a remainingDaysNow to calculate howManyTimesClick.
   * @returns {Number[]} A calculated howManyTimesClick is returned.
   */
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

  /**
   * Sorts user goals, remainingDaysPrev, remainingDaysNow, and howManyTimesClick when type is 'goals', and user rooms, remainingDaysPrevRooms,  remainingDaysNowRooms, howManyTimesClickRooms when type = 'rooms' in chronological order.
   * @param {String} [type="goals"] type is 'goals' or 'rooms'.
   */
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

  /**
   * Sorts goals or rooms provided in chronological order. Goals/rooms with unset dates are put at the end.
   * @param {Object[]} goalsOrRooms Takes an array of goals or rooms info objects.
   * @returns {Object[]} An array of sorted goals/rooms are returned.
   */
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

  /**
   *
   * @param {Object[]} originalGoalsOrRooms Takes an array of goals or rooms info objects before they are sorted.
   * @param {Object[]} sortedGoalsOrRooms Takes an array of goals or rooms info objects after they are sorted.
   * @param {String} type type is 'goals' or 'rooms'. If you want to change orders for goals, type is 'goals', If you want to change orders for rooms, type is 'rooms'.
   * @returns {Array[]} An array contains sortedRemainingDaysPrev, sortedRemainingDaysNow, and sortedHowManyTimesClick is returned.
   */
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

  /**
   * Updates user's username or email in the server. If it updates username, it also updates rooms the user has to update the usernames in the server.
   * @param {*} updateInput { updateField: updateValue } Updates user info with the argument.
   * @param {*} section section is 'username' or 'email', which you want to update.
   * @returns {Object} data from the server is returned.
   */
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

  /**
   * Updates user password by validating the user current password with curPassword. newPassword becomes user's new password if the validation is success.
   * @param {String} curPassword A current user password to validate.
   * @param {String} newPassword A new user password to be used.
   * @returns {undefined}
   */
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

  async resetPasswordFromEmail(emailInput) {
    try {
      const data = await this._apiCall("/user/reset/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: emailInput }),
      });
    } catch (err) {
      throw err;
    }
  }

  //For dev
  health = async function () {
    try {
      const res = await fetch(`${BASE_URL}/user/health`);

      if (!res.ok) return { success: false };

      const data = await res.json();

      return data;
    } catch (err) {
      console.error("Server not connected");
    }
  };
}

export default new UserManageApi();

//For dev
// (async function () {
//   console.log(await new UserManageApi().health());
// })();
