import React from "react";
import Group from "../components/Create/Group";

class Index extends React.Component {
  state = {};
  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <div style={{ height: "25%" }} />
        <div className="columns">
          <div className="column is-one-quarter" />
          <div className="column">
            <Group />
          </div>
          <div className="column is-one-quarter" />
        </div>
      </div>
    );
  }
}

export default Index;
