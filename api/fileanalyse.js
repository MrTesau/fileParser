"use strict";
var express = require("express");
var cors = require("cors");
var multer = require("multer");
// require and use "multer"...
var storage = multer.memoryStorage(); // Create memory storage
var upload = multer({ storage: storage });
var app = express();

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    upload.single("data");
    const { originalname: name, mimetype: type, size } = req.file;
    res.json({
      name,
      type,
      size,
    });
  }
};

module.exports = allowCors(handler);
