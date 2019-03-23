import React, { Component } from "react";
import request from "../request";
import Router from "next/router";

class PlaylistEntry extends Component {
  state = {
    text: ""
  };
  render() {
    return (
      <div>
        <article className="media">
          <div className="media-content">
            <div className="field">
              <p className="control">
                <input className="input" placeholder="Add your url..." onChange={e => this.setState({ text: e.target.value })} />
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="level-item">
              <a className="button is-info" onClick={this.onSubmit}>
                Senden
              </a>
            </div>
          </div>
        </article>
        <br />
      </div>
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
    this.props.onUpdate();
  };
}

export default PlaylistEntry;
