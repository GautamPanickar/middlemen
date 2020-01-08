import { UserDTO } from '../../dtos/user/userdto';

class UserManager {

    public constructor() {
    }

    public createNewUser(userData: UserDTO): string {
        return undefined;
    }

    public isAnExisitingUser(userData: UserDTO): boolean {
        return false;
    }
}

export default new UserManager();