import React, { Component } from "react";
import request from "../request";
import Router from "next/router";

class Group extends Component {
  state = { text: "" };
  render() {
    return (
      <div className="box">
        <br />
        <div className="columns">
          <div className="column is-one-quater" />
          <div className="column">
            <div className="button is-large is-fullwidth is-rounded is-danger" onClick={this.createLink}>
              Create a link
            </div>
          </div>
          <div className="column is-one-quater" />
        </div>
        <br />
        <hr className="hr-styled" />
        <br />
        <br />
        <div className="columns">
          <div className="column">
            <input className="input is-fullwidth" type="text" placeholder="Your url" onChange={e => this.setState({ text: e.target.value })} />
          </div>
          <div className="column is-one-third">
            <a className="button is-fullwidth is-info" onClick={this.openLink}>
              Join a playlist
            </a>
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

  openLink = async () => {
    let link = this.state.text + "";
    link = link.substring(link.indexOf("/playlist/") + 10);
    console.log(link);
    Router.push("/playlist/" + link);
  };
}

export default Group;
