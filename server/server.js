const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const routes = require('./routes/routes')
require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use('/', routes)

app.use((req, res, next) => {
   if (
     req.method === "POST" &&
     req.headers["content-type"] !== "application/json"
   ) {
     res.status(400).send("Server requires application/json");
   } else {
     next();
   }
 });

app.listen(port, () => console.log(`listening on http://localhost:${port}`));