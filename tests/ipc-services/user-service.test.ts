
import { mock } from "jest-mock-extended";
import { UserTypes } from "../../src/common/ipcTypes";
import { mockIpcMain } from "../mocks/electron-mock"; // Must be imported before SUT
import UserService from "../../src/server/ipc-services/user-service/user.service";
import { IUsersRepo } from "../../src/server/repositories/users/models";

describe("UserService", () => {
    let mockRepo: IUsersRepo;
    let registrations = new Map<string, () => void>();

    beforeEach(async () => {
        jest.clearAllMocks();
        mockRepo = mock<IUsersRepo>();

        mockIpcMain.on.mockImplementation((event, callback) => {
            registrations.set(event, callback);
        });

        mockIpcMain.handle.mockImplementation((event, callback) => {
            registrations.set(event, callback);
        });
    });

    it("Should be defined", async() => {
        const sut = new UserService(mockRepo);
        expect(sut).toBeDefined();
    });

    it("Should register for events", async() => {
        const sut = new UserService(mockRepo);

        expect(mockIpcMain.on.mock.calls[0][0]).toEqual(UserTypes.deleteUser);
        expect(mockIpcMain.handle.mock.calls[0][0]).toEqual(UserTypes.getAllUser);
        expect(mockIpcMain.handle.mock.calls[1][0]).toEqual(UserTypes.addUser);
        expect(mockIpcMain.on.mock.calls).toHaveLength(1);
        expect(mockIpcMain.handle.mock.calls).toHaveLength(2);
    });

    it("Should handle addUser", async() => {
        const sut = new UserService(mockRepo);

        const cb = registrations.get(UserTypes.addUser);
        expect(cb).toBeDefined();
        if (cb) {
            cb();
        }

        expect(mockRepo.addUser).toBeCalledTimes(1);
    });

    it("Should handle deleteUser", async() => {
        const sut = new UserService(mockRepo);

        const cb = registrations.get(UserTypes.deleteUser);
        expect(cb).toBeDefined();
        if (cb) {
            cb();
        }

        expect(mockRepo.deleteUser).toBeCalledTimes(1);
    });

    it("Should handle getAllUser", async() => {
        const sut = new UserService(mockRepo);

        const cb = registrations.get(UserTypes.getAllUser);
        expect(cb).toBeDefined();
        if (cb) {
            cb();
        }

        expect(mockRepo.getAllUsers).toBeCalledTimes(1);
    });
});