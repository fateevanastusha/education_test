import {Pool} from 'pg'

export const dbConnection = () : Pool => {
    return new Pool({
        user: process.env.pgusers ?? 'postgres',
        host: process.env.pghost ?? 'localhost',
        database: process.env.pgdatabase ?? 'postgres',
        password: process.env.pgpassword ?? 'admin',
        port: Number(process.env.pgport ?? 5432)
    })
}