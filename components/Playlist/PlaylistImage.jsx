import React, { Component } from "react";

class PlaylistImage extends Component {
  state = {};
  render() {
    return (
      <div style={{ width: "128px", height: "128px", margin: "0 auto", marginBottom: "25px" }}>
        <figure className="image is-128x128">
          <img className="is-rounded" src="../static/equalizer.png" />
        </figure>
      </div>
    );
  }
}

export default PlaylistImage;
