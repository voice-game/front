import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import GameList from "../GameList/GameList";
import GameRoomList from "../GameRoomList/GameRoomList";
import GameRoom from "../GameRoom/GameRoom";
import ErrorPage from "../ErrorPage/ErrorPage";
import useImageLoad from "../../hooks/useImageLoad";

import { checkAuthorization } from "../../actions/authActionCreators";

import energyBattleImages from "../../games/images/energyBattle/energyBattleImages";
import monsterEscapeImages from "../../games/images/monsterEscape/monsterEscapeImages";
import littleForestImages from "../../games/images/littleForest/littleForestImages";

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

  useImageLoad("energyBattle", energyBattleImages);
  useImageLoad("monsterEscape", monsterEscapeImages);
  useImageLoad("littleForest", littleForestImages);

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

            <Route exact path="/games/littleForest">
              <GameRoomList />
            </Route>

            <Route path="/games/littleForest/:roomId">
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
