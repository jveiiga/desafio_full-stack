import "dotenv/config"
import path from "path"
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(
        __dirname,
        "./entities/*.{js,ts}"
    )
    const migrationsPath: string = path.join(
        __dirname,
        "./migrations/*{js,ts}"
    )

    const nodeEnv = process.env.NODE_ENV

    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath],
        }
    }

    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath],
        }
    }

    return {
        type: "postgres",
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT!),
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    }
}

export const AppDataSource = new DataSource(dataSourceConfig());