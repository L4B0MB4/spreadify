import React, { Component } from "react";
import request from "../request";
import Router from "next/router";

class PlaylistEntry extends Component {
  state = {
    text: ""
  };
  render() {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea className="textarea" placeholder="Add a comment..." onChange={e => this.setState({ text: e.target.value })} />
            </p>
          </div>
          <nav className="level">
            <div className="level-right">
              <div className="level-item">
                <a className="button is-info" onClick={this.onSubmit}>
                  Submit
                </a>
              </div>
            </div>
          </nav>
        </div>
      </article>
    );
  }

  onSubmit = async () => {
    let { text } = this.state;
    const { playlistID } = Router.query;
    if (text && text.length > 3 && text.includes("http")) {
      text = text.substring(text.indexOf("http"));
      if (text.indexOf(" ") >= 0) {
        text = text.substring(0, text.indexOf(" "));
      }
      if (text.length > 5) {
        const data = {
          link: text
        };
        const res = await request.callAddPlaylistItem(playlistID, data);
        console.log(res);
      }
    }
  };
}

export default PlaylistEntry;
