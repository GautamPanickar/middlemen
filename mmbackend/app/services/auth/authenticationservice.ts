import { UserDTO } from '../../dtos/user/userdto';
import UserModel from '../../models/usermodel';
import DuplicateUserException from '../../utils/exceptions/authentication/duplicateuserexception';
import TokenData from '../../types/user/tokendata';
import User from '../../types/user/user';
import { EncryptionService } from './encryptionservice';
import BCryptEncryptionService from './bcryptencryptionservice';
import { AuthenticationUtils } from '../../utils/authenticationutils';
import WrongCredentialsException from '../../utils/exceptions/authentication/wrongcredentialsexception';
import SomethingWrongException from '../../utils/exceptions/base/somethingwrongexception';
import SubscriptionService from '../../services/subscription/subscriptionservice';
import UserManager from '../../managers/usermanager';
import { AppUtils } from '../../utils/apputils';
import AppDetails from '../../types/user/appdetails';
import AppDetailsService from '../../services/user/appdetailsservice';
import UserService from '../../services/user/userservice';

class AuthenticationService {
    private user = UserModel;
    private encryptionService: EncryptionService;
    private subscriptionService: SubscriptionService;
    private userManager: UserManager;
    private appDetailsService: AppDetailsService;
    private userService: UserService;

    public constructor() {
        this.encryptionService = new BCryptEncryptionService();
        this.subscriptionService = new SubscriptionService();
        this.userManager = new UserManager();
        this.appDetailsService = new AppDetailsService();
        this.userService = new UserService();
    }

    /**
     * Registers the user and return the token.
     * @param dto
     */
    public async registerUser(dto: UserDTO) {
        if ( await this.user.findOne({ email: dto.email })) {
            // If there's already a user with the same email,prevent registration.
            throw new DuplicateUserException(dto.email);
        }
        const hashedPassword: string = await this.encryptionService.getPasswordHash(dto.password, 10);
        // Create the new user and return the token
        let token: TokenData;
        try {
            this.userManager.setRoles(dto);
            const createdUser: User = await this.user.create({...dto,
                password: hashedPassword, 
                companyId:  (dto.isApp ? AppUtils.uniqueAppId : AppUtils.uniqueCompanyId),
                activated: true});
            token = AuthenticationUtils.generateAuthenticationToken(createdUser._id, createdUser.email, createdUser.name);
            createdUser.password = undefined;
            createdUser.token = token;
            // If the user has a subscription then save it.
            if (createdUser && dto.newSubscription && AppUtils.isNotEmpty(dto.company)) {
                this.subscriptionService.saveSubscription(dto.newSubscription, createdUser._id.toString());
            } else if (createdUser && dto.isApp) {
                // If a new app account is being created then save the app details also.
                const appDetailsToSave: AppDetails = {
                    name: dto.company,
                    code : AppUtils.getAppCode(dto.company)
                };
                const savedAppDetails: AppDetails = await this.appDetailsService.saveAppDetails(appDetailsToSave);
                this.userService.updateUserAppDetails(createdUser._id, savedAppDetails._id);
                createdUser.appCode = savedAppDetails.code;
            }
            return createdUser;
        } catch (error) {
            throw new SomethingWrongException(error);
        }
    }

    /**
     * Authenticates the user, after checking the passwords.
     * @param dto 
     */
    public async authenticateUser(dto: UserDTO) {
        const user = await this.findUserWithEmail(dto.email);
        if (user) {
            if (await this.encryptionService.arePasswordsEqual(dto.password, user.password)) {
                user.password = undefined;
                user.token = AuthenticationUtils.generateAuthenticationToken(user._id, user.email, user.name);
                return user;
            } else {
                throw new WrongCredentialsException();
            }
        } else {
            throw new WrongCredentialsException();
        }
    }

    /**
     * Finds a user already existing with the same email
     * @param email 
     */
    public async findUserWithEmail(email: string): Promise<User> {
        return await this.user.findOne({email: email, activated: true});
    }
}

export default AuthenticationService; 
