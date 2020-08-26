import {createClient} from "./database";
import {Item} from "../models/databaseModels";


export const fetchItemsForMember = async (memberId: number): Promise<Array<Item & { quantity: number }>> => {
    const client = await createClient();
    const results = await client.query(
        `SELECT item.*, COUNT(owned_item) as quantity
                        FROM item JOIN owned_item on item.id = owned_item.item_id
                        WHERE member_id = ${memberId}
                        GROUP BY item.id`
    );
    await client.end();
    return results.rows;
}

export const addOwnedItem = async (memberId: number, itemId: number) => {
    const client = await createClient();
    await client.query(`INSERT INTO owned_item (member_id, item_id) VALUES (${memberId}, ${itemId})`);
    await client.end();
}