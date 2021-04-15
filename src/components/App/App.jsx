import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import GameList from "../GameList/GameList";
import GameRoomList from "../GameRoomList/GameRoomList";
import RoadRoller from "../RoadRoller/RoadRoller";
import FighterAttack from "../FighterAttack/FighterAttack";
import EnergyBattle from "../EnergyBattle/EnergyBattle";
import ErrorPage from "../ErrorPage/ErrorPage";

const App = ({ authService }) => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  console.log(isLoggedIn);

  return (
    <Router>
      <Switch>
        {!isLoggedIn ? (
          <Login authService={authService} />
        ) : (
          <>
            <Route exact path="/">
              <GameList />
            </Route>

            <Route exact path="/games">
              <GameList />
            </Route>

            <Route path="/games/road-roller">
              <RoadRoller />
            </Route>

            <Route path="/games/fighter-attack">
              <FighterAttack />
            </Route>

            <Route exact path="/games/energy-battle">
              <GameRoomList />
            </Route>

            <Route path="/games/energy-battle/:roomId">
              <EnergyBattle />
            </Route>

            <Route path="/logout">
              <Logout />
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
