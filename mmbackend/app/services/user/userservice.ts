import UserModel from '../../models/usermodel';
import { UserDTO } from '../../dtos/user/userdto';
import SomethingWrongException from '../../utils/exceptions/base/somethingwrongexception';
import User from '../../types/user/user';
import CustomException from '../../utils/exceptions/customexception';
import { AppUtils } from '../../utils/apputils';

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
            const model = new UserModel(dto);
            const updatedUser: User = await model.save();
            return updatedUser;
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }

    /**
     * Updates the user information for the given field.
     * @param id 
     * @param dto 
     * @param field 
     */
    public async updateUserInfo(id: string, dto: UserDTO, field: string): Promise<User> {
        try {
            const userToUpdate: User = await this.findById(id);
            if (userToUpdate) {
                if (field === 'Company' && AppUtils.isNotEmpty(dto.company)) {
                    userToUpdate.company = dto.company;
                } else if (field === 'Name' && AppUtils.isNotEmpty(dto.name)) {
                    userToUpdate.name = dto.name;
                } else if (field === 'ContactAddress' && AppUtils.isNotEmpty(dto.contactAddress.line1)) {
                    userToUpdate.contactAddress.line1 = dto.contactAddress.line1;
                } else if (field === 'BillingAddress' && AppUtils.isNotEmpty(dto.billingAddress.line1)) {
                    userToUpdate.billingAddress.line1 = dto.billingAddress.line1;
                }
                const model = new UserModel(userToUpdate);
                const updatedUser: User = await model.save();
                return updatedUser;
            } else {
                throw new CustomException('Could not find the user');
            }
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }
}

export default UserService;