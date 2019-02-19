import { Request } from "express";
import User from "./UserInterface";

interface RequestWithUser extends Request {
    user: User;
}

export default RequestWithUser;
