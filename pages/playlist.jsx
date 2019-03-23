import React from "react";
import Playlist from "../components/Playlist/Playlist";
import Router from "next/router";

class Index extends React.Component {
  static async getInitialProps({ query, req, res }) {
    if (!res && !query.playlistID) {
      const { link } = Router.query;
      const res = await request.callGetPlaylist(link);
      query = { ...res.data };
    }
    return query;
  }
  state = {};
  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <div style={{ height: "50px" }} />
        <div className="columns">
          <div className="column is-one-quarter" />
          <div className="column">
            <Playlist playlist={this.props} />
          </div>
          <div className="column is-one-quarter" />
        </div>
      </div>
    );
  }
}

export default Index;
