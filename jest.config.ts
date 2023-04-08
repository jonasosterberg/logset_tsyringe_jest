import type { Config } from 'jest';

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"]
};

export default config;
