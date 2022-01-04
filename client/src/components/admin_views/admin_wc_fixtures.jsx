
import React from "react";
import WCFixtures from "../user_views/wc_fixtures";

class AdminWCFixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: [], userFields: [], dataEntered: [] };
  }

  callAPI() {
    fetch("http://localhost:8000/wc_fixtures")
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
    fetch("http://localhost:8000/wc_fixtures/data", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.dataEntered),
    });
  };

  render() {
    return (
      <div className="admin_wc_fixtures">
        <h2>Insert new row</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              {this.state.userFields.map((field) =>
                field.includes("fk") ? (
                  <select name = {field} onChange={this.handleChange}>
                    {this.state.userData.map((data) => (
                      <option value={data[field]}>{data[field]}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="form-control"
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field}
                    onChange={this.handleChange}
                  ></input>
                )
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
        <WCFixtures></WCFixtures>
      </div>
    );
  }
}

export default AdminWCFixtures;
