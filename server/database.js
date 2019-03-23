const mongoose = require("mongoose");
const DATABASE = "spreadify";
const Schemas = require("./schemas");
var url = process.env.MONGODB || "mongodb://localhost:27017";
connectMongoDB = () => {
  return new Promise(function(res, rej) {
    mongoose.connect(url + "/" + DATABASE, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", error => {
      console.error("connection error:", error);
      rej(error);
    });
    db.once("open", function() {
      res(db);
    });
  });
};

insert = async (data, schema) => {
  const Model = Schemas.Models[schema];
  const dataObject = new Model(data);
  await dataObject.save();
};

insertOrUpdateByPlaylistID = async (data, schema) => {
  const Model = Schemas.Models[schema];
  const dataObject = new Model(data);
  let res = await Model.findOne({ playlistID: data.playlistID });
  if (res !== null) {
    return await Model.updateOne({ playlistID: data.playlistID }, dataObject);
  } else {
    return await dataObject.save();
  }
};

getByPlaylistID = async (playlistID, schema) => {
  return await Schemas.Models[schema].findOne({ playlistID }).lean();
};

module.exports = {
  connectMongoDB,
  insert,
  insertOrUpdateByPlaylistID,
  getByPlaylistID
};
