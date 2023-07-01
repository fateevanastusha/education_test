"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());
const port = 3000;
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
