import React, { Component } from "react";

class PlaylistItem extends Component {
  state = {};
  render() {
    const { image, title } = this.props.meta;
    return (
      <a href={this.props.link}>
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={image} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{title}</strong>
              </p>
            </div>
          </div>
        </article>
      </a>
    );
  }
}

export default PlaylistItem;
