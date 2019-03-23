import React, { Component } from "react";
import request from "../request";
import Router from "next/router";

class Group extends Component {
  state = {};
  render() {
    return (
      <div className="box">
        <div className="columns">
          <div className="column is-one-quater" />
          <div className="column">
            <div className="button is-large is-fullwidth is-rounded is-danger" onClick={this.createLink}>
              Create a link{" "}
            </div>
          </div>
          <div className="column is-one-quater" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="columns">
          <div className="column">
            <input className="input is-fullwidth" type="text" placeholder="Your url" />
          </div>
          <div className="column is-one-third">
            <div className="button is-fullwidth is-info">Join a playlist</div>
          </div>
        </div>
      </div>
    );
  }

  createLink = async () => {
    const res = await request.callGetLink();
    if (res.data.playlistID) {
      Router.push("/playlist/" + res.data.playlistID);
    }
  };
}

export default Group;
