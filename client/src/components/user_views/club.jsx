import "./styles/table.css";
import React from "react";


class Club extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: [], userFields: [] };
  }

  callAPI() {
    fetch("http://localhost:8000/club")
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

    fetch("http://localhost:8000/club/query", {
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
      <div className='club'>
        <table >
          <thead>
            <tr>
              {this.state.userFields.map((field) =>((!field.includes('id')))?
                <th key = {field} > {field}</th>
                :<></>
              )}
            </tr>
          </thead>
          <tbody>
          {this.state.userData.map((obj)=>(
            <tr>
                { this.state.userFields.map((field) => ((!field.includes('id')))?
                <td key = {field} onClick = {(event)=>this.handleSubmit(obj)}>{obj[field]}</td>
                :<></>)}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Club;
