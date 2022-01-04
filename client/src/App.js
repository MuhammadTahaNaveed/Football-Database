import "./App.css";
import React from "react";
import Navigation from "./components/Navigation_Routes/navigation";
import Main from "./components/Navigation_Routes/main";


class App extends React.Component {

  render() {

    return (
      <div className = "App">
        <Navigation />
        <Main />
        </div>
    );
  }
}

export default App;
