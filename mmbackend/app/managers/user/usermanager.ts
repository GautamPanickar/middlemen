import UserDTO from '../../dtos/user/userdto';
import { UserModel } from '../../models/usermodel';
import User from '../../types/user/user';

class UserManager {

    private user = UserModel;

    public constructor() {
    }

    public createNewUser(userData: UserDTO): string {
        return undefined;
    }

    public isAnExisitingUser(userData: UserDTO): boolean {
        return this.user.findOne({ email: userData.Email });
    }
}

export default new UserManager();