import { ipcMain } from "electron";
import { inject, injectable } from "tsyringe";
import { UserTypes } from "../../../common/ipcTypes";
import { IUsersRepo } from "../../repositories/users/models";
import { IUserService } from "./models";

@injectable()
class UserService implements IUserService{
    private readonly repo: IUsersRepo;

    constructor(@inject("IUsersRepo") repo: IUsersRepo) {
        this.repo = repo;
        this.registerForEvents();
    }

    private registerForEvents = () => {
        ipcMain.handle(UserTypes.getAllUser, () => {
            const response = this.repo.getAllUsers();
            return response;
        });

        ipcMain.handle(UserTypes.addUser, async (event: Electron.Event, obj) => {
            const userCreated = await this.repo.addUser(obj);
            return userCreated;
        });

        ipcMain.on(UserTypes.deleteUser, (event: Electron.Event, id) => {
            this.repo.deleteUser(id);
        });
    };
}

export default UserService;
