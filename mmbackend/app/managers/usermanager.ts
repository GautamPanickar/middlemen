import { UserDTO } from '../dtos/user/userdto';
import UserService from '../services/user/userservice';
import User from '../types/user/user';
import { AppUtils } from '../utils/apputils';
import CustomException from '../utils/exceptions/customexception';

class UserManager {
    public userService: UserService

    public constructor() {
        this.userService = new UserService();
    }

    /**
     * Updates the user and the user details.
     * @param dto 
     */
    public async updateUser(dto: UserDTO): Promise<User> {
        const errors: string[] = this.validateUser(dto);
        if (errors.length > 0) {
            throw new CustomException('Validation error while updating user', errors);
        } else {
            const existingUser: User = await this.userService.findById(dto.id);
            dto.password = existingUser.password;
            return await this.userService.saveUser(dto);
        }
    }

    /**
     * Validates the properties of the user.
     * @param dto 
     */
    private validateUser(dto: UserDTO): string[] {
        let errors: string[] = [];
        if (AppUtils.isEmpty(dto.name)) {
            errors.push('Name cannot be empty');
        }
        if (AppUtils.isEmpty(dto.email)) {
            errors.push('Email cannot be empty');
        }
        if (!dto.contactAddress) {
            errors.push('Contact address needs to be provided');
        } else if (AppUtils.isEmpty(dto.contactAddress.line1)){
            errors.push('Contact address cannot be empty');
        } else if (AppUtils.isEmpty(dto.contactAddress.state)){
            errors.push('State in contact address cannot be empty');
        } else if (AppUtils.isEmpty(dto.contactAddress.country)){
            errors.push('Country in contact address cannot be empty');
        } else if (AppUtils.isEmpty(dto.contactAddress.phone)){
            errors.push('Contact phone number cannot be empty');
        }
        if (!dto.billingAddress) {
            errors.push('Billing address needs to be provided');
        } else if (AppUtils.isEmpty(dto.billingAddress.line1)){
            errors.push('Billing address cannot be empty');
        } else if (AppUtils.isEmpty(dto.billingAddress.state)){
            errors.push('State in billing address cannot be empty');
        } else if (AppUtils.isEmpty(dto.billingAddress.country)){
            errors.push('Country in billing address cannot be empty');
        } else if (AppUtils.isEmpty(dto.billingAddress.phone)){
            errors.push('Billing phone number cannot be empty');
        }
        
        return errors;
    }
}

export default UserManager;