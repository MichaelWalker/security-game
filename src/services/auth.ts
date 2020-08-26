import * as crypto from "crypto";
import {Member} from "../models/databaseModels";
import {fetchMemberByEmail} from "../database/members";

export const authenticateMember = async (email: string, password: string): Promise<Member | null> => {
    const member = await fetchMemberByEmail(email);
    
    if (!member) {
        return null;
    }
    
    if (passwordMatches(member, password)) {
        return member;
    }
    return null;
}

export const generateSaltAndHash = (password: string): { salt: string, hash: string } => {
    const salt = generateSalt();
    return {
        salt: salt,
        hash: hashPassword(salt, password)
    }
}

const passwordMatches = (member: Member, password: string): boolean => {
    const passwordAttempt = hashPassword(member.salt, password);
    return passwordAttempt === member.hashed_password;
}

const hashPassword = (salt: string, password: string): string => {
    return crypto
        .createHash("sha256")
        .update(salt + password)
        .digest("base64");
}

const generateSalt = (): string => {
    return crypto.randomBytes(20).toString();
};