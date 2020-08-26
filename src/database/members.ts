import {Member} from "../models/databaseModels";
import {NewMember, UpdateMember} from "../models/requestModels";
import {createClient} from "./database";


export const fetchAllMembers = async (): Promise<Member[]> => {
    const client = await createClient();
    const result = await client.query("SELECT * FROM member ORDER BY name");
    await client.end();
    return result.rows;
}

export const fetchMemberByEmail = async (email: string): Promise<Member | null> => {
    const client = await createClient();
    const result = await client
        .query(`SELECT * FROM member WHERE email = '${email}'`);
    await client.end();
    
    if (result.rows.length === 0) {
        return null;
    }
    
    return result.rows[0];
}

export const fetchMemberById = async (id: number): Promise<Member | null> => {
    const client = await createClient();
    const result = await client
        .query(`SELECT * FROM member WHERE id = '${id}'`);
    await client.end();

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

export const insertMember = async (newMember: NewMember): Promise<Member> => {
    const client = await createClient();
    const insertedRows = await client
        .query(`INSERT INTO member (name, email, salt, hashed_password) 
                VALUES ('${newMember.name}', '${newMember.email}', '${newMember.salt}', '${newMember.hashedPassword}')
                RETURNING *`);
    await client.end();
    return insertedRows.rows[0];
}

export const updateMember = async (id: number, updateMember: UpdateMember): Promise<void> => {
    const client = await createClient();
    
    await client.query(`UPDATE member SET 
                  name = '${updateMember.name}',
                  email = '${updateMember.email}',
                  image_url = '${updateMember.image}',
                  bio = '${updateMember.bio}'
                WHERE id = ${id}
    `);
    await client.end();
}

export const addCoinsToMember = async (id: number, addedCoins: number): Promise<void> => {
    const client = await createClient();
    await client
        .query(`UPDATE member SET coins = coins + ${addedCoins} WHERE id = ${id}`);
    await client.end();
}

export const addDiamondsToMember = async (id: number, addedDiamonds: number): Promise<void> => {
    const client = await createClient();
    await client
        .query(`UPDATE member SET diamonds = diamonds + ${addedDiamonds} WHERE id = ${id}`);
    await client.end();
}