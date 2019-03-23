import fetch from "isomorphic-unfetch";
import queryString from "query-string";

class Request {
  constructor(url) {
    this.url = url;
  }

  async callFetch(method, path, body) {
    let customPath = path;
    const config = {
      method,
      headers: {
        "content-type": "application/json",
        accept: "json"
      },
      credentials: "same-origin" // wichtig für auth !!!
    };

    if (config.method !== "GET") {
      config.body = JSON.stringify(body);
    } else if (body) {
      customPath = `${path}?${queryString.stringify(body)}`;
    }

    try {
      const res = await fetch(`${this.url ? this.url : ""}/api${customPath}`, config);
      const data = await res.json();
      return {
        data,
        response: res
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async callForeignApiFetch(url, method) {
    const config = {
      method
    };
    try {
      const res = await fetch(url, config);
      const data = await res.json();
      return {
        data,
        response: res
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  callAddAnswer(query) {
    return this.callFetch("POST", "/answer", query);
  }
  callGetLink() {
    return this.callFetch("GET", "/link");
  }

  callGetPlaylist(link) {
    return this.callFetch("GET", "/playlist/" + link);
  }

  callAddPlaylistItem(playlistID, data) {
    return this.callFetch("POST", "/playlist/" + playlistID + "/item", data);
  }
  callSetUsername(query) {
    return this.callFetch("POST", "/username", query);
  }

  callClickedOnItem(playlistid, itemid) {
    return this.callFetch("POST", "/clickedOn/" + playlistid + "/" + itemid);
  }
}

const request = new Request();
export default request;
