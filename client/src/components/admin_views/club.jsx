
import React from "react";
import "../user_views/styles/table.css";

class AdminPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: [],userfk_id:[], userFields: [], dataEntered: [] };
  }

  callAPI() {
    fetch("http://localhost:8000/admin_player")
      .then((res) => res.json())
      .then((json) =>
        this.setState({ userData: json[0],userfk_id:json[1], userFields: Object.keys(json[0][0]) })
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
    console.log(this.state.userData)
    fetch("http://localhost:8000/admin_player/data", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.dataEntered),
    });
  };

  render() {
    return (
      <div className="admin_player">
        <form onSubmit={this.handleSubmit} style = {{margin : "2% 10%"}}>
        <h2 styel = {{color:"#74767B"}}>Insert new row</h2>
          <div className="col" >
            <div className="row">
              {this.state.userFields.map((field) =>
                field.includes("fk_ID") ? (
                  < div className="form-group">
                  <label  className="d-inline-block" for = {field}>{field}</label>
                  <select  class="form-control form-control-sm d-inline-block"  id = {field}name = {field} onChange={this.handleChange}>
                    {this.state.userfk_id.map((data) => (
                      <option value={data["fk_ID"]}>{data["fk_ID"]}</option>
                    ))}{field}
                  </select>
                  </div>
                  
                  
                ):(field.includes('fk'))?
                < div className="form-group">
                <label  className="d-inline-block" for = {field}>{field}</label>
                <select  class="form-control form-control-sm d-inline-block"  id = {field}name = {field} onChange={this.handleChange}>
                  {this.state.userData.map((data) => (
                    <option value={data[field]}>{data[field]}</option>
                  ))}
                </select>
                </div>
                 : (!(field.includes("id") || field.includes("ID")))?(
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

export default AdminPlayer;
