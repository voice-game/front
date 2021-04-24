import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAuthorization } from "../../actions/actionCreators";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import GameList from "../GameList/GameList";
import GameRoomList from "../GameRoomList/GameRoomList";
import RoadRoller from "../RoadRoller/RoadRoller";
import MonsterEscape from "../MonsterEscape/MonsterEscape";
import ErrorPage from "../ErrorPage/ErrorPage";
import GameRoom from "../GameRoom/GameRoom";

const App = ({ authService }) => {
  const { isAuthorized } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthorization());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {!isAuthorized ? (
          <Login authService={authService} />
        ) : (
          <>
            <Route exact path="/">
              <GameList />
            </Route>

            <Route exact path="/games">
              <GameList />
            </Route>

            <Route path="/games/roadRoller">
              <RoadRoller />
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
