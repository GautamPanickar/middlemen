import UserModel from '../../models/usermodel';
import { UserDTO } from '../../dtos/user/userdto';
import SomethingWrongException from '../../utils/exceptions/base/somethingwrongexception';
import User from '../../types/user/user';
import CustomException from '../../utils/exceptions/customexception';
import { AppUtils } from '../../utils/apputils';
import AppDetailsService from './appdetailsservice';
import AppDetails from 'types/user/appdetails';

class UserService {
    private user = UserModel;
    private appDetailsService: AppDetailsService;

    constructor () {
        this.appDetailsService = new AppDetailsService();
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
            const userToUpdate: User = await this.findById(dto._id);
            userToUpdate.name = dto.name;
            userToUpdate.company =  dto.company;
            userToUpdate.email = dto.email;
            userToUpdate.gstNumber = dto.gstNumber;
            if (AppUtils.isNotEmpty(dto.app_id) || AppUtils.isNotEmpty(dto.appCode)) {
                const appDetails: AppDetails =  AppUtils.isNotEmpty(dto.app_id)
                    ? await this.appDetailsService.findById(dto.app_id)
                    : await this.appDetailsService.findByCode(dto.appCode);
                if (appDetails) {
                    userToUpdate.app_id = appDetails._id;
                }
            }
            userToUpdate.app_id = dto.appCode;
            userToUpdate.billingAddress = {
                line1: dto.billingAddress.line1,
                country: dto.billingAddress.country,
                state: dto.billingAddress.state,
                city: dto.billingAddress.city,
                zipCode: dto.billingAddress.zipCode,
                phone: dto.billingAddress.phone,
                email: dto.billingAddress.email
            };
            userToUpdate.contactAddress = {
                line1: dto.contactAddress.line1,
                country: dto.contactAddress.country,
                state: dto.contactAddress.state,
                city: dto.contactAddress.city,
                zipCode: dto.contactAddress.zipCode,
                phone: dto.contactAddress.phone,
                email: dto.contactAddress.email
            };
            const model = new UserModel(userToUpdate);
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

    /**
     * Updates the user information with the app information.
     * @param userId 
     * @param appId 
     */
    public async updateUserAppDetails(userId: string, appId: string): Promise<User> {
        try {
            const userToUpdate: User = await this.findById(userId);
            userToUpdate.app_id = appId;
            const model = new UserModel(userToUpdate);
            const updatedUser: User = await model.save();
            return updatedUser;
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }
}

export default UserService;