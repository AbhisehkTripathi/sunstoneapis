import { DataSource } from "typeorm"
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  ssl: false,
  extra: {
    max: 30, 
    min: 10, 
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
  },
  ...(process.env.NODE_ENV === 'production' ? {
    entities: ['dist/app/models/*.js'],
    migrations: ['dist/database/migrations/*.js']
  } : {
    entities: ['src/app/models/*.ts'],
    migrations: ['src/database/migrations/*.ts']
  })
})
AppDataSource.initialize()
    .then(() => {
      console.log("Database connected successfully")
    })
    .catch((error) => console.log(error))
