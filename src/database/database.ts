import pg from "pg";

export const createClient = async () => {
    const pgClient = new pg.Client(process.env.DATABASE_URL);
    await pgClient.connect();
    return pgClient;
}