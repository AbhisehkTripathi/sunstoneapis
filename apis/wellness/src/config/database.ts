import { DataSource } from "typeorm"
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'postgres',
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

// console.log("Sunstone Auth Database initializing...",process.env.DB_HOST,process.env.DB_PORT,process.env.DB_USER,process.env.DB_PASSWORD,process.env.DB_NAME)
AppDataSource.initialize()
    .then(() => {
      console.log("Sunstone Wellness Database connected successfully")
    })
    .catch((error) => console.log(error))
