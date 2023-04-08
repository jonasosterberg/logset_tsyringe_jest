import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

export type MockContext = {
    ctx: DeepMockProxy<DataSource>
}

export type MockRepository<T extends ObjectLiteral> = {
    repo: DeepMockProxy<Repository<T>>
}

export const createMockContext = (): MockContext => {
    return {
        ctx: mockDeep<DataSource>(),
    }
}

export const createMockRepository = <T extends ObjectLiteral>(): MockRepository<T> => {
    return {
        repo: mockDeep<Repository<T>>(),
    }
}
