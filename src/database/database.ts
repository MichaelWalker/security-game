import pg from "pg";

export const createClient = async () => {
    const pgClient = new pg.Client(process.env.POSTGRES_CONNECTION_STRING);
    await pgClient.connect();
    return pgClient;
}