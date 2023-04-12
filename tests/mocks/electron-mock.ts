export const mockIpcMain = {
    on: jest.fn().mockReturnThis(),
    handle: jest.fn().mockReturnThis(),
};

jest.mock("electron", () => {
    return {
        __esModule: true,
        ipcMain: mockIpcMain,
    };
});
