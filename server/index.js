const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const compression = require("compression");
const DB = require("./database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const utils = require("./utils");

app.prepare().then(() => {
  const server = express();
  server.use(
    expressSession({
      secret: "?A622T+&2K5kq^QcuFGGkcHg$_7%@yt7",
      resave: true,
      saveUninitialized: true
    })
  );
  server.use(compression());
  server.use(cookieParser());
  server.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  server.use(bodyParser.json());
  DB.connectMongoDB().then(async () => {
    server.get("/_next/*", (req, res) => {
      handle(req, res);
    });

    server.get("/static/*", (req, res) => {
      handle(req, res);
    });

    server.get("/", (req, res) => {
      return handle(req, res);
    });

    server.post("/api/username", (req, res) => {
      req.session.username = req.body.username;
      res.send({ success: true });
    });

    server.get("/nousername", (req, res) => {
      return app.render(req, res, "/index", { missingUser: true, originalUrl: req.session.originalUrl });
    });

    function authentication(req, res, next) {
      if (req.originalUrl.includes("playlist")) req.session.originalUrl = req.originalUrl;
      if (!req.session.username) {
        return res.redirect("/nousername");
      }
      return next();
    }

    server.get("/api/link", async (req, res) => {
      const uID = utils.generateID();
      const playlist = { playlistID: uID, items: [] };
      try {
        await DB.insertOrUpdateByPlaylistID(playlist, "Playlist");
        res.send(playlist);
      } catch (ex) {
        console.log(ex);
        res.send({ success: false, error: ex });
      }
    });
    server.use(authentication);

    server.get("/playlist/:id", async (req, res) => {
      const { id } = req.params;
      try {
        let playlist = await DB.getByPlaylistID(id, "Playlist");
        return app.render(req, res, "/playlist", playlist);
      } catch (ex) {
        console.log(ex);
        return app.render(req, res, "/playlist", ex);
      }
    });

    server.get("/api/playlist/:id", async (req, res) => {
      const { id } = req.params;
      try {
        let playlist = await DB.getByPlaylistID(id, "Playlist");
        res.send(playlist);
      } catch (ex) {
        console.log(ex);
        return res.send({ success: false, error: ex });
      }
    });

    server.post("/api/playlist/:id/item", async (req, res) => {
      const uID = utils.generateID();
      const playlist = await DB.getByPlaylistID(req.params.id, "Playlist");
      if (playlist) {
        const { link } = req.body;
        let item = { playlistItemID: uID, link };
        item = await utils.enhanceItem(item);
        playlist.items.push(item);
        try {
          await DB.insertOrUpdateByPlaylistID(playlist, "Playlist");
          return res.send(playlist);
        } catch (ex) {
          console.log(ex);
          return res.send({ success: false, error: ex });
        }
      }
      return res.send({ success: false, error: { message: "No playlist found" } });
    });

    server.post("/api/clickedOn/:playlistID/:itemID", async (req, res) => {
      const playlist = await DB.getByPlaylistID(req.params.playlistID, "Playlist");
      if (playlist) {
        const username = req.session.username;
        const itemID = req.params.itemID;
        for (let i = 0; i < playlist.items.length; i++) {
          if (playlist.items[i].playlistItemID == itemID) {
            const clicked = playlist.items[i].clicked.filter(item => item.username == username);
            if (clicked.length == 0) playlist.items[i].clicked.push({ username });
          }
        }
        try {
          await DB.insertOrUpdateByPlaylistID(playlist, "Playlist");
          return res.send(playlist);
        } catch (ex) {
          console.log(ex);
          return res.send({ success: false, error: ex });
        }
      }
      return res.send({ success: false, error: { message: "No playlist found" } });
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
});
