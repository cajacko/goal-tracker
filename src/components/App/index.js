// @flow

import React, { Component } from "react";
import database from "../../modules/Database";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { days: {}, state: "REQUESTED" };
  }

  componentDidMount() {
    database
      .getDays()
      .then(days => this.setState({ days, state: "SUCCEEDED" }))
      .catch(e =>
        this.setState({
          state: "FAILED",
          message: (e && e.message) || "Undefined error"
        })
      );
  }

  render() {
    if (this.state.state === "REQUESTED") return <p>Loading</p>;
    if (this.state.state === "FAILED")
      return <p>Error: {this.state.message}</p>;

    return <div>Content</div>;
  }
}

export default App;
