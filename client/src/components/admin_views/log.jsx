
import React from "react";
import "../user_views/styles/table.css";

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: [], userFields: [] };
  }

  callAPI() {
    fetch("http://localhost:8000/log")
      .then((res) => res.json())
      .then((json) =>
        this.setState({ userData: json, userFields: Object.keys(json[0]) })
      );
  }


  componentWillMount() {
    this.callAPI();
  }


  render() {
    return (
      <div className="log">
        <table >
          <thead>
            <tr>
              {this.state.userFields.map((field) =>(
              <th key = {field}> {field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {this.state.userData.map((obj)=>(
            <tr>
                { this.state.userFields.map((field) => (
                <td key = {field}>{obj[field]}</td>
                ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Log;
