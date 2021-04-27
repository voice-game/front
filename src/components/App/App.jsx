import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import GameList from "../GameList/GameList";
import GameRoomList from "../GameRoomList/GameRoomList";
import GameRoom from "../GameRoom/GameRoom";
import ErrorPage from "../ErrorPage/ErrorPage";
import useImages from "../../hooks/useImages";

import { checkAuthorization } from "../../actions/actionCreators";

import energyBattleImages from "../../games/energyBattle/energyBattleImages";
import monsterEscapeImages from "../../games/MonsterEscape/monsterEscapeImages";
import roadRollerImages from "../../games/roadRoller/roadRollerImages";

const App = ({ authService }) => {
  const { isAuthorized, isUnAuthMode } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUnAuthMode) {
      dispatch(checkAuthorization());
    }
  }, [dispatch, isUnAuthMode]);

  useImages("energyBattle", energyBattleImages);
  useImages("monsterEscape", monsterEscapeImages);
  useImages("roadRoller", roadRollerImages);

  return (
    <Router>
      <Switch>
        {!isUnAuthMode && !isAuthorized ? (
          <Login authService={authService} />
        ) : (
          <>
            <Route exact path="/">
              <GameList />
            </Route>

            <Route exact path="/games">
              <GameList />
            </Route>

            <Route exact path="/games/roadRoller">
              <GameRoomList />
            </Route>

            <Route path="/games/roadRoller/:roomId">
              <GameRoom />
            </Route>

            <Route exact path="/games/monsterEscape">
              <GameRoomList />
            </Route>

            <Route path="/games/monsterEscape/:roomId">
              <GameRoom />
            </Route>

            <Route exact path="/games/energyBattle">
              <GameRoomList />
            </Route>

            <Route path="/games/energyBattle/:roomId">
              <GameRoom />
            </Route>

            <Route path="/logout">
              <Logout authService={authService} />
            </Route>

            <Route path="/error">
              <ErrorPage />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
