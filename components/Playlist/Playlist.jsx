import React, { Component } from "react";
import PlaylistImage from "./PlaylistImage";
import PlaylistEntry from "../Create/PlaylistEntry";
import PlaylistItem from "./PlaylistItem";
import fetch from "isomorphic-unfetch";

class Playlist extends Component {
  state = {};
  render() {
    const { playlist } = this.props;
    console.log(playlist);
    return (
      <div className="box">
        <PlaylistImage />
        <PlaylistEntry />
        Playlist
        {playlist.items && playlist.items.map(item => <PlaylistItem {...item} key={item.playlistItemID} />)}
      </div>
    );
  }
}

export default Playlist;
