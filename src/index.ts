import {educationRouter} from "./education.router";

const express = require('express')
const bodyParser = require('body-parser')
export const app = express()
app.use(bodyParser())
app.use('/', educationRouter)
const port = process.env.appport

const Pool = require('pg').Pool
export const pool = new Pool({
    user: process.env.pgusers,
    host: process.env.pghost,
    database: process.env.pgdatabase,
    password: process.env.pgpassword,
    port: process.env.pgport
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
})