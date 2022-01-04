
import {  Route, Routes } from 'react-router-dom';
import React from "react";

import Club from "../user_views/club";
import Fixtures from "../user_views/fixtures";
import Standings from "../user_views/standings";
import WCAwards from "../user_views/wc_awards";
import LeagueAwards from "../user_views/league_awards";
import League from "../user_views/league";

import AdminWCFixtures from "../admin_views/admin_wc_fixtures";
import AdminLeagueFixtures from "../admin_views/admin_league_fixtures";
import AdminPlayer from "../admin_views/admin_player";
import AdminPerson from "../admin_views/admin_person";
import Log from "../admin_views/log";

import Login from"../login";
import AddModerator from "../addModerator";
import eventBus from "../../helper/eventbus";

class Main extends React.Component {
      state = { admin: "user" };
      componentDidMount() {
            eventBus.on("admin", (data) => this.setState({ admin: data.message }));
          }
        
          componentWillUnmount() {
            eventBus.remove("admin");
          }
      render() 
      {
            return (
                  <Routes>
                        {this.state.admin == "superadmin" ?
                        <>
                        <Route exact path = '/addmoderator' element = {<AddModerator/>}></Route>
                        <Route exact path ='/admin/league_fixtures' element = {<AdminPerson/>}></Route>
                        <Route exact path = "/admin/players" element = {<AdminPlayer/>}></Route>
                        <Route exact path = "/admin/persons" element = {<AdminPerson/>}></Route>
                        <Route exact path = "/admin/log" element = {<Log/>}></Route>
                        <Route exact path = "/admin/teams" element = {<AdminPlayer/>}></Route>
                        <Route exact path = "/admin/clubs" element = {<AdminPerson/>}></Route>
                        </>
                        : this.state.admin == "moderator" ?
                        <>
                        <Route exact path ='/admin/wc_fixtures' element = {<AdminPlayer/>}></Route>
                        <Route exact path ='/admin/league_fixtures' element = {<AdminPerson/>}></Route>
                        <Route exact path = "/admin/players" element = {<AdminPlayer/>}></Route>
                        <Route exact path = "/admin/persons" element = {<AdminPerson/>}></Route>
                        <Route exact path = "/admin/log" element = {<Log/>}></Route>
                        <Route exact path = "/admin/teams" element = {<AdminPlayer/>}></Route>
                        <Route exact path = "/admin/clubs" element = {<AdminPerson/>}></Route>
                        </>
                        :
                        <>
                        <Route exact path='/' ></Route>
                        <Route exaxt path='/club' element={<Club />}></Route>
                        <Route exact path='/league' element={<League />}></Route>
                        <Route exact path='/fixtures' element={<Fixtures />}></Route>
                        <Route exact path='/standings' element={<Standings/>}></Route>
                        <Route exact path='/wc_awards' element={<WCAwards/>}></Route>
                        <Route exact path='/league_awards' element={<LeagueAwards/>}></Route>
                        <Route exact path = '/login' element = {<Login/>}></Route>
                        </>

                        }
                  </Routes>
            );
      }
}

export default Main;
