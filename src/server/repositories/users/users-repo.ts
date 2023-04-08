import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { User } from "../../database/entities/User";
import { IUsersRepo } from "./models";

@injectable()
class UsersRepo implements IUsersRepo {
    private readonly userRepository: Repository<User>;

    constructor(@inject("IDataSource") dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(User);
    }

    getAllUsers = async (): Promise<User[]> => {
        try {
            const savedUser: User[] = await this.userRepository.find();
            return savedUser;
        } catch (error) {
            console.log("Error: on finding all Users in database: ", error);
        }
    };

    addUser = async (obj: User): Promise<User> => {
        const user = new User();
        user.name = obj.name;
        user.age = obj.age;
        user.birthDay = obj.birthDay;
        user.email = obj.email;

        try {
            const addedUser = await this.userRepository.save(user);
            return addedUser;
        } catch (error) {
            console.log("Error: on Adding User in database:", error);
        }
    };

    deleteUser = async (id: string): Promise<void> => {
        try {
            const userToRemove = await this.userRepository.findOneBy({
                id: id,
            });
            await this.userRepository.remove(userToRemove);
        } catch (error) {
            console.log("Error: on Deleting User in database:", error);
        }
    };
}

export default UsersRepo;
