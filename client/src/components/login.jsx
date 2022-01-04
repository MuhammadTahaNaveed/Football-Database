
import React from "react";
import eventbus from "../helper/eventbus";
import { useNavigate } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      dataEntered: [],
      error: "",
    };
  }

  callAPI() {
    fetch("http://localhost:8000/login")
      .then((res) => res.json())
      .then((json) => this.setState({ userData: json }));
  }
  handleChange = (event) => {
    const fieldname = event.target.name;
    const fieldvalue = event.target.value;
    const obj = { ...this.state.dataEntered };
    obj[fieldname] = fieldvalue;
    this.setState({ dataEntered: obj });
    console.log(this.state.dataEntered);
  };

  componentWillMount() {
    this.callAPI();
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let { username, password } = this.state.userData[0];
    if (
      this.state.dataEntered.username == username &&
      this.state.dataEntered.password == password
    ) 
    {
      eventbus.dispatch("admin" , {message : "superadmin"})
      this.props.navigate('/city')
    }else 
    {
      let obj = {};
      for (let index = 1; index < this.state.userData.length; index++) 
      {
        obj = this.state.userData[index];
        if (this.state.dataEntered.username == obj.username && this.state.dataEntered.password == obj.password)
        {
          eventbus.dispatch("admin" , {message : "moderator"})
          this.props.navigate('/city')
        }
      }
    }
  };

  render() {
    return (
      <div className="login" style={{margin : "10% 20%" }}>
            <form onSubmit={this.handleSubmit }>
              <h2 style = {{textAlign : "Center"}}>Login</h2>
              <div className="row">
                <div className="col">
                  <input
                    type="username"
                    name="username"
                    className="form-control"
                    placeholder="username"
                    key="username"
                    onChange={this.handleChange}
                  ></input>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="password"
                    key="password"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-secondary btn-sml m-2"
                value="submit"
                style = {{margin: "0% 20%"}}
              >
                Login
              </button>
            </form>
        </div>
    );
  }
}

export default function(props) {
  const navigate = useNavigate();

  return <Login {...props} navigate={navigate} />;
};
