import React, { Component } from "react";
import PlaylistImage from "./PlaylistImage";
import PlaylistEntry from "../Create/PlaylistEntry";
import PlaylistItem from "./PlaylistItem";
import request from "../request";
import Router from "next/router";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    const { playlist } = this.state;
    return (
      <div className="box">
        <PlaylistImage />
        <PlaylistEntry onUpdate={this.updatePlaylist} />
        <div style={{ height: "calc(100vh - 370px)", overflowY: "scroll" }}>
          {playlist.items && playlist.items.map(item => <PlaylistItem {...item} key={item.playlistItemID} playlistID={playlist.playlistID} onUpdate={this.updatePlaylist} />)}
        </div>
      </div>
    );
  }

  updatePlaylist = async () => {
    const { playlistID } = Router.query;
    const res = await request.callGetPlaylist(playlistID);
    this.setState({ playlist: res.data });
  };
}

export default Playlist;
