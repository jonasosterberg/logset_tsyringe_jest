import { ipcMain, nativeTheme } from "electron";
import { injectable } from "tsyringe";

@injectable()
class SettingsService {

    constructor() {
        this.registerForEvents();
    }

    private registerForEvents = () => {
        ipcMain.handle("dark-mode:toggle", () => {
            if (nativeTheme.shouldUseDarkColors) {
                nativeTheme.themeSource = "light";
            } else {
                nativeTheme.themeSource = "dark";
            }
            return nativeTheme.shouldUseDarkColors;
        });
    };
}

export default SettingsService;
