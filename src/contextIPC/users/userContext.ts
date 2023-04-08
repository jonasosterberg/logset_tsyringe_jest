import { ipcRenderer } from "electron";
import { UserTypes } from "../../common/ipcTypes";
import { UserData } from "../../app/redux/userSlice";

const userContext = {

  getAllUser() {
    return ipcRenderer.invoke(UserTypes.getAllUser);
  },

  addUser(obj: UserData) {
    console.log(obj)
    return ipcRenderer.invoke(UserTypes.addUser, obj);
  },

  deleteUser(id: string): void {
    ipcRenderer.send(UserTypes.deleteUser, id);
  },
  toggleDarkMode(channel: string) {
    return ipcRenderer.invoke(channel);
  },
};

export type userContextApi = typeof userContext;

export default userContext;
