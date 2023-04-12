import { container } from "tsyringe";
import { dbConnection } from "./database/connection";
import Registry  from "./registry"
import SettingsService from "./ipc-services/settings-service/settings.service";
import { IUserService } from "./ipc-services/user-service/models";

const init = async () => {
    Registry.init();
    await dbConnection();
    
    // Manual "Activation" of ipc handlers
    container.resolve(SettingsService);
    container.resolve<IUserService>("IUserService");
};

export default init;
