import React, { Component } from "react";
import Router from "next/router";
import request from "../request";

class Username extends Component {
  state = {};
  render() {
    return (
      <div className="box has-text-centered">
        <div className="title">Choose A Username First</div>
        <div className="columns">
          <div className="column">
            <input className="input is-fullwidth" type="text" placeholder="Your username" onChange={e => this.setState({ text: e.target.value })} />
          </div>
          <div className="column is-one-third">
            <a className="button is-fullwidth is-info" onClick={this.onSubmit}>
              Accept
            </a>
          </div>
        </div>
      </div>
    );
  }
  onSubmit = async () => {
    let { text } = this.state;
    if (text) {
      const res = await request.callSetUsername({ username: text });
      if (res.data.success) {
        Router.push(Router.query.originalUrl);
      }
    }
  };
}

export default Username;
