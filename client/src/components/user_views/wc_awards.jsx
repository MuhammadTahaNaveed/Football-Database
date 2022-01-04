import "./styles/table.css";
import React from "react";


class WCAwards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: [], userFields: [] };
  }

  callAPI() {
    fetch("http://localhost:8000/wc_awards")
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
      <div className='wc_awards'>
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

export default WCAwards;
