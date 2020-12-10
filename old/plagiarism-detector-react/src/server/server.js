const express = require("express");
const upload = require("./upload");
const cors = require("cors");

const server = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.post("/upload", upload);

server.listen(8000, () => {
  console.log("Server started!");
});

// var http = require('http');
//
// http.createServer(function (request, response) {
//   response.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
//   });
//   response.end('Hello World\n');
// }).listen(3000);