import "./styles/table.css";
import React from "react";


class Fixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: [], userFields: [] };
  }

  callAPI() {
    fetch("http://localhost:8000/tournaments")
      .then((res) => res.json())
      .then((json) =>
        this.setState({ userData: json, userFields: Object.keys(json[0]) })
      );
  }

  componentWillMount() {
    this.callAPI();
  }
  handleSubmit = (obj) => {
    console.log(obj);

    fetch("http://localhost:8000/fixtures/query", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    }).then((res) => res.json())
    .then((json) =>
        this.setState({ userData: json, userFields: Object.keys(json[0]) })
      );
  };
  render() {
    return (
      <div className='fixtures'>
        <table >
          <thead>
            <tr>
              {this.state.userFields.map((field) =>
                <th key = {field} > {field}</th>
              )}
            </tr>
          </thead>
          <tbody>
          {this.state.userData.map((obj)=>(
            <tr>
                { this.state.userFields.map((field) => 
                <td key = {field} onClick = {(event)=>this.handleSubmit(obj)}>{obj[field]}</td>)}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Fixtures;
