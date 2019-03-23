const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const playlistItemSchema = new mongoose.Schema({
  playlistItemID: String,
  link: String,
  clicked: {
    type: [userSchema]
  },
  meta: Object
});

const playlistSchema = new mongoose.Schema(
  {
    playlistID: {
      type: String,
      required: true
    },
    items: {
      type: [playlistItemSchema]
    }
  },
  { collection: "playlists" }
);
const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = {
  Models: { Playlist },
  playlistItemSchema
};
