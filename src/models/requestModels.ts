export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface NewMember {
    name: string;
    email: string;
    salt: string;
    hashedPassword: string;
}

export interface UpdateMember {
    name: string;
    email: string;
    image: string;
    bio: string;
}

export interface NewItem {
    title: string;
    description: string;
    priceInCoins: number;
    priceInDiamonds: number;
}