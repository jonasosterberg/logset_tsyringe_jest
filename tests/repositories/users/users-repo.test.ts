import { User } from "../../../src/server/database/entities/User";
import { DataSource, Repository } from "typeorm";
import UsersRepo from "../../../src/server/repositories/users/users-repo";
import { createMockContext, createMockRepository, MockContext, MockRepository } from "../../mocks/data-source-mock";

describe("UserService", () => {
    let mockCtx: MockContext;
    let mockRepo: MockRepository<User>;
    let ctx: DataSource;
    let repo: Repository<User>;

    beforeEach(async () => {
        jest.clearAllMocks();
        mockCtx = createMockContext();
        mockRepo = createMockRepository<User>();
        ctx = mockCtx.ctx as unknown as DataSource;
        repo = mockRepo.repo as unknown as Repository<User>;
    });

    it("Should be defined", async() => {
        const sut = new UsersRepo(ctx);
        expect(sut).toBeDefined();
    });

    it("Should get all users", async() => {

        jest.spyOn(ctx, "getRepository").mockImplementation(() => {
            return repo;
        });

        jest.spyOn(repo, "find").mockImplementation(async () => {
            return [{}, {}] as User[];
        });

        const sut = new UsersRepo(ctx);
        const resp = sut.getAllUsers();
        expect(repo.find).toBeCalledTimes(1);
        expect((await resp).length).toBe(2);
    });
});