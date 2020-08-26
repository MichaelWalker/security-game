import {Request, Response} from "express";
import {Member} from "../models/databaseModels";

export const signedIn = (callback: (request: Request, response: Response, currentMember: Member) => any) => {
    return (request: Request, response: Response) => {
        const member = request.user as Member;
        if (!member) {
            return response.redirect("/auth/login");
        }
        callback(request, response, member);
    }
}

export const adminOnly = (callback: (request: Request, response: Response, currentMember: Member) => any) => {
    return (request: Request, response: Response) => {
        const member = request.user as Member;
        if (!member || member.role !== "ADMIN") {
            return response.redirect("/auth/login");
        }
        callback(request, response, member);
    }
}