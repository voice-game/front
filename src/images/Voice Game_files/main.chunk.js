(this["webpackJsonpvoice-game"] = this["webpackJsonpvoice-game"] || []).push([["main"],{

/***/ "./src/actions/actionCreators.js":
/*!***************************************!*\
  !*** ./src/actions/actionCreators.js ***!
  \***************************************/
/*! exports provided: checkAuthorization, playerLogin, playerLogout, fetchRoomsAction, createRoomAction, joinRoomAction, leaveRoomAction, deleteRoomAction, changeRoomStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkAuthorization", function() { return checkAuthorization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerLogin", function() { return playerLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerLogout", function() { return playerLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRoomsAction", function() { return fetchRoomsAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRoomAction", function() { return createRoomAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinRoomAction", function() { return joinRoomAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leaveRoomAction", function() { return leaveRoomAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteRoomAction", function() { return deleteRoomAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeRoomStatus", function() { return changeRoomStatus; });
/* harmony import */ var _actionTypes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes.js */ "./src/actions/actionTypes.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.js");
/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! universal-cookie */ "./node_modules/universal-cookie/es6/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);




const checkAuthorization = () => async dispatch => {
  dispatch({
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CHECK_AUTHORIZATION
  });

  try {
    const cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_2__["default"]();
    const token = cookies.get("jwt");
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_1__["USER_SERVER_API"]}/check_auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token
      })
    });
    const result = await response.json();

    if (result.message === "Authorization Success") {
      dispatch({
        type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CHECK_AUTHORIZATION_SUCCESS,
        payload: result.data
      });
    } else {
      dispatch({
        type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CHECK_AUTHORIZATION_FAIL
      });
    }
  } catch (err) {
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CHECK_AUTHORIZATION_FAIL
    });
  }
};
const playerLogin = data => async dispatch => {
  dispatch({
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().PLAYER_LOGIN
  });

  try {
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_1__["USER_SERVER_API"]}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    const cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_2__["default"]();
    cookies.set("jwt", result.token);
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().PLAYER_LOGIN_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().PLAYER_LOGIN_FAIL
    });
  }
};
const playerLogout = () => {
  const cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_2__["default"]();
  cookies.remove("jwt");
  return {
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().PLAYER_LOGOUT
  };
};
const fetchRoomsAction = gameTitle => async dispatch => {
  dispatch({
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().FETCH_ROOMS
  });

  try {
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_1__["USER_SERVER_API"]}/games/${gameTitle}`);
    const result = await response.json();
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().FETCH_ROOMS_SUCCESS,
      payload: {
        gameTitle,
        rooms: result.data
      }
    });
  } catch (e) {
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().FETCH_ROOMS_FAIL
    });
  }
};
const createRoomAction = (gameTitle, newRoomId, createdBy) => async (dispatch, getState, {
  history
}) => {
  dispatch({
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CREATE_ROOM
  });

  try {
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_1__["USER_SERVER_API"]}/games/${gameTitle}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameTitle,
        newRoomId,
        createdBy
      })
    });
    const result = await response.json();
    history.push("/alsdkfjasldk");
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CREATE_ROOM_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CREATE_ROOM_FAIL
    });
  }
};
const joinRoomAction = (gameTitle, roomId, playerData) => async (dispatch) => {
  dispatch({
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().JOIN_ROOM
  });

  try {
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_1__["USER_SERVER_API"]}/games/${gameTitle}/${roomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameTitle,
        roomId,
        playerData,
        type: "JOIN"
      })
    });
    const result = await response.json();
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().JOIN_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data
      }
    });
  } catch (e) {
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().JOIN_ROOM_FAIL
    });
  }
};
const leaveRoomAction = (gameTitle, roomId, playerData) => async (dispatch) => {
  dispatch({
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().LEAVE_ROOM
  });

  try {
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_1__["USER_SERVER_API"]}/games/${gameTitle}/${roomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameTitle,
        roomId,
        playerData,
        type: "LEAVE"
      })
    });
    const result = await response.json();
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().LEAVE_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data
      }
    });
  } catch (e) {
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().LEAVE_ROOM_FAIL
    });
  }
};
const deleteRoomAction = (gameTitle, roomId) => async dispatch => {
  dispatch({
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().DELETE_ROOM
  });

  try {
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_1__["USER_SERVER_API"]}/games/${gameTitle}/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameTitle,
        roomId
      })
    });
    const result = await response.json();
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().DELETE_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data
      }
    });
  } catch (e) {
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().DELETE_ROOM_FAIL
    });
  }
};
const changeRoomStatus = (gameTitle, roomId, status) => async (dispatch) => {
  dispatch({
    type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CHANGE_ROOM_STATUS
  });

  try {
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_1__["USER_SERVER_API"]}/games/${gameTitle}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameTitle,
        roomId,
        status
      })
    });
    const result = await response.json();
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CHANGE_ROOM_STATUS_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data
      }
    });
  } catch (err) {
    dispatch({
      type: Object(_actionTypes_js__WEBPACK_IMPORTED_MODULE_0__["default"])().CHANGE_ROOM_STATUS_FAIL
    });
  }
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/actions/actionTypes.js":
/*!************************************!*\
  !*** ./src/actions/actionTypes.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const getActionTypes = () => ({
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  CHECK_AUTHORIZATION_SUCCESS: "CHECK_AUTHORIZATION_SUCCESS",
  CHECK_AUTHORIZATION_FAIL: "CHECK_AUTHORIZATION_FAIL",
  PLAYER_LOGIN: "PLAYER_LOGIN",
  PLAYER_LOGIN_SUCCESS: "PLAYER_LOGIN_SUCCESS",
  PLAYER_LOGIN_FAIL: "PLAYER_LOGIN_FAIL",
  PLAYER_LOGOUT: "PLAYER_LOGOUT",
  PLAYER_LOGOUT_SUCCESS: "PLAYER_LOGOUT",
  PLAYER_LOGOUT_FAIL: "PLAYER_LOGOUT",
  FETCH_ROOMS: "FETCH_ROOMS",
  FETCH_ROOMS_SUCCESS: "FETCH_ROOMS_SUCCESS",
  FETCH_ROOMS_FAIL: "FETCH_ROOMS_FAIL",
  CREATE_ROOM: "CREATE_ROOM",
  CREATE_ROOM_SUCCESS: "CREATE_ROOM_SUCCESS",
  CREATE_ROOM_FAIL: "CREATE_ROOM_FAIL",
  JOIN_ROOM: "JOIN_ROOM",
  JOIN_ROOM_SUCCESS: "JOIN_ROOM_SUCCESS",
  JOIN_ROOM_FAIL: "JOIN_ROOM_FAIL",
  LEAVE_ROOM: "LEAVE_ROOM",
  LEAVE_ROOM_SUCCESS: "LEAVE_ROOM_SUCCESS",
  LEAVE_ROOM_FAIL: "LEAVE_ROOM_FAIL",
  DELETE_ROOM: "DELETE_ROOM",
  DELETE_ROOM_SUCCESS: "DELETE_ROOM_SUCCESS",
  DELETE_ROOM_FAIL: "DELETE_ROOM_FAIL",
  CHANGE_ROOM_STATUS: "CHANGE_ROOM_STATUS",
  CHANGE_ROOM_STATUS_SUCCESS: "CHANGE_ROOM_STATUS_SUCCESS",
  CHANGE_ROOM_STATUS_FAIL: "CHANGE_ROOM_STATUS_FAIL",
  PATCH_RESULT: "PATCH_RESULT",
  PATCH_RESULT_SUCCESS: "PATCH_RESULT_SUCCESS",
  PATCH_RESULT_FAIL: "PATCH_RESULT_FAIL"
});

/* harmony default export */ __webpack_exports__["default"] = (getActionTypes);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/api/firebaseAPIs.js":
/*!*********************************!*\
  !*** ./src/api/firebaseAPIs.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.esm.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const firebaseConfig = {
  apiKey: "AIzaSyALspZWh3HR3fstIywQ1m3Pc-7IyUuOPU8",
  authDomain: "vanilla-docs.firebaseapp.com",
  projectId: "vanilla-docs",
  storageBucket: "vanilla-docs.appspot.com",
  databaseURL: "https://vanilla-docs-default-rtdb.firebaseio.com/"
};
const firebaseApp = firebase__WEBPACK_IMPORTED_MODULE_0__["default"].initializeApp(firebaseConfig);
/* harmony default export */ __webpack_exports__["default"] = (firebaseApp);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/api/firebaseService.js":
/*!************************************!*\
  !*** ./src/api/firebaseService.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.esm.js");
/* harmony import */ var _firebaseAPIs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firebaseAPIs */ "./src/api/firebaseAPIs.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);




function AuthService() {}

_c = AuthService;

AuthService.prototype.login = providerName => {
  const authProvider = new firebase__WEBPACK_IMPORTED_MODULE_0__["default"].auth[`${providerName}AuthProvider`]();
  return _firebaseAPIs__WEBPACK_IMPORTED_MODULE_1__["default"].auth().signInWithPopup(authProvider);
};

AuthService.prototype.logout = () => {
  firebase__WEBPACK_IMPORTED_MODULE_0__["default"].auth().signOut();
};

AuthService.prototype.onAuthChange = callback => {
  firebase__WEBPACK_IMPORTED_MODULE_0__["default"].auth().onAuthStateChanged(user => {
    callback(user);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (AuthService);

var _c;

__webpack_require__.$Refresh$.register(_c, "AuthService");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/App/App.jsx":
/*!************************************!*\
  !*** ./src/components/App/App.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/actionCreators */ "./src/actions/actionCreators.js");
/* harmony import */ var _Login_Login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Login/Login */ "./src/components/Login/Login.jsx");
/* harmony import */ var _Logout_Logout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Logout/Logout */ "./src/components/Logout/Logout.jsx");
/* harmony import */ var _GameList_GameList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../GameList/GameList */ "./src/components/GameList/GameList.jsx");
/* harmony import */ var _GameRoomList_GameRoomList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../GameRoomList/GameRoomList */ "./src/components/GameRoomList/GameRoomList.jsx");
/* harmony import */ var _RoadRoller_RoadRoller__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../RoadRoller/RoadRoller */ "./src/components/RoadRoller/RoadRoller.jsx");
/* harmony import */ var _FighterAttack_FighterAttack__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../FighterAttack/FighterAttack */ "./src/components/FighterAttack/FighterAttack.jsx");
/* harmony import */ var _EnergyBattle_EnergyBattle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../EnergyBattle/EnergyBattle */ "./src/components/EnergyBattle/EnergyBattle.jsx");
/* harmony import */ var _ErrorPage_ErrorPage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ErrorPage/ErrorPage */ "./src/components/ErrorPage/ErrorPage.jsx");
/* harmony import */ var _EnergyBattle_GamePage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../EnergyBattle/GamePage */ "./src/components/EnergyBattle/GamePage.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/App/App.jsx",
    _s = __webpack_require__.$Refresh$.signature();

















const App = ({
  authService
}) => {
  _s();

  const {
    isAuthorized
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(state => state.authReducer);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_3__["checkAuthorization"])());
  }, [dispatch]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
    children: !isAuthorized ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_Login_Login__WEBPACK_IMPORTED_MODULE_4__["default"], {
      authService: authService
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["Fragment"], {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: "/",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_GameList_GameList__WEBPACK_IMPORTED_MODULE_6__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: "/games",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_GameList_GameList__WEBPACK_IMPORTED_MODULE_6__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/games/roadRoller",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_RoadRoller_RoadRoller__WEBPACK_IMPORTED_MODULE_8__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: "/games/fighterAttack",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_GameRoomList_GameRoomList__WEBPACK_IMPORTED_MODULE_7__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/games/fighterAttack/:roomId",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_FighterAttack_FighterAttack__WEBPACK_IMPORTED_MODULE_9__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: "/games/energyBattle",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_GameRoomList_GameRoomList__WEBPACK_IMPORTED_MODULE_7__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/games/energyBattle/:roomId",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_EnergyBattle_EnergyBattle__WEBPACK_IMPORTED_MODULE_10__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/logout",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_Logout_Logout__WEBPACK_IMPORTED_MODULE_5__["default"], {
          authService: authService
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/error",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__["jsxDEV"])(_ErrorPage_ErrorPage__WEBPACK_IMPORTED_MODULE_11__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 11
      }, undefined)]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, undefined);
};

_s(App, "pj5z8M2N0ikF3bX0IKKzEAt0H18=", false, function () {
  return [react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"]];
});

_c = App;
/* harmony default export */ __webpack_exports__["default"] = (App);

var _c;

__webpack_require__.$Refresh$.register(_c, "App");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/EnergyBattle/EnergyBattle.jsx":
/*!******************************************************!*\
  !*** ./src/components/EnergyBattle/EnergyBattle.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _GameOption_GameOption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GameOption/GameOption */ "./src/components/GameOption/GameOption.jsx");
/* harmony import */ var _EnergyBattleFrame_EnergyBattleFrame__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../EnergyBattleFrame/EnergyBattleFrame */ "./src/components/EnergyBattleFrame/EnergyBattleFrame.jsx");
/* harmony import */ var _GameResult_GameResult__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../GameResult/GameResult */ "./src/components/GameResult/GameResult.jsx");
/* harmony import */ var _PlayerCard_PlayerCard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../PlayerCard/PlayerCard */ "./src/components/PlayerCard/PlayerCard.jsx");
/* harmony import */ var _utils_getMedia__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/getMedia */ "./src/utils/getMedia.js");
/* harmony import */ var _utils_VolumeMeter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/VolumeMeter */ "./src/utils/VolumeMeter.js");
/* harmony import */ var _utils_wait__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/wait */ "./src/utils/wait.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../constants/constants */ "./src/constants/constants.js");
/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../actions/actionCreators */ "./src/actions/actionCreators.js");
/* harmony import */ var _hooks_useMultiPlay__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../hooks/useMultiPlay */ "./src/hooks/useMultiPlay.js");
/* harmony import */ var _hooks_useMultiPlay__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_hooks_useMultiPlay__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/EnergyBattle/EnergyBattle.jsx",
    _s = __webpack_require__.$Refresh$.signature();

















const socket = socket_io_client__WEBPACK_IMPORTED_MODULE_3___default()(_constants_constants__WEBPACK_IMPORTED_MODULE_12__["USER_SERVER"], {
  withCredential: true
});
const canvasWidth = document.body.clientWidth * 0.9;
const canvasHeight = document.body.clientWidth * 0.6;
const GameTitle = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].h1`
  margin: 0;
  margin-bottom: 2vh;
  width: 100%;
  text-align: center;
`;
_c = GameTitle;
const OperationContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div`
  display: flex;
  justify-content: space-around;
  width: 60%;
  height: 5vh;
  margin: 0 auto;
`;
_c2 = OperationContainer;
const StartButton = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].button``;

const EnergyBattle = props => {
  _s();

  const [stream, setStream] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [volumeMeter, setVolumeMeter] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [isPlay, setIsPlay] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [isStartDisabled, setIsStartDisabled] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [otherPlayer, setOtherPlayer] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  const param = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useParams"])();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])();
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  const roomData = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(state => state.roomReducer);
  const {
    playerData
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(state => state.authReducer);
  const gameTitle = location.pathname.split("/")[2];
  const roomId = param.roomId;
  const createrRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const currentRoom = roomData[gameTitle].filter(room => room.roomId === roomId)[0];
  console.log(currentRoom);
  const setInitialRoomSet = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {}); //   socket.emit("join-room", roomId, playerData);
  //   if (currentRoom.createBy === playerData._id) {
  //     createrRef.current = currentRoom.createdBy._id;
  //   } else {
  //     dispatch(joinRoomAction(gameTitle, roomId, playerData));
  //     const existingPlayers = currentRoom.players.filter(
  //       (player) => player.playerId !== playerData.playerId
  //     );
  //     setOtherPlayer(existingPlayers);
  //   }
  // }, [currentRoom.createBy, currentRoom.createdBy._id, currentRoom.players, dispatch, gameTitle, playerData, roomId]);

  const handlePlayerConnect = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(data => {
    if (data.playerData.playerId !== playerData.playerId) {
      setOtherPlayer(data.playerData);
    }

    if (data.socketList.length >= _constants_constants__WEBPACK_IMPORTED_MODULE_12__["MAX_PLAYER"][gameTitle]) {
      dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_13__["changeRoomStatus"])(gameTitle, roomId, "Full"));
    }
  }, [dispatch, gameTitle, playerData.playerId, roomId]);
  const handlePlayerDisconnect = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async playerData => {
    if (playerData._id === currentRoom.createdby._id) {
      history.push({
        pathname: `/games/${gameTitle}`,
        state: "방장이 퇴장하였습니다."
      });
    } else {
      console.log("player disconnected", playerData, currentRoom);
      await dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_13__["changeRoomStatus"])(gameTitle, roomId, "Enter"));
      setOtherPlayer([]);
    }
  }, [currentRoom, dispatch, gameTitle, history, roomId]);
  const handlePlayerLeave = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    if (playerData._id === currentRoom.createdby._id) {
      await dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_13__["deleteRoomAction"])(gameTitle, roomId, playerData));
      history.push(`/games/${gameTitle}`);
    } else {
      dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_13__["leaveRoomAction"])(gameTitle, roomId, playerData));
    }
  }, [currentRoom.createdby._id, dispatch, gameTitle, history, playerData, roomId]);

  const togglePlaying = () => {
    const next = !isPlay;
    setIsPlay(next);
  };

  const playGame = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    setIsStartDisabled(true);
    const stream = await Object(_utils_getMedia__WEBPACK_IMPORTED_MODULE_9__["default"])({
      audio: true
    });
    const volumeMeter = new _utils_VolumeMeter__WEBPACK_IMPORTED_MODULE_10__["default"](stream, {
      bufferSize: 2048,
      minDecibels: -60,
      maxDecibels: -30,
      timeConstant: 0.9
    }); // counterRef.current = 3;
    // await wait(1000);
    // counterRef.current = 2;
    // await wait(1000);
    // counterRef.current = 1;
    // await wait(1000);
    // counterRef.current = "START";
    // await wait(1000);
    // counterRef.current = null;
    // setStream(stream);
    // setVolumeMeter(volumeMeter);
    // setIsPlay(true);
    // await wait(5000);
    // counterRef.current = 3;
    // await wait(1000);
    // counterRef.current = 2;
    // await wait(1000);
    // counterRef.current = 1;
    // await wait(1000);
    // counterRef.current = "FINISH";
    // await wait(1000);
    // counterRef.current = null;
    // setIsPlay(false);
    // setIsStartDisabled(false);
    // setStream({});
    // setVolumeMeter({});
  }, []);
  const startGame = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    if (isStartDisabled) {
      return;
    }

    socket.emit("start-game");
    playGame();
  }, [playGame, isStartDisabled]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setInitialRoomSet();
  }, [setInitialRoomSet]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    socket.on("player-connected", handlePlayerConnect);
    socket.on("player-disconnected", handlePlayerDisconnect);
    socket.on("start-by-other", playGame);
    return () => {
      socket.emit("leave-player", playerData);
      socket.off("player-connected");
      socket.off("start-by-other");
      socket.off("input-other-player");
      socket.off("player-disconnected");
      handlePlayerLeave();
    };
  }, [playerData, playGame, handlePlayerConnect, handlePlayerDisconnect, handlePlayerLeave]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])("div", {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])("div", {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])("button", {
        onClick: () => history.push(`/games/${gameTitle}`),
        children: "\uB098\uAC00\uAE30"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 217,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])("button", {
        onClick: togglePlaying,
        children: "\uD1A0\uAE00"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 221,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])(_GameOption_GameOption__WEBPACK_IMPORTED_MODULE_5__["default"], {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 222,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])(GameTitle, {
      children: "Energy Battle"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])(OperationContainer, {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])(_PlayerCard_PlayerCard__WEBPACK_IMPORTED_MODULE_8__["default"], {
        player: playerData
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 226,
        columnNumber: 9
      }, undefined), otherPlayer ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])("button", {
        onClick: startGame,
        children: "\uAC8C\uC784\uC2DC\uC791"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 228,
        columnNumber: 11
      }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])("button", {
        onClick: startGame,
        children: "\uB300\uAE30\uC911"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 230,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])(_PlayerCard_PlayerCard__WEBPACK_IMPORTED_MODULE_8__["default"], {
        player: otherPlayer[0]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 232,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])(_EnergyBattleFrame_EnergyBattleFrame__WEBPACK_IMPORTED_MODULE_6__["default"], {
      stream: stream,
      socket: socket,
      playerData: playerData,
      volumeMeter: volumeMeter,
      isPlay: isPlay,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])("div", {
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])("input", {
        type: "text",
        onChange: e => socket.emit("input-player", {
          playerData,
          input: e.target.value
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 244,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_15__["jsxDEV"])(_GameResult_GameResult__WEBPACK_IMPORTED_MODULE_7__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 254,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 215,
    columnNumber: 5
  }, undefined);
};

_s(EnergyBattle, "a8hcaeKGq9+vxkuFlNM9+EfNo9o=", false, function () {
  return [react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useParams"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"]];
});

_c3 = EnergyBattle;
/* harmony default export */ __webpack_exports__["default"] = (EnergyBattle);

var _c, _c2, _c3;

__webpack_require__.$Refresh$.register(_c, "GameTitle");
__webpack_require__.$Refresh$.register(_c2, "OperationContainer");
__webpack_require__.$Refresh$.register(_c3, "EnergyBattle");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/EnergyBattle/GamePage.jsx":
/*!**************************************************!*\
  !*** ./src/components/EnergyBattle/GamePage.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/constants */ "./src/constants/constants.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/EnergyBattle/GamePage.jsx",
    _s = __webpack_require__.$Refresh$.signature();







const GamePage = props => {
  _s();

  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  const param = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useParams"])();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])();
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  const roomData = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(state => state.roomReducer);
  const {
    playerData
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(state => state.authReducer);
  const gameTitle = location.pathname.split("/")[2];
  const roomId = param.roomId;
  const createrRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(location.state);
  const getCurrentRoomDB = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    const response = await fetch(`${_constants_constants__WEBPACK_IMPORTED_MODULE_3__["USER_SERVER_API"]}/games/${gameTitle}/${roomId}`);
    const currentRoom = await response.json();
    console.log(currentRoom);
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getCurrentRoomDB();
  }, [getCurrentRoomDB]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
      children: "hihi"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, undefined);
};

_s(GamePage, "ffd09lHgNYzZPl3RC8QD1LtE8Ns=", false, function () {
  return [react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useParams"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"]];
});

_c = GamePage;
/* harmony default export */ __webpack_exports__["default"] = (GamePage);

var _c;

__webpack_require__.$Refresh$.register(_c, "GamePage");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/EnergyBattleFrame/EnergyBattleFrame.jsx":
/*!****************************************************************!*\
  !*** ./src/components/EnergyBattleFrame/EnergyBattleFrame.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/constants */ "./src/constants/constants.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/EnergyBattleFrame/EnergyBattleFrame.jsx",
    _s = __webpack_require__.$Refresh$.signature();






const Canvas = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].canvas`
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid black;
  background-color: skyblue;
`;
_c = Canvas;

const EnergyBattleFrame = ({
  volumeMeter,
  isPlay,
  socket,
  playerData,
  gameElement,
  canvasWidth,
  canvasHeight
}) => {
  _s();

  const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const otherPlayerInputRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const animationIdRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const ctx = canvasRef.current.getContext("2d");
    let count = 0;
    socket.on("input-other-player", data => {
      otherPlayerInputRef.current = data;
    });

    if (isPlay) {
      const draw = timeStamp => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        count++;
        const volume = volumeMeter.getVolume(); // console.log("my", volume);

        if (count % 5 === 0) {
          // console.log("other", otherPlayerInputRef.current);
          socket.emit("input-player", volume);
        }

        ctx.beginPath();
        ctx.rect(100, 0, 30, 300);
        ctx.fillStyle = "rgba(19, 73, 89, 0)";
        ctx.fill();
        ctx.strokeStyle = "rgba(19, 73, 89, 0)";
        ctx.strokeRect(100, 0, 30, 300);
        ctx.rect(200, 0, 30, otherPlayerInputRef.current * 300);
        ctx.fillStyle = "rgba(19, 73, 89, 0)";
        ctx.fill();
        ctx.strokeStyle = "rgba(19, 73, 89, 0)";
        ctx.strokeRect(100, 0, 30, otherPlayerInputRef.current * 300); // console.log("player", volume);

        animationIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [volumeMeter, gameElement, isPlay, canvasWidth, canvasHeight]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(Canvas, {
      ref: canvasRef,
      width: canvasWidth,
      height: canvasHeight
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])("div", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

_s(EnergyBattleFrame, "JXj4k6T9Q0gQlzzdQrKlBjZHTHE=");

_c2 = EnergyBattleFrame;
/* harmony default export */ __webpack_exports__["default"] = (EnergyBattleFrame);

var _c, _c2;

__webpack_require__.$Refresh$.register(_c, "Canvas");
__webpack_require__.$Refresh$.register(_c2, "EnergyBattleFrame");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/ErrorMessage/ErrorMessage.jsx":
/*!******************************************************!*\
  !*** ./src/components/ErrorMessage/ErrorMessage.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/ErrorMessage/ErrorMessage.jsx";



const ErrorMessageContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  position: absolute;
  width: 300px;
  padding: 20px;
  top: 5px;
  left: 50vw;
  background-color: #ffebee;
  text-align: center;
  color: #d50000;
  font-size: 0.8rem;
  font-weight: 500;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
_c = ErrorMessageContainer;

const ErrorMessage = ({
  error
}) => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(ErrorMessageContainer, {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])("div", {
      children: error.length > 0 ? error : "무엇인가 잘못되었습니다."
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 22,
    columnNumber: 5
  }, undefined);
};

_c2 = ErrorMessage;
/* harmony default export */ __webpack_exports__["default"] = (ErrorMessage);

var _c, _c2;

__webpack_require__.$Refresh$.register(_c, "ErrorMessageContainer");
__webpack_require__.$Refresh$.register(_c2, "ErrorMessage");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/ErrorPage/ErrorPage.jsx":
/*!************************************************!*\
  !*** ./src/components/ErrorPage/ErrorPage.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/ErrorPage/ErrorPage.jsx",
    _s = __webpack_require__.$Refresh$.signature();





const ErrorPageContainer = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
_c = ErrorPageContainer;
const ErrorMessage = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
  font-size: 1.7rem;
  font-weight: 600;
`;
_c2 = ErrorMessage;
const HomeButton = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].button`
  padding: 10px 20px;
  margin-left: 1vw;
  margin-top: 5vh;
  background-color: #ec6998;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;
_c3 = HomeButton;

const ErrorPage = props => {
  _s();

  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(ErrorPageContainer, {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(ErrorMessage, {
      children: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD558\uC600\uC2B5\uB2C8\uB2E4."
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(HomeButton, {
      onClick: () => {
        history.push("/games");
      },
      children: "\uAC8C\uC784\uCC3D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, undefined);
};

_s(ErrorPage, "9cZfZ04734qoCGIctmKX7+sX6eU=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"]];
});

_c4 = ErrorPage;
/* harmony default export */ __webpack_exports__["default"] = (ErrorPage);

var _c, _c2, _c3, _c4;

__webpack_require__.$Refresh$.register(_c, "ErrorPageContainer");
__webpack_require__.$Refresh$.register(_c2, "ErrorMessage");
__webpack_require__.$Refresh$.register(_c3, "HomeButton");
__webpack_require__.$Refresh$.register(_c4, "ErrorPage");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/FighterAttack/FighterAttack.jsx":
/*!********************************************************!*\
  !*** ./src/components/FighterAttack/FighterAttack.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useImage */ "./src/hooks/useImage.js");
/* harmony import */ var _FighterAttackFrame_FighterAttackFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FighterAttackFrame/FighterAttackFrame */ "./src/components/FighterAttackFrame/FighterAttackFrame.jsx");
/* harmony import */ var _GameResult_GameResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameResult/GameResult */ "./src/components/GameResult/GameResult.jsx");
/* harmony import */ var _GameOption_GameOption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameOption/GameOption */ "./src/components/GameOption/GameOption.jsx");
/* harmony import */ var _utils_getMedia__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/getMedia */ "./src/utils/getMedia.js");
/* harmony import */ var _utils_VolumeMeter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/VolumeMeter */ "./src/utils/VolumeMeter.js");
/* harmony import */ var _games_fighterAttack_Background__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../games/fighterAttack/Background */ "./src/games/fighterAttack/Background.js");
/* harmony import */ var _games_fighterAttack_Fighter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../games/fighterAttack/Fighter */ "./src/games/fighterAttack/Fighter.js");
/* harmony import */ var _games_fighterAttack_Obstacle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../games/fighterAttack/Obstacle */ "./src/games/fighterAttack/Obstacle.js");
/* harmony import */ var _games_fighterAttack_PlayInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../games/fighterAttack/PlayInfo */ "./src/games/fighterAttack/PlayInfo.js");
/* harmony import */ var _games_fighterAttack_GameMap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../games/fighterAttack/GameMap */ "./src/games/fighterAttack/GameMap.js");
/* harmony import */ var _images_fighterAttack_leftTree_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../images/fighterAttack/leftTree.png */ "./src/images/fighterAttack/leftTree.png");
/* harmony import */ var _images_fighterAttack_rightTree_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../images/fighterAttack/rightTree.png */ "./src/images/fighterAttack/rightTree.png");
/* harmony import */ var _images_fighterAttack_hill_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../images/fighterAttack/hill.png */ "./src/images/fighterAttack/hill.png");
/* harmony import */ var _images_fighterAttack_house_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../images/fighterAttack/house.png */ "./src/images/fighterAttack/house.png");
/* harmony import */ var _images_fighterAttack_light_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../images/fighterAttack/light.png */ "./src/images/fighterAttack/light.png");
/* harmony import */ var _images_fighterAttack_tomb_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../images/fighterAttack/tomb.png */ "./src/images/fighterAttack/tomb.png");
/* harmony import */ var _images_fighterAttack_fence_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../images/fighterAttack/fence.png */ "./src/images/fighterAttack/fence.png");
/* harmony import */ var _images_fighterAttack_spider_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../images/fighterAttack/spider.png */ "./src/images/fighterAttack/spider.png");
/* harmony import */ var _images_fighterAttack_witch_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../images/fighterAttack/witch.png */ "./src/images/fighterAttack/witch.png");
/* harmony import */ var _images_fighterAttack_cyclops_png__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../images/fighterAttack/cyclops.png */ "./src/images/fighterAttack/cyclops.png");
/* harmony import */ var _images_fighterAttack_dionaea_png__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../images/fighterAttack/dionaea.png */ "./src/images/fighterAttack/dionaea.png");
/* harmony import */ var _images_fighterAttack_dagger_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../images/fighterAttack/dagger.png */ "./src/images/fighterAttack/dagger.png");
/* harmony import */ var _images_fighterAttack_purpleBat_png__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../images/fighterAttack/purpleBat.png */ "./src/images/fighterAttack/purpleBat.png");
/* harmony import */ var _images_fighterAttack_background_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../images/fighterAttack/background.png */ "./src/images/fighterAttack/background.png");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/FighterAttack/FighterAttack.jsx",
    _s = __webpack_require__.$Refresh$.signature();




























const canvasWidth = document.body.clientWidth * 0.8;
const canvasHeight = document.body.clientWidth * 0.6;
const backgroundImageUrls = [_images_fighterAttack_background_png__WEBPACK_IMPORTED_MODULE_25__["default"]];
const monsterImageUrls = [_images_fighterAttack_purpleBat_png__WEBPACK_IMPORTED_MODULE_24__["default"]];
const enenmyImageUrls = [_images_fighterAttack_witch_png__WEBPACK_IMPORTED_MODULE_20__["default"], _images_fighterAttack_cyclops_png__WEBPACK_IMPORTED_MODULE_21__["default"], _images_fighterAttack_dionaea_png__WEBPACK_IMPORTED_MODULE_22__["default"], _images_fighterAttack_dagger_png__WEBPACK_IMPORTED_MODULE_23__["default"]];
const ceilingImageUrls = [_images_fighterAttack_spider_png__WEBPACK_IMPORTED_MODULE_19__["default"]];
const groundImageUrls = [_images_fighterAttack_leftTree_png__WEBPACK_IMPORTED_MODULE_12__["default"], _images_fighterAttack_rightTree_png__WEBPACK_IMPORTED_MODULE_13__["default"], _images_fighterAttack_hill_png__WEBPACK_IMPORTED_MODULE_14__["default"], _images_fighterAttack_house_png__WEBPACK_IMPORTED_MODULE_15__["default"], _images_fighterAttack_light_png__WEBPACK_IMPORTED_MODULE_16__["default"], _images_fighterAttack_tomb_png__WEBPACK_IMPORTED_MODULE_17__["default"], _images_fighterAttack_fence_png__WEBPACK_IMPORTED_MODULE_18__["default"]];

const FighterAttack = props => {
  _s();

  const [stream, setStream] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [volumeMeter, setVolumeMeter] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [isPlay, setIsPlay] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [backgroundImages, setBackgroundImages] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [monsterImages, setMonsterImages] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [groundImages, setGroundImages] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [enemyImages, setEnenmyImageUrls] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [ceilingImages, setCeilingImages] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [gameElement, setGameElement] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    (async () => {
      const stream = await Object(_utils_getMedia__WEBPACK_IMPORTED_MODULE_5__["default"])({
        audio: true
      });
      const volumeMeter = new _utils_VolumeMeter__WEBPACK_IMPORTED_MODULE_6__["default"](stream, {
        bufferSize: 2048,
        minDecibels: -60,
        maxDecibels: -30,
        timeConstant: 0.9
      });
      setStream(stream);
      setVolumeMeter(volumeMeter);
    })();
  }, []);
  Object(_hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"])(backgroundImageUrls, setBackgroundImages);
  Object(_hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"])(monsterImageUrls, setMonsterImages);
  Object(_hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"])(groundImageUrls, setGroundImages);
  Object(_hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"])(ceilingImageUrls, setCeilingImages);
  Object(_hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"])(enenmyImageUrls, setEnenmyImageUrls);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!monsterImages.length) return;
    if (!groundImages.length) return;
    if (!enemyImages.length) return;
    if (!ceilingImages.length) return;
    const groundSpeed = 2;
    const ceilingMap = new _games_fighterAttack_GameMap__WEBPACK_IMPORTED_MODULE_11__["default"]("celing", canvasWidth, canvasHeight, ceilingImages);
    const groundMap = new _games_fighterAttack_GameMap__WEBPACK_IMPORTED_MODULE_11__["default"]("ground", canvasWidth, canvasHeight, groundImages);
    const enemyMap = new _games_fighterAttack_GameMap__WEBPACK_IMPORTED_MODULE_11__["default"]("enemy", canvasWidth, canvasHeight, enemyImages);
    enemyMap.setGameMap("onAir", 7, [0.5, 0.2, 0.6, 0.2, 0.3, 0.6, 0.4], [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], [0, 1, 2, 3, 0, 2, 1]);
    groundMap.setGameMap("onGround", 7, [0, 0, 0, 0, 0, 0, 0], [0.05, 0.1, 0.2, 0.2, 0.3, 0.05, 0.2], [2, 5, 0, 4, 3, 6, 1]);
    ceilingMap.setGameMap("onCeiling", 4, [0, 0, 0, 0], [0.2, 0.2, 0.2, 0.2], [0, 0, 0, 0]);
    const background = new _games_fighterAttack_Background__WEBPACK_IMPORTED_MODULE_7__["default"](canvasWidth, canvasHeight, backgroundImages);
    const playInfo = new _games_fighterAttack_PlayInfo__WEBPACK_IMPORTED_MODULE_10__["default"]();
    const ceiling = new _games_fighterAttack_Obstacle__WEBPACK_IMPORTED_MODULE_9__["default"](ceilingMap.gameMap, 0.2 * groundSpeed);
    const ground = new _games_fighterAttack_Obstacle__WEBPACK_IMPORTED_MODULE_9__["default"](groundMap.gameMap, groundSpeed);
    const enemy = new _games_fighterAttack_Obstacle__WEBPACK_IMPORTED_MODULE_9__["default"](enemyMap.gameMap, 1.5 * groundSpeed);
    const monster = new _games_fighterAttack_Fighter__WEBPACK_IMPORTED_MODULE_8__["default"](0, monsterImages, 50, 3, 5);
    monster.setPosition(canvasWidth, canvasHeight, 36);
    setGameElement({
      playInfo,
      background,
      ceiling,
      ground,
      enemy,
      monster
    });
  }, [backgroundImages, ceilingImages, groundImages, enemyImages, monsterImages]);

  const handlePlayClick = () => setIsPlay(true);

  const handleStopClick = () => setIsPlay(false);

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__["jsxDEV"])("div", {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__["jsxDEV"])("div", {
      children: "Fighter Attack"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__["jsxDEV"])(_GameOption_GameOption__WEBPACK_IMPORTED_MODULE_4__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__["jsxDEV"])(_FighterAttackFrame_FighterAttackFrame__WEBPACK_IMPORTED_MODULE_2__["default"], {
      stream: stream,
      volumeMeter: volumeMeter,
      isPlay: isPlay,
      gameElement: gameElement,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__["jsxDEV"])(_GameResult_GameResult__WEBPACK_IMPORTED_MODULE_3__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__["jsxDEV"])("button", {
      onClick: handlePlayClick,
      children: "Play"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 162,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__["jsxDEV"])("button", {
      onClick: handleStopClick,
      children: "Stop"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 150,
    columnNumber: 5
  }, undefined);
};

_s(FighterAttack, "exVRd2GbtbqXg/nCuERMBBtxcIw=", false, function () {
  return [_hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"], _hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"], _hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"], _hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"], _hooks_useImage__WEBPACK_IMPORTED_MODULE_1__["default"]];
});

_c = FighterAttack;
/* harmony default export */ __webpack_exports__["default"] = (FighterAttack);

var _c;

__webpack_require__.$Refresh$.register(_c, "FighterAttack");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/FighterAttackFrame/FighterAttackFrame.jsx":
/*!******************************************************************!*\
  !*** ./src/components/FighterAttackFrame/FighterAttackFrame.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/FighterAttackFrame/FighterAttackFrame.jsx",
    _s = __webpack_require__.$Refresh$.signature();




const Canvas = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].canvas`
  border: 1px solid black;
  background-color: skyblue;
`;
_c = Canvas;

const FighterAttackFrame = ({
  volumeMeter,
  isPlay,
  gameElement,
  canvasWidth,
  canvasHeight
}) => {
  _s();

  const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const animationIdRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const {
      playInfo,
      background,
      ceiling,
      ground,
      enemy,
      monster
    } = gameElement;
    const ctx = canvasRef.current.getContext("2d");

    if (isPlay) {
      let thenTime;
      let frame = 0;

      const draw = (timeStamp, a) => {
        const timeStep = 1000 / 36;

        if (!thenTime) {
          thenTime = timeStamp;
        }

        if (timeStamp - thenTime <= timeStep) {
          animationIdRef.current = requestAnimationFrame(draw);
          return;
        }

        thenTime = timeStamp;
        frame = (frame + 1) % 36;
        const volume = volumeMeter.getVolume();
        const isCollision = monster.getIsCollision([ground, enemy, ceiling], 300);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        background.animate(ctx);
        ground.animate(ctx);
        enemy.animate(ctx);
        ceiling.animate(ctx);
        monster.animate(ctx, canvasHeight, volume, isCollision, frame);
        playInfo.animate(ctx, canvasWidth, canvasHeight, monster.distance, monster.life, monster.maxLife);
        animationIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [volumeMeter, gameElement, isPlay, canvasWidth, canvasHeight]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(Canvas, {
    ref: canvasRef,
    width: canvasWidth,
    height: canvasHeight
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 80,
    columnNumber: 10
  }, undefined);
};

_s(FighterAttackFrame, "wsnR9c03aCmWLAHMzXdnnonZFYU=");

_c2 = FighterAttackFrame;
/* harmony default export */ __webpack_exports__["default"] = (FighterAttackFrame);

var _c, _c2;

__webpack_require__.$Refresh$.register(_c, "Canvas");
__webpack_require__.$Refresh$.register(_c2, "FighterAttackFrame");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/GameCard/GameCard.jsx":
/*!**********************************************!*\
  !*** ./src/components/GameCard/GameCard.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/GameCard/GameCard.jsx";



const GameCardContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  height: 75vh;
  width: 28vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
`;
_c = GameCardContainer;
const GameTitle = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  margin-top: 10vh;
  font-size: 1.3rem;
  font-weight: 600;
`;
_c2 = GameTitle;
const GameThumbnailContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
_c3 = GameThumbnailContainer;
const GameThumbnailImage = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].img`
  margin-top: 10vh;
  max-width: 80%;
`;
_c4 = GameThumbnailImage;

const GameCard = ({
  title,
  imgSrc,
  onClick
}) => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(GameCardContainer, {
    onClick: () => onClick(title),
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(GameTitle, {
      children: title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(GameThumbnailContainer, {
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(GameThumbnailImage, {
        src: imgSrc,
        alt: "gameThumbnail"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, undefined);
};

_c5 = GameCard;
/* harmony default export */ __webpack_exports__["default"] = (GameCard);

var _c, _c2, _c3, _c4, _c5;

__webpack_require__.$Refresh$.register(_c, "GameCardContainer");
__webpack_require__.$Refresh$.register(_c2, "GameTitle");
__webpack_require__.$Refresh$.register(_c3, "GameThumbnailContainer");
__webpack_require__.$Refresh$.register(_c4, "GameThumbnailImage");
__webpack_require__.$Refresh$.register(_c5, "GameCard");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/GameFrame/GameFrame.jsx":
/*!************************************************!*\
  !*** ./src/components/GameFrame/GameFrame.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/GameFrame/GameFrame.jsx";




const Canvas = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].canvas`
  border: 1px solid red;
`;
_c = Canvas;

const GameFrame = ({
  canvasRef
}) => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(Canvas, {
      ref: canvasRef,
      width: "1000",
      height: "600"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, undefined)
  }, void 0, false);
};

_c2 = GameFrame;
/* harmony default export */ __webpack_exports__["default"] = (GameFrame);

var _c, _c2;

__webpack_require__.$Refresh$.register(_c, "Canvas");
__webpack_require__.$Refresh$.register(_c2, "GameFrame");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/GameList/GameList.jsx":
/*!**********************************************!*\
  !*** ./src/components/GameList/GameList.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ErrorMessage/ErrorMessage */ "./src/components/ErrorMessage/ErrorMessage.jsx");
/* harmony import */ var _GameCard_GameCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameCard/GameCard */ "./src/components/GameCard/GameCard.jsx");
/* harmony import */ var _hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useErrorMessage */ "./src/hooks/useErrorMessage.js");
/* harmony import */ var _GameOption_GameOption__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../GameOption/GameOption */ "./src/components/GameOption/GameOption.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/GameList/GameList.jsx",
    _s = __webpack_require__.$Refresh$.signature();









const MainPage = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].section`
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
_c = MainPage;
const MainTitle = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].h1`
  width: 100vw;
  margin-top: 5vh;
  text-align: center;
`;
_c2 = MainTitle;
const GameCardContainer = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
  width: 90%;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
`;
_c3 = GameCardContainer;

const GameList = props => {
  _s();

  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  const [error, showErrorMessage] = Object(_hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"])("");

  const selectGame = game => {
    switch (game) {
      case "Road Roller":
        history.push("/games/roadRoller");
        break;

      case "Fighter Attack":
        history.push("/games/fighterAttack");
        break;

      case "Energy Battle":
        history.push("/games/energyBattle");
        break;

      default:
        showErrorMessage("Wrong game name");
    }
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(MainPage, {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_GameOption_GameOption__WEBPACK_IMPORTED_MODULE_6__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }, undefined), error.length > 0 && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_3__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 28
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(MainTitle, {
      children: " Game List "
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(GameCardContainer, {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_GameCard_GameCard__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: selectGame,
        title: "Road Roller",
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3srjeOY0c1PBqO1DPmjHBuB1zjgDEtfe6Q&usqp=CAU"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_GameCard_GameCard__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: selectGame,
        title: "Fighter Attack",
        imgSrc: "https://lh3.googleusercontent.com/qgotsceXqd0uMmfMjRNgm09jxGkIgAmCcwwe8uFCNb_-9xi3uei8iEcwcaFB8uBKnratsMU7wgSyGBkB8V5vJkSbrQ=w640-h400-e365-rj-sc0x00ffffff"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_GameCard_GameCard__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: selectGame,
        title: "Energy Battle",
        imgSrc: "https://images-na.ssl-images-amazon.com/images/I/81InK8W1PAL.png"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 5
  }, undefined);
};

_s(GameList, "JzHLL5rpVw0F0LvfrBfQ19nCiRw=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"], _hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"]];
});

_c4 = GameList;
/* harmony default export */ __webpack_exports__["default"] = (GameList);

var _c, _c2, _c3, _c4;

__webpack_require__.$Refresh$.register(_c, "MainPage");
__webpack_require__.$Refresh$.register(_c2, "MainTitle");
__webpack_require__.$Refresh$.register(_c3, "GameCardContainer");
__webpack_require__.$Refresh$.register(_c4, "GameList");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/GameOption/GameOption.jsx":
/*!**************************************************!*\
  !*** ./src/components/GameOption/GameOption.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/GameOption/GameOption.jsx",
    _s = __webpack_require__.$Refresh$.signature();





const GameOptionContainer = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
  width: 96%;
  height: 8vh;
  padding: 0 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
_c = GameOptionContainer;
const GameOptionButton = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].button`
  width: 7vw;
  height: 3vh;
  margin-right: 1vw;
  border: none;
  background-color: #ec6998;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;
_c2 = GameOptionButton;

const GameOption = () => {
  _s();

  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])();
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(GameOptionContainer, {
    children: [location.pathname !== "/" && location.pathname !== "/games" && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(GameOptionButton, {
      onClick: () => {
        history.push("/games");
      },
      children: "\uB2E4\uB978\uAC8C\uC784"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 9
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(GameOptionButton, {
      onClick: () => {
        history.push("/logout");
      },
      children: "\uB85C\uADF8\uC544\uC6C3"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 5
  }, undefined);
};

_s(GameOption, "azjqGSEfmvz5+G/YRUZm7OceOpI=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"]];
});

_c3 = GameOption;
/* harmony default export */ __webpack_exports__["default"] = (GameOption);

var _c, _c2, _c3;

__webpack_require__.$Refresh$.register(_c, "GameOptionContainer");
__webpack_require__.$Refresh$.register(_c2, "GameOptionButton");
__webpack_require__.$Refresh$.register(_c3, "GameOption");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/GameResult/GameResult.jsx":
/*!**************************************************!*\
  !*** ./src/components/GameResult/GameResult.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/GameResult/GameResult.jsx";



const GameResult = props => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("div", {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("div", {
      children: "Game Result"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("div", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 5
  }, undefined);
};

_c = GameResult;
/* harmony default export */ __webpack_exports__["default"] = (GameResult);

var _c;

__webpack_require__.$Refresh$.register(_c, "GameResult");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/GameRoomCard/GameRoomCard.jsx":
/*!******************************************************!*\
  !*** ./src/components/GameRoomCard/GameRoomCard.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useErrorMessage */ "./src/hooks/useErrorMessage.js");
/* harmony import */ var _ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ErrorMessage/ErrorMessage */ "./src/components/ErrorMessage/ErrorMessage.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/GameRoomCard/GameRoomCard.jsx",
    _s = __webpack_require__.$Refresh$.signature();







const GameRoomCardContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  position: relative;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 400;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  cursor: pointer;
`;
_c = GameRoomCardContainer;
const GameRoomStatus = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  position: absolute;
  bottom: 10%;
  right: 10%;
`;
_c2 = GameRoomStatus;

const GameRoomCard = ({
  room: {
    _id,
    players,
    createdBy,
    createdAt,
    status
  },
  onClick
}) => {
  _s();

  const [error, showErrorMessage] = Object(_hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_2__["default"])("");

  const handleClick = () => {
    if (status === "Enter") {
      return onClick();
    }

    showErrorMessage("입장이 불가능합니다.");
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["Fragment"], {
    children: [error.length > 0 && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_3__["default"], {
      error: error
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 28
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(GameRoomCardContainer, {
      onClick: handleClick,
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
        children: _id
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
          children: ["\uCC38\uC5EC\uC790: ", players.length]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
          children: ["\uBC29\uC7A5: ", createdBy.name]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
          children: createdAt
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(GameRoomStatus, {
        children: status
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

_s(GameRoomCard, "vilYNueAK9Fw35YD66/ICJJEwss=", false, function () {
  return [_hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_2__["default"]];
});

_c3 = GameRoomCard;
/* harmony default export */ __webpack_exports__["default"] = (GameRoomCard);

var _c, _c2, _c3;

__webpack_require__.$Refresh$.register(_c, "GameRoomCardContainer");
__webpack_require__.$Refresh$.register(_c2, "GameRoomStatus");
__webpack_require__.$Refresh$.register(_c3, "GameRoomCard");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/GameRoomList/GameRoomList.jsx":
/*!******************************************************!*\
  !*** ./src/components/GameRoomList/GameRoomList.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var pusher_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! pusher-js */ "./node_modules/pusher-js/dist/web/pusher.js");
/* harmony import */ var pusher_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(pusher_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _GameRoomCard_GameRoomCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../GameRoomCard/GameRoomCard */ "./src/components/GameRoomCard/GameRoomCard.jsx");
/* harmony import */ var _GameOption_GameOption__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../GameOption/GameOption */ "./src/components/GameOption/GameOption.jsx");
/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/actionCreators */ "./src/actions/actionCreators.js");
/* harmony import */ var _utils_pickRandomRoom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/pickRandomRoom */ "./src/utils/pickRandomRoom.js");
/* harmony import */ var _hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/useErrorMessage */ "./src/hooks/useErrorMessage.js");
/* harmony import */ var _ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ErrorMessage/ErrorMessage */ "./src/components/ErrorMessage/ErrorMessage.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/GameRoomList/GameRoomList.jsx",
    _s = __webpack_require__.$Refresh$.signature();














const GameRoomGrid = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2vh;
  row-gap: 2vw;
  margin-top: 30px;
  padding: 30px;
`;
_c = GameRoomGrid;

const GameRoomList = () => {
  _s();

  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])();
  const gameTitle = location.pathname.split("/")[2];
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  const player = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(state => state.authReducer.playerData);
  const roomList = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(state => state.roomReducer[gameTitle]);
  const [error, showErrorMessage] = Object(_hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_10__["default"])("");
  const fetchRooms = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_8__["fetchRoomsAction"])(gameTitle));
  }, [dispatch, gameTitle]);
  const createRoom = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    const newRoomId = Object(uuid__WEBPACK_IMPORTED_MODULE_4__["v4"])();
    await dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_8__["createRoomAction"])(gameTitle, newRoomId, player._id)); // history.push(`${location.pathname}/${newRoomId}`);
  }, [history, location.pathname, dispatch, gameTitle, player]);
  const enterRandom = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    const picked = Object(_utils_pickRandomRoom__WEBPACK_IMPORTED_MODULE_9__["default"])(roomList);

    if (!picked) {
      showErrorMessage("입장 가능한 방이 없습니다.");
    } else {
      history.push(`${location.pathname}/${picked.roomId}`);
    }
  }, [history, location.pathname, roomList, showErrorMessage]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (location.state) {
      showErrorMessage(location.state);
      location.state = null;
    }

    fetchRooms(gameTitle);
    const pusher = new pusher_js__WEBPACK_IMPORTED_MODULE_5___default.a("30ceeaf0ff00549eff23", {
      cluster: "ap3"
    });
    const channel = pusher.subscribe("rooms");
    channel.bind("changed", () => {
      fetchRooms(gameTitle);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [fetchRooms, location, gameTitle, location.state, showErrorMessage]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
    children: [error.length > 0 && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])(_ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_11__["default"], {
      error: error
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 28
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
      children: gameTitle
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("button", {
        onClick: createRoom,
        children: "\uBC29\uB9CC\uB4E4\uAE30"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("button", {
        onClick: enterRandom,
        children: "\uB79C\uB364\uC785\uC7A5"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])(_GameOption_GameOption__WEBPACK_IMPORTED_MODULE_7__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])(GameRoomGrid, {
      children: roomList.map(room => {
        return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])(_GameRoomCard_GameRoomCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
          onClick: () => history.push(`${location.pathname}/${room.roomId}`),
          room: room
        }, room.roomId, false, {
          fileName: _jsxFileName,
          lineNumber: 95,
          columnNumber: 13
        }, undefined);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 84,
    columnNumber: 5
  }, undefined);
};

_s(GameRoomList, "SYPKFVzWDFR99h0Gmg5eWA1M+tg=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"], react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"], _hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_10__["default"]];
});

_c2 = GameRoomList;
/* harmony default export */ __webpack_exports__["default"] = (GameRoomList);

var _c, _c2;

__webpack_require__.$Refresh$.register(_c, "GameRoomGrid");
__webpack_require__.$Refresh$.register(_c2, "GameRoomList");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/Login/Login.jsx":
/*!****************************************!*\
  !*** ./src/components/Login/Login.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/actionCreators */ "./src/actions/actionCreators.js");
/* harmony import */ var _hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useErrorMessage */ "./src/hooks/useErrorMessage.js");
/* harmony import */ var _ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ErrorMessage/ErrorMessage */ "./src/components/ErrorMessage/ErrorMessage.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/Login/Login.jsx",
    _s = __webpack_require__.$Refresh$.signature();








const LoginContainer = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
_c = LoginContainer;
const LoginButton = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].button`
  padding: 10px;
  width: 180px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  margin-top: 1vh;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;
_c2 = LoginButton;

const Login = ({
  authService
}) => {
  _s();

  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const [error, showErrorMessage] = Object(_hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_4__["default"])("");
  const onLogin = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async event => {
    try {
      const loginData = await authService.login(event.target.name); // 구글일때

      const {
        email,
        uid,
        displayName
      } = loginData.user;
      dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_3__["playerLogin"])({
        email,
        uid,
        displayName
      })); // 깃허브일때 (loginData 형태 필요)
    } catch (err) {
      showErrorMessage("로그인에 실패하였습니다.");
    }
  }, [authService, dispatch, showErrorMessage]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(LoginContainer, {
    children: [error.length > 0 && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"], {
      error: error
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 28
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("h1", {
      children: "Log In"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(LoginButton, {
      name: "Google",
      onClick: onLogin,
      children: "\uAD6C\uAE00 \uB85C\uADF8\uC778"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(LoginButton, {
      name: "Github",
      onClick: onLogin,
      children: "\uAE43\uD5C8\uBE0C \uB85C\uADF8\uC778"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 49,
    columnNumber: 5
  }, undefined);
};

_s(Login, "KoIMZlHhPQRhQPhX2usHrmdZRW0=", false, function () {
  return [react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"], _hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_4__["default"]];
});

_c3 = Login;
/* harmony default export */ __webpack_exports__["default"] = (Login);

var _c, _c2, _c3;

__webpack_require__.$Refresh$.register(_c, "LoginContainer");
__webpack_require__.$Refresh$.register(_c2, "LoginButton");
__webpack_require__.$Refresh$.register(_c3, "Login");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/Logout/Logout.jsx":
/*!******************************************!*\
  !*** ./src/components/Logout/Logout.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/actionCreators */ "./src/actions/actionCreators.js");
/* harmony import */ var _hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useErrorMessage */ "./src/hooks/useErrorMessage.js");
/* harmony import */ var _ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ErrorMessage/ErrorMessage */ "./src/components/ErrorMessage/ErrorMessage.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/Logout/Logout.jsx",
    _s = __webpack_require__.$Refresh$.signature();









const LogoutContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
_c = LogoutContainer;
const LogoutMessage = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div`
  font-size: 1.7rem;
  font-weight: 600;
`;
_c2 = LogoutMessage;
const LogoutButton = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button`
  padding: 10px 20px;
  margin-left: 1vw;
  margin-top: 5vh;
  background-color: #ec6998;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;
_c3 = LogoutButton;
const CancelButton = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button`
  padding: 10px 20px;
  margin-left: 1vw;
  margin-top: 2vh;
  background-color: #636e72;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;
_c4 = CancelButton;

const Logout = ({
  authService
}) => {
  _s();

  const [error, showErrorMessage] = Object(_hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"])("");
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();

  const onLogout = async event => {
    try {
      await authService.logout();
      dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_4__["playerLogout"])());
      history.push("/");
    } catch {
      showErrorMessage("로그아웃에 실패하였습니다.");
    }
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(LogoutContainer, {
    children: [error.length > 0 && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_ErrorMessage_ErrorMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
      error: error
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 28
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(LogoutMessage, {
      children: "\uB85C\uADF8\uC544\uC6C3 \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(LogoutButton, {
      onClick: onLogout,
      children: "\uB85C\uADF8\uC544\uC6C3"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(CancelButton, {
      onClick: () => {
        history.push("/games");
      },
      children: "\uAC8C\uC784\uCC3D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 66,
    columnNumber: 5
  }, undefined);
};

_s(Logout, "HJ+1EnNqbIj5EhaxFZRrzHvWkdI=", false, function () {
  return [_hooks_useErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"], react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"], react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"]];
});

_c5 = Logout;
/* harmony default export */ __webpack_exports__["default"] = (Logout);

var _c, _c2, _c3, _c4, _c5;

__webpack_require__.$Refresh$.register(_c, "LogoutContainer");
__webpack_require__.$Refresh$.register(_c2, "LogoutMessage");
__webpack_require__.$Refresh$.register(_c3, "LogoutButton");
__webpack_require__.$Refresh$.register(_c4, "CancelButton");
__webpack_require__.$Refresh$.register(_c5, "Logout");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/PlayerCard/PlayerCard.jsx":
/*!**************************************************!*\
  !*** ./src/components/PlayerCard/PlayerCard.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/PlayerCard/PlayerCard.jsx",
    _s = __webpack_require__.$Refresh$.signature();






const PlayerCardContainer = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
  width: 30%;
  background-color: lightgray;
`;
_c = PlayerCardContainer;
const PlayerName = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
  width: 100%;
  text-align: center;
`;
_c2 = PlayerName;
const PlayerInfo = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
  width: 100%;
  text-align: center;
`;

const PlayerCard = ({
  player
}) => {
  _s();

  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])();
  const gameTitle = location.pathname.split("/")[2];
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(PlayerCardContainer, {
    children: !player ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(PlayerName, {
      children: "\uD50C\uB808\uC774\uC5B4 \uB300\uAE30 \uC911"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["Fragment"], {
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__["jsxDEV"])(PlayerName, {
        children: player === null || player === void 0 ? void 0 : player.name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 11
      }, undefined)
    }, void 0, false)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, undefined);
};

_s(PlayerCard, "pkHmaVRPskBaU4tMJuJJpV42k1I=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"]];
});

_c3 = PlayerCard;
/* harmony default export */ __webpack_exports__["default"] = (PlayerCard);

var _c, _c2, _c3;

__webpack_require__.$Refresh$.register(_c, "PlayerCardContainer");
__webpack_require__.$Refresh$.register(_c2, "PlayerName");
__webpack_require__.$Refresh$.register(_c3, "PlayerCard");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/RoadRoller/RoadRoller.jsx":
/*!**************************************************!*\
  !*** ./src/components/RoadRoller/RoadRoller.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _games_roadRoller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../games/roadRoller */ "./src/games/roadRoller/index.js");
/* harmony import */ var _hooks_useCanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useCanvas */ "./src/hooks/useCanvas.js");
/* harmony import */ var _hooks_usePitchDetector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/usePitchDetector */ "./src/hooks/usePitchDetector.js");
/* harmony import */ var _utils_getAudioContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/getAudioContext */ "./src/utils/getAudioContext.js");
/* harmony import */ var _utils_getMedia__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/getMedia */ "./src/utils/getMedia.js");
/* harmony import */ var _GameFrame_GameFrame__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../GameFrame/GameFrame */ "./src/components/GameFrame/GameFrame.jsx");
/* harmony import */ var _GameOption_GameOption__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../GameOption/GameOption */ "./src/components/GameOption/GameOption.jsx");
/* harmony import */ var _GameResult_GameResult__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../GameResult/GameResult */ "./src/components/GameResult/GameResult.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/components/RoadRoller/RoadRoller.jsx",
    _s = __webpack_require__.$Refresh$.signature();












const RoadRoller = props => {
  _s();

  const [isAudioUse, setIsAudioUse] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const audioContextRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const micStreamRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const pitchDetectorRef = Object(_hooks_usePitchDetector__WEBPACK_IMPORTED_MODULE_3__["default"])(isAudioUse, audioContextRef, micStreamRef);
  const game = Object(_hooks_useCanvas__WEBPACK_IMPORTED_MODULE_2__["default"])(_games_roadRoller__WEBPACK_IMPORTED_MODULE_1__["default"], {
    pitchDetectorRef
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    (async () => {
      try {
        setTimeout(() => {
          audioContextRef.current = Object(_utils_getAudioContext__WEBPACK_IMPORTED_MODULE_4__["default"])({
            samplerate: 12000
          });
        }, 100);
        micStreamRef.current = await Object(_utils_getMedia__WEBPACK_IMPORTED_MODULE_5__["default"])({
          audio: true,
          video: false
        });
      } catch (err) {
        console.log(err);
      }
    })();
  });
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("div", {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_GameOption_GameOption__WEBPACK_IMPORTED_MODULE_7__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_GameFrame_GameFrame__WEBPACK_IMPORTED_MODULE_6__["default"], {
      canvasRef: game
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_GameResult_GameResult__WEBPACK_IMPORTED_MODULE_8__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("button", {
      onClick: () => setIsAudioUse(!isAudioUse),
      children: "Audio On"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("div", {
      children: "W: \uC810\uD504 A: \uC88C D: \uC6B0"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 5
  }, undefined);
};

_s(RoadRoller, "AAKENaXAQ0np6Pgj3CSsFJ17tvQ=", false, function () {
  return [_hooks_usePitchDetector__WEBPACK_IMPORTED_MODULE_3__["default"], _hooks_useCanvas__WEBPACK_IMPORTED_MODULE_2__["default"]];
});

_c = RoadRoller;
/* harmony default export */ __webpack_exports__["default"] = (RoadRoller);

var _c;

__webpack_require__.$Refresh$.register(_c, "RoadRoller");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/constants/constants.js":
/*!************************************!*\
  !*** ./src/constants/constants.js ***!
  \************************************/
/*! exports provided: USER_SERVER, USER_SERVER_API, MAX_PLAYER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_SERVER", function() { return USER_SERVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_SERVER_API", function() { return USER_SERVER_API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_PLAYER", function() { return MAX_PLAYER; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const USER_SERVER = "http://localhost:5000";
const USER_SERVER_API = "http://localhost:5000/api";
const MAX_PLAYER = {
  roadRoller: 5,
  monsterEscape: 20,
  energyBattle: 2
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/fighterAttack/Background.js":
/*!***********************************************!*\
  !*** ./src/games/fighterAttack/Background.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

function Background(canvasWidth, canvasHeight, images) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.images = images;
}

_c = Background;

Background.prototype.animate = function (ctx) {
  ctx.drawImage(this.images[0], 0, 100, 263, 263, 0, 0, this.canvasWidth, this.canvasHeight);
};

/* harmony default export */ __webpack_exports__["default"] = (Background);

var _c;

__webpack_require__.$Refresh$.register(_c, "Background");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/fighterAttack/Fighter.js":
/*!********************************************!*\
  !*** ./src/games/fighterAttack/Fighter.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

function Fighter(type, images, height, speed, life) {
  this.type = type;
  this.images = images;
  this.height = height;
  this.speed = speed;
  this.distance = 0;
  this.life = life;
  this.maxLife = 5;
  this.shieldTime = 0;
}

_c = Fighter;

Fighter.prototype.setPosition = function (canvasWidth, canvasHeight, spriteTotal) {
  const image = this.images[this.type];
  this.width = image.width / (spriteTotal * image.height) * this.height;
  this.posX = (canvasWidth - this.width) / 2;
  this.posY = (canvasHeight - this.height) / 2;
};

Fighter.prototype.getIsCollision = function (obstacles, shieldTime) {
  this.shieldTime = Math.max(this.shieldTime - 1, 0);

  if (this.shieldTime !== 0) {
    return false;
  }

  for (let i = 0; i < obstacles.length; i++) {
    const points = obstacles[i].gameMap;
    const nearObstacles = points.filter(layout => {
      const {
        posX,
        posY,
        width,
        height
      } = layout;
      const isXCollision = this.posX <= posX && this.posX + this.width >= posX || this.posX <= posX + width && this.posX + this.width >= posX + width;
      const isYCollision = this.posY <= posY && this.posY + this.height >= posY || this.posY <= posY + height && this.posY + this.height >= posY + height;
      return isXCollision && isYCollision;
    });

    if (nearObstacles.length) {
      this.shieldTime = shieldTime;
      return true;
    }
  }

  return false;
};

Fighter.prototype.animate = function (ctx, canvasHeight, volume, isCollision, frame) {
  const blinkPeriod = 10;
  const blinkTime = this.shieldTime % (2 * blinkPeriod);

  if (volume > 3) {
    this.posY -= this.speed;
  } else {
    this.posY += this.speed;
  }

  if (this.posY >= canvasHeight - this.height) {
    this.posY = canvasHeight - this.height;
  }

  if (this.posY <= 0) {
    this.posY = 0;
  }

  if (isCollision) {
    this.life = Math.max(0, this.life - 1);
  }

  if (this.life === 0) {} else {
    this.distance += this.speed;
  } // if (0 < blinkTime && blinkPeriod >= blinkTime) {
  //   return;
  // }


  ctx.drawImage(this.images[this.type], 600 * frame, 0, 600, 380, this.posX, this.posY, this.width, this.height);
};

/* harmony default export */ __webpack_exports__["default"] = (Fighter);

var _c;

__webpack_require__.$Refresh$.register(_c, "Fighter");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/fighterAttack/GameMap.js":
/*!********************************************!*\
  !*** ./src/games/fighterAttack/GameMap.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

function GameMap(type, canvasWidth, canvasHeight, images) {
  this.type = type;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.images = images;
}

_c = GameMap;

GameMap.prototype.generatePoint = function (type, posX, posY, height, image) {
  const width = height * (image.width / image.height);
  let calibratedPosY = width * (image.height / image.width);

  if (type === "onGround") {
    calibratedPosY = this.canvasHeight - height;
  } else if (type === "onCeiling") {
    calibratedPosY = 0;
  } else {
    calibratedPosY = posY;
  }

  return {
    posX: posX,
    posY: calibratedPosY,
    width: width,
    height: height,
    image: image
  };
};

GameMap.prototype.setGameMap = function (type, total, posYMap, heightMap, imageMap) {
  const gap = this.canvasWidth * (1 / (total - 2));
  const posY = this.canvasHeight;
  const images = this.images;
  const height = this.canvasHeight;
  const gameMap = imageMap.map((image, index) => {
    return this.generatePoint(type, (index - 1) * gap, posYMap[index] * posY, heightMap[index] * height, images[imageMap[index]]);
  });
  this.gameMap = gameMap;
}; // GameMap.prototype.setGameMap = function (
//   type,
//   total,
//   posYMap,
//   widthMap,
//   imageMap,
// ) {
//   const gap = this.canvasWidth * (1 / (total - 2));
//   const posY = this.canvasHeight;
//   const images = this.images;
//   const width = this.canvasWidth;
//   const gameMap = imageMap.map((image, index) => {
//     return this.generatePoint(
//       type,
//       (index - 1) * gap,
//       posYMap[index] * posY,
//       widthMap[index] * width,
//       images[imageMap[index]],
//     );
//   });
//   this.gameMap = gameMap;
// };


/* harmony default export */ __webpack_exports__["default"] = (GameMap);

var _c;

__webpack_require__.$Refresh$.register(_c, "GameMap");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/fighterAttack/Obstacle.js":
/*!*********************************************!*\
  !*** ./src/games/fighterAttack/Obstacle.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

function Obstacle(gameMap, speed) {
  this.gameMap = gameMap;
  this.speed = speed;
}

_c = Obstacle;

Obstacle.prototype.animate = function (ctx) {
  this.gameMap.forEach(point => point.posX -= this.speed);
  const firstPoint = this.gameMap[0];
  const secondPoint = this.gameMap[1];
  const lastPoint = this.gameMap[this.gameMap.length - 1];
  const gap = secondPoint.posX - firstPoint.posX;

  if (firstPoint.posX < -gap) {
    firstPoint.posX = lastPoint.posX + gap;
    this.gameMap.push(firstPoint);
    this.gameMap.shift();
  }

  for (let i = 0; i < this.gameMap.length; i++) {
    const {
      posX,
      posY,
      width,
      height,
      image
    } = this.gameMap[i];
    ctx.drawImage(image, posX, posY, width, height);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Obstacle);

var _c;

__webpack_require__.$Refresh$.register(_c, "Obstacle");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/fighterAttack/PlayInfo.js":
/*!*********************************************!*\
  !*** ./src/games/fighterAttack/PlayInfo.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

function PlayInfo() {}

_c = PlayInfo;

PlayInfo.prototype.animate = function (ctx, canvasWidth, canvasHeight, distance, life, maxLife) {
  this.distance += this.groundSpeed;
  const lifeBoxWidth = 0.2 * canvasWidth;
  const lifeBoxHeight = 0.05 * canvasHeight;
  const lifeBoxGap = lifeBoxWidth / maxLife;
  const lifeBoxRightPosX = 0.95 * canvasWidth;
  const lifeBoxPosY = 0.05 * canvasHeight;
  const lifeWidth = lifeBoxGap - 0.01 * canvasWidth;

  for (let i = 0; i < life; i++) {
    ctx.fillStyle = "red";
    ctx.fillRect(lifeBoxRightPosX - lifeBoxGap * i, lifeBoxPosY, lifeWidth, lifeBoxHeight);
  }

  ctx.font = "30px sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText(`${distance} m`, 0.8 * canvasWidth, 0.2 * canvasHeight);

  if (life === 0) {
    ctx.font = "100px sans-serif";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", 0.2 * canvasWidth, 0.5 * canvasHeight);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (PlayInfo);

var _c;

__webpack_require__.$Refresh$.register(_c, "PlayInfo");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/roadRoller/character.js":
/*!*******************************************!*\
  !*** ./src/games/roadRoller/character.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _utils_eventListHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/eventListHelper */ "./src/utils/eventListHelper.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



function Character(eventList) {
  this.eventList = eventList;
  this.x = 40;
  this.characterWidth = 40;
  this.characterHeight = 40;
  this.characterWidthHalf = this.characterWidth / 2;
  this.gravity = 0;
  this.characterMove = {
    left: false,
    right: false,
    jump: false,
    speed: 2,
    isJumping: false,
    jumpHeight: 20
  };
  this.KEY_CODE = {
    A: 65,
    D: 68,
    W: 87
  };
  Object(_utils_eventListHelper__WEBPACK_IMPORTED_MODULE_0__["addEventHelper"])(this.eventList, window, "keydown", this.handleKeyEvent.bind(this));
  Object(_utils_eventListHelper__WEBPACK_IMPORTED_MODULE_0__["addEventHelper"])(this.eventList, window, "keyup", this.handleKeyEvent.bind(this));
}

_c = Character;

Character.prototype.draw = function (ctx, dots) {
  this.characterCenterX = this.x + this.characterWidthHalf;
  this.maxY = dots[this.characterCenterX] - this.characterHeight;

  if (this.y === undefined || this.y >= this.maxY) {
    this.y = this.maxY;
    this.characterMove.isJumping = false;
    this.gravity = 0;
  }

  ctx.fillStyle = "#0095DD";
  ctx.fillRect(this.x, this.y, this.characterWidth, this.characterHeight);
  this.handleCharacterMovement(dots);
};

Character.prototype.handleKeyEvent = function (event) {
  const isKeyDown = event.type === "keydown" ? true : false;

  switch (event.keyCode) {
    case this.KEY_CODE.A:
      this.characterMove.left = isKeyDown;
      break;

    case this.KEY_CODE.D:
      this.characterMove.right = isKeyDown;
      break;

    case this.KEY_CODE.W:
      this.characterMove.jump = isKeyDown;
      break;

    default:
      break;
  }
};

Character.prototype.handleCharacterMovement = function (dots) {
  if (this.characterMove.left) {
    if (dots[this.x - this.characterMove.speed]) {
      this.x -= this.characterMove.speed;
    }
  }

  if (this.characterMove.right) {
    if (dots[this.x + this.characterWidth]) {
      this.x += this.characterMove.speed;
    }
  }

  if (this.characterMove.jump && !this.characterMove.isJumping) {
    this.characterMove.isJumping = true;
    this.gravity -= this.characterMove.jumpHeight;
  }

  if (this.gravity) {
    this.y += Math.floor(this.gravity);
  }

  this.gravity += 1.5;
  this.gravity *= 0.9;
};

/* harmony default export */ __webpack_exports__["default"] = (Character);

var _c;

__webpack_require__.$Refresh$.register(_c, "Character");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/roadRoller/index.js":
/*!***************************************!*\
  !*** ./src/games/roadRoller/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects */ "./src/games/roadRoller/objects.js");
/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./character */ "./src/games/roadRoller/character.js");
/* harmony import */ var _pitchDetectorController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pitchDetectorController */ "./src/games/roadRoller/pitchDetectorController.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);





function Game(ref, {
  pitchDetectorRef
}) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.pitchDetectorRef = pitchDetectorRef;
  this.eventList = [];
  this.pitchDetectorController = new _pitchDetectorController__WEBPACK_IMPORTED_MODULE_2__["default"](this.canvas.width, this.canvas.height, this.pitchDetectorRef);
  this.objects = new _objects__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas.width, this.canvas.height);
  this.character = new _character__WEBPACK_IMPORTED_MODULE_1__["default"](this.eventList);
  this.animate();
}

_c = Game;

Game.prototype.animate = async function () {
  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  const pitchDots = this.pitchDetectorController.handlePitchInteraction(this.ctx, this.character.characterCenterX);
  const dots = this.objects.draw(this.ctx, pitchDots);
  this.character.draw(this.ctx, dots);
};

/* harmony default export */ __webpack_exports__["default"] = (Game);

var _c;

__webpack_require__.$Refresh$.register(_c, "Game");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/roadRoller/objects.js":
/*!*****************************************!*\
  !*** ./src/games/roadRoller/objects.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

function Objects(canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
}

_c = Objects;

Objects.prototype.draw = function (ctx, pitchDots) {
  this.ctx = ctx;
  this.dots = new Array(this.canvasWidth);
  this.ctx.fillStyle = "black";
  this.drawObject(0, this.canvasHeight - 200, 200, 200);
  this.drawObject(this.canvasWidth - 200, this.canvasHeight - 200, 200, 200);
  this.drawObject(140, this.canvasHeight - 210, 40, 10);

  if (pitchDots) {
    for (let i = 0; i < pitchDots.length; i++) {
      this.dots[200 + i] = pitchDots[i];
      this.ctx.beginPath();
      this.ctx.strokeStyle = "red";
      this.ctx.linkWidth = 5;
      this.ctx.moveTo(200 + i - 1, this.dots[200 + i - 1]);
      this.ctx.lineTo(200 + i, this.dots[200 + i]);
      this.ctx.stroke();
    }

    this.ctx.closePath();
  }

  return this.dots;
};

Objects.prototype.drawObject = function (x, y, width, height) {
  this.ctx.fillRect(x, y, width, height);
  this.dots.fill(y, x, x + width);
};

/* harmony default export */ __webpack_exports__["default"] = (Objects);

var _c;

__webpack_require__.$Refresh$.register(_c, "Objects");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/roadRoller/pitchDetectorController.js":
/*!*********************************************************!*\
  !*** ./src/games/roadRoller/pitchDetectorController.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _road__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./road */ "./src/games/roadRoller/road.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



class pitchDetectorController {
  constructor(canvasWidth, canvasHeight, pitchDetectorRef) {
    this.pitchDetectorRef = pitchDetectorRef;
    this.detectorReady = false;
    this.stage = 1;
    this.road = new _road__WEBPACK_IMPORTED_MODULE_0__["default"](canvasWidth, canvasHeight, pitchDetectorRef);
  }

  handlePitchInteraction(ctx, characterCenterX) {
    switch (this.stage) {
      case 1:
        if (characterCenterX >= 140 && characterCenterX <= 180) {
          const roadDots = this.road.draw(ctx, this.detectorReady);
          this.detectorReady = true;
          return roadDots;
        } else {
          this.detectorReady = false;
          return this.road.roadDots;
        }

      default:
        return;
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (pitchDetectorController);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/games/roadRoller/road.js":
/*!**************************************!*\
  !*** ./src/games/roadRoller/road.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

function Road(canvasWidth, canvasHeight, pitchDetectorRef) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.pitchDetectorRef = pitchDetectorRef;
  this.isDrawingRoad = false;
  this.roadDots = [];
  this.roadPoint = {
    radius: 8,
    initialX: 200,
    initialY: this.canvasHeight - 200,
    x: 200,
    y: this.canvasHeight - 200,
    maxX: this.canvasWidth - 200,
    maxY: 50,
    speed: 1
  };
}

_c = Road;

Road.prototype.draw = function (ctx, detectorReady) {
  if (!detectorReady) {
    this.roadPoint.x = this.roadPoint.initialX;
    this.roadPoint.y = this.roadPoint.initialY;
    this.isDrawingRoad = false;
    this.roadDots = [];
  }

  this.drawRoadPoint(ctx);
  this.drawRoad();
  return this.roadDots;
};

Road.prototype.drawRoadPoint = function (ctx) {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(this.roadPoint.x, this.roadPoint.y, this.roadPoint.radius, 0, Math.PI * 2);
  ctx.fill();
};

Road.prototype.drawRoad = async function () {
  const pitch = await this.pitchDetectorRef.current.getPitch();

  if (pitch) {
    this.isDrawingRoad = true;
  }

  if (this.isDrawingRoad && this.roadPoint.x <= this.roadPoint.maxX) {
    this.roadPoint.x += this.roadPoint.speed;
    this.roadPoint.y = this.canvasHeight - pitch - this.roadPoint.maxY;

    for (let i = 0; i < this.roadPoint.speed; i++) {
      this.roadDots.push(this.roadPoint.y);
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Road);

var _c;

__webpack_require__.$Refresh$.register(_c, "Road");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/hooks/useCanvas.js":
/*!********************************!*\
  !*** ./src/hooks/useCanvas.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_eventListHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/eventListHelper */ "./src/utils/eventListHelper.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature();



/**
 *
 * @param {function} CanvasConstructor Canvas constructor function
 * @param {object} options Options of canvas
 * @returns Ref of canvas
 */

const useCanvas = (CanvasConstructor, options) => {
  _s();

  const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const myCanvas = new CanvasConstructor(canvasRef, options);
    return () => {
      window.cancelAnimationFrame(myCanvas.animationFrameId);
      Object(_utils_eventListHelper__WEBPACK_IMPORTED_MODULE_1__["removeEventHelper"])(myCanvas.eventList);
    };
  }, []);
  return canvasRef;
};

_s(useCanvas, "UJgi7ynoup7eqypjnwyX/s32POg=");

/* harmony default export */ __webpack_exports__["default"] = (useCanvas);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/hooks/useErrorMessage.js":
/*!**************************************!*\
  !*** ./src/hooks/useErrorMessage.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature();



const useErrorMessage = (initialValue = "") => {
  _s();

  const [error, setError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialValue);
  const showMessage = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(errMessage => {
    setError(errMessage);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const hideMessage = setTimeout(() => {
      setError("");
    }, 2000);
    return () => clearTimeout(hideMessage);
  }, [error]);
  return [error, showMessage];
};

_s(useErrorMessage, "k+5fRVii94HhJQ7hza/RE25k0iI=");

/* harmony default export */ __webpack_exports__["default"] = (useErrorMessage);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/hooks/useImage.js":
/*!*******************************!*\
  !*** ./src/hooks/useImage.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature();



const loadImages = async url => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.src = url;
  });
};

const useImage = (urls, setImages) => {
  _s();

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    (async () => {
      const images = [];

      for (let i = 0; i < urls.length; i++) {
        const image = await loadImages(urls[i]);
        images.push(image);
      }

      setImages(images);
    })();
  }, [urls, setImages]);
};

_s(useImage, "OD7bBpZva5O2jO+Puf00hKivP7c=");

/* harmony default export */ __webpack_exports__["default"] = (useImage);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/hooks/useMultiPlay.js":
/*!***********************************!*\
  !*** ./src/hooks/useMultiPlay.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

// import { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import { USER_SERVER_API } from "../constants/constants";
// import { v4 as uuidv4 } from "uuid";
// const socket = io(USER_SERVER_API, {
//   withCredential: true,
// });
// const playerIdMock = uuidv4();
// const useMultiPlay = (roomId, playerData) => {
//   useEffect(() => {
//     socket.emit("join-room", {
//       roomId,
//       playerData,
//     });
//     socket.on("input-other-player", (data) => {
//       if (data.playerId !== playerIdMock) {
//         // data: {playerId, value}
//         console.log(data);
//       }
//     });
//     return () => {
//       socket.off("input-other-player");
//       socket.emit("leave-room");
//     };
//   }, []);
// };
// export default useMultiPlay;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/hooks/usePitchDetector.js":
/*!***************************************!*\
  !*** ./src/hooks/usePitchDetector.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ml5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ml5 */ "./node_modules/ml5/dist/ml5.min.js");
/* harmony import */ var ml5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ml5__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature();



/**
 *
 * @param {boolean} isAudioUse state of audio
 * @returns Ref of pitchDetector
 *
 * You can get the pitch value through the method of pitchDetector, getPitch().
 * The getPitch method returns a promise.
 *
 * reference https://ml5js.org/reference/api-PitchDetection/
 */

const usePitchDetector = (isAudioUse, audioContextRef, micStreamRef) => {
  _s();

  const pitchDetectorRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (isAudioUse) {
      (async () => {
        try {
          const pitchDetector = ml5__WEBPACK_IMPORTED_MODULE_1___default.a.pitchDetection("/model/", audioContextRef.current, micStreamRef.current);
          pitchDetectorRef.current = pitchDetector;
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      pitchDetectorRef.current = null;
    }
  }, [isAudioUse, audioContextRef, micStreamRef]);
  return pitchDetectorRef;
};

_s(usePitchDetector, "dG00F0Ergtbn0k68i4nNGAxQ5XM=");

/* harmony default export */ __webpack_exports__["default"] = (usePitchDetector);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/images/fighterAttack/background.png":
/*!*************************************************!*\
  !*** ./src/images/fighterAttack/background.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/background.77be8d70.png");

/***/ }),

/***/ "./src/images/fighterAttack/cyclops.png":
/*!**********************************************!*\
  !*** ./src/images/fighterAttack/cyclops.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/images/fighterAttack/dagger.png":
/*!*********************************************!*\
  !*** ./src/images/fighterAttack/dagger.png ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/images/fighterAttack/dionaea.png":
/*!**********************************************!*\
  !*** ./src/images/fighterAttack/dionaea.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/images/fighterAttack/fence.png":
/*!********************************************!*\
  !*** ./src/images/fighterAttack/fence.png ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/images/fighterAttack/hill.png":
/*!*******************************************!*\
  !*** ./src/images/fighterAttack/hill.png ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/hill.2d390720.png");

/***/ }),

/***/ "./src/images/fighterAttack/house.png":
/*!********************************************!*\
  !*** ./src/images/fighterAttack/house.png ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/house.3df25b7c.png");

/***/ }),

/***/ "./src/images/fighterAttack/leftTree.png":
/*!***********************************************!*\
  !*** ./src/images/fighterAttack/leftTree.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/images/fighterAttack/light.png":
/*!********************************************!*\
  !*** ./src/images/fighterAttack/light.png ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/images/fighterAttack/purpleBat.png":
/*!************************************************!*\
  !*** ./src/images/fighterAttack/purpleBat.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/purpleBat.62aeda7a.png");

/***/ }),

/***/ "./src/images/fighterAttack/rightTree.png":
/*!************************************************!*\
  !*** ./src/images/fighterAttack/rightTree.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/images/fighterAttack/spider.png":
/*!*********************************************!*\
  !*** ./src/images/fighterAttack/spider.png ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/images/fighterAttack/tomb.png":
/*!*******************************************!*\
  !*** ./src/images/fighterAttack/tomb.png ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/tomb.fb1342c9.png");

/***/ }),

/***/ "./src/images/fighterAttack/witch.png":
/*!********************************************!*\
  !*** ./src/images/fighterAttack/witch.png ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var _components_App_App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/App/App */ "./src/components/App/App.jsx");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./reducers */ "./src/reducers/index.js");
/* harmony import */ var _api_firebaseService_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./api/firebaseService.js */ "./src/api/firebaseService.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ssj/VanillaCoding/Project/voice-game/client/src/index.js";












const customHistory = Object(history__WEBPACK_IMPORTED_MODULE_7__["createBrowserHistory"])();
const middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_4__["default"].withExtraArgument({
  history: customHistory
})];

if (true) {
  middleware.push(Object(redux_logger__WEBPACK_IMPORTED_MODULE_6__["createLogger"])());
}

const store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_9__["default"], Object(redux__WEBPACK_IMPORTED_MODULE_2__["applyMiddleware"])(...middleware));
const authService = new _api_firebaseService_js__WEBPACK_IMPORTED_MODULE_10__["default"]();
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["BrowserRouter"], {
  history: customHistory,
  children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store,
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_components_App_App__WEBPACK_IMPORTED_MODULE_8__["default"], {
      authService: authService
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 25,
  columnNumber: 3
}, undefined), document.getElementById("root"));

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/reducers/authReducer.js":
/*!*************************************!*\
  !*** ./src/reducers/authReducer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./src/actions/actionTypes.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const initialState = {
  isAuthorized: false,
  playerData: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  const ACTION_TYPES = Object(_actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["default"])();

  switch (action.type) {
    case ACTION_TYPES.CHECK_AUTHORIZATION:
      return { ...state,
        isAuthorized: false
      };

    case ACTION_TYPES.CHECK_AUTHORIZATION_SUCCESS:
      return { ...state,
        isAuthorized: true,
        playerData: action.payload
      };

    case ACTION_TYPES.CHECK_AUTHORIZATION_FAIL:
      return { ...state,
        isAuthorized: false
      };

    case ACTION_TYPES.PLAYER_LOGIN:
      return { ...state,
        isAuthorized: false
      };

    case ACTION_TYPES.PLAYER_LOGIN_SUCCESS:
      return { ...state,
        isAuthorized: true,
        playerData: action.payload
      };

    case ACTION_TYPES.PLAYER_LOGIN_FAIL:
      return { ...state,
        isAuthorized: false
      };

    case ACTION_TYPES.PLAYER_LOGOUT:
      return { ...state,
        isAuthorized: false,
        playerData: null
      };

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (authReducer);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _authReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authReducer */ "./src/reducers/authReducer.js");
/* harmony import */ var _roomReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roomReducer */ "./src/reducers/roomReducer.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);




const reducer = Object(redux__WEBPACK_IMPORTED_MODULE_2__["combineReducers"])({
  authReducer: _authReducer__WEBPACK_IMPORTED_MODULE_0__["default"],
  roomReducer: _roomReducer__WEBPACK_IMPORTED_MODULE_1__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (reducer);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/reducers/roomReducer.js":
/*!*************************************!*\
  !*** ./src/reducers/roomReducer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./src/actions/actionTypes.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const initialState = {
  roadRoller: [],
  fighterAttack: [],
  energyBattle: [],
  error: null
};

const roomReducer = (state = initialState, action) => {
  const ACTION_TYPES = Object(_actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["default"])();

  const copiedState = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.FETCH_ROOMS_SUCCESS:
      copiedState[action.payload.gameTitle] = action.payload.rooms;
      return copiedState;

    case ACTION_TYPES.CREATE_ROOM_SUCCESS:
      copiedState[action.payload.title].push(action.payload);
      return copiedState;

    case ACTION_TYPES.JOIN_ROOM_SUCCESS:
    case ACTION_TYPES.LEAVE_ROOM_SUCCESS:
    case ACTION_TYPES.DELETE_ROOM_SUCCESS:
    case ACTION_TYPES.CHANGE_ROOM_STATUS_SUCCESS:
      copiedState[action.payload.title] = action.payload.rooms;
      return copiedState;

    case ACTION_TYPES.FETCH_ROOMS_FAIL:
    case ACTION_TYPES.CREATE_ROOM_FAIL:
    case ACTION_TYPES.JOIN_ROOM_FAIL:
    case ACTION_TYPES.LEAVE_ROOM_FAIL:
    case ACTION_TYPES.DELETE_ROOM_FAIL:
    case ACTION_TYPES.CHANGE_ROOM_STATUS_FAIL:
      copiedState.error = action.payload;
      return copiedState;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (roomReducer);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/utils/VolumeMeter.js":
/*!**********************************!*\
  !*** ./src/utils/VolumeMeter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

function VolumeMeter(stream, option) {
  this.volume = 0;
  this.stream = stream;
  this.audioProcessor = this.audioProcessor(stream, option);
}

_c = VolumeMeter;

VolumeMeter.prototype.audioProcessor = function audioProcessor(stream, option) {
  const {
    bufferSize,
    minDecibels,
    maxDecibels,
    timeConstant
  } = option;
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  const processor = context.createScriptProcessor(bufferSize, 1, 1);
  analyser.fftSize = bufferSize / 2;
  analyser.minDecibels = minDecibels;
  analyser.maxDecibels = maxDecibels;
  analyser.smoothingTimeConstant = timeConstant;
  source.connect(analyser);
  analyser.connect(processor);
  processor.connect(context.destination);
  this.analyser = analyser;
  this.processor = processor;
};

VolumeMeter.prototype.getVolume = function getVolume() {
  const data = new Uint8Array(this.analyser.frequencyBinCount);
  this.analyser.getByteFrequencyData(data);
  const average = data.reduce((acc, item) => acc + item) / data.length;
  this.volume = average;
  return this.volume;
};

/* harmony default export */ __webpack_exports__["default"] = (VolumeMeter);

var _c;

__webpack_require__.$Refresh$.register(_c, "VolumeMeter");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/utils/eventListHelper.js":
/*!**************************************!*\
  !*** ./src/utils/eventListHelper.js ***!
  \**************************************/
/*! exports provided: addEventHelper, removeEventHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventHelper", function() { return addEventHelper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEventHelper", function() { return removeEventHelper; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

/**
 *
 * @param {array} eventList List of registered event information.
 * @param {object} eventTarget Target to which the event is registered.
 * @param {string} eventType Event type to be registered.
 * @param {function} callback Functions executed when an event is occured.
 */
const addEventHelper = (eventList, eventTarget, eventType, callback) => {
  eventTarget.addEventListener(eventType, callback, false);
  eventList.push({
    eventTarget,
    eventType,
    callback
  });
};
/**
 *
 * @param {array} eventList Array contains objects containing information about event removal.
 */

const removeEventHelper = eventList => {
  for (const eventInfo of eventList) {
    const {
      eventTarget,
      eventType,
      callback
    } = eventInfo;
    eventTarget.removeEventListener(eventType, callback);
  }
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/utils/getAudioContext.js":
/*!**************************************!*\
  !*** ./src/utils/getAudioContext.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

/**
 *
 * @param {object} option Option for audioContext
 * @returns Created audioContext
 */
const getAudioContext = option => {
  return new (window.AudioContext || window.webkitAudioContext)(option);
};

/* harmony default export */ __webpack_exports__["default"] = (getAudioContext);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/utils/getMedia.js":
/*!*******************************!*\
  !*** ./src/utils/getMedia.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

/**
 *
 * @param {object} constraints Required media options to use
 * @returns mideaStream
 */
const getMedia = async constraints => {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.error(err);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (getMedia);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/utils/pickRandomRoom.js":
/*!*************************************!*\
  !*** ./src/utils/pickRandomRoom.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const pickRandomRoom = roomList => {
  const enterable = roomList.filter(room => room.status === "Enter");
  const random = Math.floor(Math.random() * enterable.length + enterable.length);
  const picked = enterable[random];
  return !picked ? enterable[0] : picked;
};

/* harmony default export */ __webpack_exports__["default"] = (pickRandomRoom);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/utils/wait.js":
/*!***************************!*\
  !*** ./src/utils/wait.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const wait = delay => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (wait);

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ 1:
/*!**********************************************************************************************************************************************************************************************!*\
  !*** multi (webpack)/hot/dev-server.js ./node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/ssj/VanillaCoding/Project/voice-game/client/node_modules/webpack/hot/dev-server.js */"./node_modules/webpack/hot/dev-server.js");
__webpack_require__(/*! /Users/ssj/VanillaCoding/Project/voice-game/client/node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js */"./node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js");
__webpack_require__(/*! /Users/ssj/VanillaCoding/Project/voice-game/client/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /Users/ssj/VanillaCoding/Project/voice-game/client/src/index.js */"./src/index.js");


/***/ })

},[[1,"runtime-main","vendors~main"]]]);
//# sourceMappingURL=main.chunk.js.map