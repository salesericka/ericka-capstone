const express = require('express');
const app = express();
const cors = require('cors');
const locationRoutes = require('./routes/locationRoutes')
const userRoutes = require('./routes/userRoutes');
const proxy = require('express-http-proxy');

require('dotenv').config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use('/proxy', proxy('https://opinionated-quotes-api.gigalixirapp.com'));
app.use(express.json());

app.use('/', locationRoutes);
app.use('/userBucketList', userRoutes);

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