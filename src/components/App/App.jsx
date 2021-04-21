import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAuthorization } from "../../actions/actionCreators";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import GameList from "../GameList/GameList";
import GameRoomList from "../GameRoomList/GameRoomList";
import RoadRoller from "../RoadRoller/RoadRoller";
import FighterAttack from "../FighterAttack/FighterAttack";
import EnergyBattle from "../EnergyBattle/EnergyBattle";
import ErrorPage from "../ErrorPage/ErrorPage";

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

            <Route exact path="/games/fighterAttack">
              <GameRoomList />
            </Route>

            <Route path="/games/fighterAttack/:roomId">
              <FighterAttack />
            </Route>

            <Route exact path="/games/energyBattle">
              <GameRoomList />
            </Route>

            <Route path="/games/energyBattle/:roomId">
              <EnergyBattle />
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
