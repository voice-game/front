import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import GameList from "./components/GameList/GameList";
import GameRoomList from "../GameRoomList/GameRoomList";
import RoadRoller from "../RoadRoller/RoadRoller";
import FlappyBird from "../FlappyBird/FlappyBird";
import EnergyBattle from "../EnergyBattle/EnergyBattle";
import ErrorPage from "../ErrorPage/ErrorPage";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAuthorized(false);
  }, []);

  return (
    <Router>
      <Switch>
        {!isAuthorized ? (
          <Login />
        ) : (
          <>
            <Route exact path="/">
              <GameList />
            </Route>

            <Route path="/games">
              <GameList />
            </Route>

            <Route path="/games/road-roller">
              <RoadRoller />
            </Route>

            <Route path="/games/flappy-bird">
              <FlappyBird />
            </Route>

            <Route path="/games/energy-battle">
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
