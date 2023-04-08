import { container } from "tsyringe";
import { AppDataSource } from "./database/connection";
import UserService from "./ipc-services/user-service/user.service";
import UsersRepo from "./repositories/users/users-repo";

class Registry {
    private static isInitialized: boolean;

    static init(): void {
        if (Registry.isInitialized) {
            console.warn("Registry already initialized, no need to register again...");
            return;
        }

        container.register("IDataSource", { useValue: AppDataSource });
        container.register("IUsersRepo", { useClass: UsersRepo });
        container.register("IUserService", { useClass: UserService });

        console.log("IOC Container registerd");
    }
}

export default Registry;
