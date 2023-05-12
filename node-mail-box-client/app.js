const dotnev = require('dotenv');
dotnev.config();

const  cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
app.use(cors());

const userRoutes = require('./routes/user');
const forogotPasswordRoutes = require('./routes/forgotPassword');
const mailRoutes = require('./routes/mail');

app.use(express.json());

app.use('/user', userRoutes);
app.use('/password', forogotPasswordRoutes);
app.use('/mail', mailRoutes);

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, `public/${req.url}`))
// });


mongoose
.connect(
  process.env.DB_DETAILS
)
.then(() => {
  app.listen(process.env.DB_PORT);
})
.catch(error => {
  console.log(error)
})

