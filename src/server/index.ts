import { container } from "tsyringe";
import { dbConnection } from "./database/connection";
import Registry  from "./registry"
import SettingsService from "./ipc-services/settings-service/settings.service";
import { IUserService } from "./ipc-services/user-service/models";

const init = async () => {
    Registry.init();
    await dbConnection();
    
    const settingsService = container.resolve(SettingsService);
    settingsService.register();
    const userService = container.resolve<IUserService>("IUserService");
    userService.register();
};

export default init;
