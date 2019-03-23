import React from "react";
import Group from "../components/Create/Group";
import Username from "../components/Create/Username";

class Index extends React.Component {
  static async getInitialProps({ query, req, res }) {
    console.log(query);
    return query;
  }

  state = {};
  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <div style={{ height: "25%" }} />

        <div className="columns">
          <div className="column is-one-quarter" />
          <div className="column">{this.props.missingUser ? <Username /> : <Group />}</div>
          <div className="column is-one-quarter" />
        </div>
      </div>
    );
  }
}

export default Index;
