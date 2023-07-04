import {educationRouter} from "./education.router";

const express = require('express')
const bodyParser = require('body-parser')
export const app = express()
app.use(bodyParser())
app.use('/', educationRouter)
const port = 3001

const Pool = require('pg').Pool
export const pool = new Pool({
    user: 'nodejs',
    host: 'localhost',
    database: 'EducationTestDB',
    password: 'nodejs',
    port: 5432
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
})