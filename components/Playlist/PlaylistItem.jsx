import React, { Component } from "react";
import request from "../request";

class PlaylistItem extends Component {
  state = {};
  render() {
    const { image, title, description } = this.props.meta;
    return (
      <div>
        <a target="_blank" href={this.props.link} onClick={this.onClickItem}>
          <article className="media has-text-black">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={image} style={{ objectFit: "cover", width: "64px", height: "64px" }} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <div>
                  <strong>{description.length < 60 ? description : title}</strong>
                  <p>
                    <small>{this.props.clicked.map(item => item.username + " ")}</small>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </a>
        <br />
      </div>
    );
  }

  onClickItem = () => {
    request.callClickedOnItem(this.props.playlistID, this.props.playlistItemID);
    this.props.onUpdate();
  };
}

export default PlaylistItem;
