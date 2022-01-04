import logo from "../../images/logo.png";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "../../helper/NavbarElements";
import React from "react";
import eventBus from "../../helper/eventbus";

class Navigation extends React.Component {
  state = { admin: "user" };
  componentDidMount() {
    eventBus.on("admin", (data) => this.setState({ admin: data.message }));
  }

  componentWillUnmount() {
    eventBus.remove("admin");
  }
  render() {
    return (
      <Nav>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>

        {(this.state.admin == "superadmin") ?
          //superadmin
          <NavMenu>
            <NavLink to="/admin/players" activestyle>Players</NavLink>
            <NavLink to="/admin/persons" activestyle>Persons</NavLink>
            <NavLink to="/admin/teams" activestyle>Teams</NavLink>
            <NavLink to="/admin/clubs" activestyle>Clubs</NavLink>
            <NavLink to="/admin/league_fixtures" activestyle>Leagues</NavLink>
            <NavLink to="/admin/log" activestyle>Log</NavLink>
            <NavBtn><NavBtnLink to="/logout"
                                onClick={(e) => {
                                                  this.setState({ admin: "user" });
                                                  eventBus.dispatch("admin" , {message : "user"})
                                                }
                                        }
              >Logout</NavBtnLink>
            </NavBtn>

            <NavBtn><NavBtnLink to="/addmoderator">Add Moderator</NavBtnLink></NavBtn>
          </NavMenu>
    
          : this.state.admin == "moderator" ? 
          //moderator
          <NavMenu>

            <NavLink to="/admin/players" activestyle>Players</NavLink>
            <NavLink to="/admin/persons" activestyle>Persons</NavLink>
            <NavLink to="/admin/teams" activestyle>Teams</NavLink>
            <NavLink to="/admin/clubs" activestyle>Clubs</NavLink>
            <NavLink to="/admin/league_fixtures" activestyle>Leagues</NavLink>     

            <NavBtn><NavBtnLink to="/logout"
                                  onClick={(e) => {
                                                    this.setState({ admin: "user" });
                                                    eventBus.dispatch("admin" , {message : "user"})
                                                  }
                                          }
                >Logout</NavBtnLink>
            </NavBtn>

          </NavMenu>
          :    
          //user
          <NavMenu>

            <NavLink to="/club" activestyle>Clubs</NavLink>
            <NavLink to="/league" activestyle>Leagues</NavLink>
            <NavLink to="/fixtures" activestyle>Fixtures</NavLink>
            <NavLink to="/standings" activestyle>Standings</NavLink>
            <NavLink to="/wc_awards" activestyle>World Cup Awards</NavLink>
            <NavLink to="/league_awards" activestyle>League Awards</NavLink>

            <NavBtn>
              <NavBtnLink to="/login">Login</NavBtnLink>
            </NavBtn>

          </NavMenu>
        }
      </Nav>
    );
  }
}

export default Navigation;
