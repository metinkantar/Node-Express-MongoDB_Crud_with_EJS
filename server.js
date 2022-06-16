require("dotenv").config({ path: "config.env" });
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
//import path from "path";
const app = express();
const Userdb = require("./core/models/user");

//MongoDB Bağlantısı
//import { dbBaglanti } from "./core/config/db";
const dbBaglanti = require("./core/config/db");
dbBaglanti();
// gelen istekleri loglamak için
app.use(morgan("dev"));
// body parser kullanımı
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// görünüm motorunu ayarlama
app.set("view engine", "ejs");
// set public folder
app.use('/css', express.static('assets/css'));
app.use('/img', express.static('assets/img'));
app.use('/js', express.static('assets/js'));


//import { homeRoutes, add_user, update_user } from './core/services/render';
//import service from './core/services/render';
//const controller = require('./core/controllers/controller');


app.get('/', (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:3000/api/users')
    .then(function (response) {
      res.render('index', {
        users: response.data,
        link: {
          'index': '/',
        }
      });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get('/add-user', (req, res) => {
  res.render('add-users', {
    link: {
      'addUser': '/add-user',
    }
  });
})
app.get('/update-user', (req, res) => {
  axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", {
        user: userdata.data, link: {
          'addUser': '/add-user',
        }
      });
    })
    .catch(err => {
      res.send(err);
    })
})
// API
app.use('/api', require('./core/routes/user'));




const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`${PORT} numaralı port adresinden gelen istekler dinleniliyor...`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
})