import {educationRouter} from "./education.router";
import express from 'express'
import bodyParser from "body-parser";
import {dbConnection} from "./app.settings/db.connection";

export const app = express()
app.use(bodyParser())
app.use('/', educationRouter)
const port = process.env.appport
export const pool = dbConnection()

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
})