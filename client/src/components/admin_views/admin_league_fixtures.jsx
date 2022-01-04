import React from "react";

class AdminLeagueFixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: [], userFields: [], dataEntered: [] };
  }

  callAPI() {
    fetch("http://localhost:8000/league_fixtures")
      .then((res) => res.json())
      .then((json) =>
        this.setState({ userData: json, userFields: Object.keys(json[0]) })
      );
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
    fetch("http://localhost:8000/league_fixtures/data", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.dataEntered),
    });
  };

  render() {
    return (
      <div className="admin_league_fixtures">
        <form onSubmit={this.handleSubmit} style = {{margin : "2% 10%"}}>
        <h2 styel = {{color:"#74767B"}}>Insert new row</h2>
          <div className="col" >
            <div className="row">
              {this.state.userFields.map((field) =>
                field.includes("fk") ? (
                  < div className="form-group">
                  <label  className="d-inline-block" for = {field}>{field}</label>
                  <select  class="form-control form-control-sm d-inline-block"  id = {field}name = {field} onChange={this.handleChange}>
                    {this.state.userData.map((data) => (
                      <option value={data[field]}>{data[field]}</option>
                    ))}{field}
                  </select>
                  </div>
                ) : (!field.includes("id"))?(
                  <input
                    className="form-control"
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field}
                    onChange={this.handleChange}
                  ></input>
                ):<></>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-secondary btn-sml m-2"
            value="submit"
          >
            Insert
          </button>
          </form>


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

export default AdminLeagueFixtures;
