import {Item} from "../models/databaseModels";
import {NewItem} from "../models/requestModels";
import {createClient} from "./database";

export const fetchAllItems = async (): Promise<Item[]> => {
    const client = await createClient();
    const results = await client.query("SELECT * FROM item");
    await client.end();
    return results.rows;
}

export const fetchItemById = async(id: number): Promise<Item> => {
    const client = await createClient();
    const result = await client.query(`SELECT * FROM item WHERE id = ${id}`);
    await client.end();
    return result.rows[0];
}

export const insertItem = async(newItem: NewItem): Promise<void> => {
    const client = await createClient();
    await client.query(`INSERT INTO item (title, description, price_coins, price_diamonds) 
                                        VALUES ('${newItem.title}', '${newItem.description}', ${newItem.priceInCoins}, ${newItem.priceInDiamonds})`);
    await client.end();
}