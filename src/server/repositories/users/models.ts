import { User } from "../../database/entities/User";

export interface IUsersRepo {
    getAllUsers: () => Promise<User[]>;
    addUser: (user: User) => Promise<User>;
    deleteUser: (id: string) => Promise<void>;
};