var request = require("request");

function generateID() {
  function S4() {
    return (((1 + Math.random()) * 0x100000000) | 0).toString(36).substring(1);
  }

  return (S4() + "-" + S4() + "-" + S4() + "-" + S4()).toUpperCase();
}

async function enhanceItem(item) {
  try {
    const res = await makeMetaRequest(item.link);
    item.meta = res;
  } catch (ex) {
    console.log("couldnt get metadata" + item.link);
    throw ex;
  }
  return item;
}

async function makeMetaRequest(url) {
  var options = {
    method: "GET",
    url: url,
    qs: { si: "N3yHVR5HS2SfvR06ERf-ew" },
    headers: { "Postman-Token": "d70bc495-0f81-4923-857c-8d538032418a", "cache-control": "no-cache", "x-requested-with": "https://localhost" }
  };
  return new Promise((res, rej) => {
    request(options, function(error, response, body) {
      if (error) rej(error);
      res(getMeta(body));
    });
  });
}

function getMeta(html) {
  const oldHtml = html + "";
  const metas = ["image", "title"];
  const res = {};
  for (let i = 0; i < metas.length; i++) {
    const tag = metas[i];
    html = oldHtml;
    html = html.substring(0, html.indexOf("</head>"));
    html = html.substring(html.indexOf("og:" + tag));
    html = html.substring(html.indexOf("content=") + 9);
    html = html.substring(0, html.indexOf('"'));
    res[tag] = html;
  }
  return res;
}

module.exports = { generateID, enhanceItem };
