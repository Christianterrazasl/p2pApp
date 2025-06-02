const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize} = require('./config/db');
const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

