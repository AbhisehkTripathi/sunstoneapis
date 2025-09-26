import { DataSource } from "typeorm"
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'sunstonemind',
    synchronize: false,
    logging: true,
    ssl: false,
    extra: {
      max: 30, 
      min: 10, 
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000,
    },
    entities: ['src/app/models/*.ts'],
    migrations: ['src/database/migrations/*.ts']
})

AppDataSource.initialize()
    .then(() => {
      console.log("Sunstone Wellness Database connected successfully")
    })
    .catch((error) => console.log(error))
