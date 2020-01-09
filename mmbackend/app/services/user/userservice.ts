import UserModel from '../../models/usermodel';
import { UserDTO } from '../../dtos/user/userdto';
import SomethingWrongException from '../../utils/exceptions/base/somethingwrongexception';
import User from '../../types/user/user';

class UserService {
    private user = UserModel;

    constructor () {
    }

    /**
     * Returns all the users.
     * @param userId 
     */
    public async findAllUsers() {
        return this.user.find({});
    }

    /**
     * Returns the user for the given id.
     * @param id 
     */
    public async findById(id: string) {
        return this.user.findById(id);
    }

   /**
    * Updates the details of the user.
    * @param dto 
    */
    public async saveUser(dto: UserDTO) {
        try {
            const updatedUser: User = await this.user.save({...dto});
            return updatedUser;
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }
}

export default UserService;