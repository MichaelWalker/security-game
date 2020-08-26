export interface Member {
    id: number;
    name: string;
    email: string;
    image_url: string;
    salt: string;
    hashed_password: string;
    coins: number;
    diamonds: number;
    role: "MEMBER" | "ADMIN";
}

export interface Item {
    id: number;
    title: string;
    description: string;
    price_coins: number;
    price_diamonds: number;
}

export interface OwnedItem {
    id: number;
    member_id: number;
    item_id: number;
}