
import React from "react";
import eventbus from "../helper/eventbus";
import { useNavigate } from 'react-router-dom';

class AddModerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      dataEntered: [],
    };
  }

  handleChange = (event) => {
    const fieldname = event.target.name;
    const fieldvalue = event.target.value;
    const obj = { ...this.state.dataEntered };
    obj[fieldname] = fieldvalue;
    this.setState({ dataEntered: obj });
    console.log(this.state.dataEntered);
  };

      handleSubmit=(event)=>
      {
            fetch(('http://localhost:8000/addModerator'), {
            method: 'POST', 
            mode:"cors",
            headers: {'Content-Type': 'application/json'},
            body: (JSON.stringify(this.state.dataEntered))
            });
            this.props.navigate('/admin/admin_wc_fixtures')
      }

  render() {
    return (
      <div className="addModerator">
            <form onSubmit={this.handleSubmit }>
              <h2>Add Moderator</h2>
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
              >
                Add
              </button>
            </form>
        </div>
    );
  }
}

export default function(props) {
  const navigate = useNavigate();

  return <AddModerator {...props} navigate={navigate} />;
};
