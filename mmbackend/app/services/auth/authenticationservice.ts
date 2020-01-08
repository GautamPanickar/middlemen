import { UserDTO } from '../../dtos/user/userdto';
import UserModel from '../../models/usermodel';
import DuplicateUserException from '../../utils/exceptions/authentication/duplicateuserexception';
import TokenData from '../../types/user/tokendata';
import User from '../../types/user/user';
import { EncryptionService } from './encryptionservice';
import BCryptEncryptionService from './bcryptencryptionservice';
import { AuthenticationUtils } from '../../utils/authenticationutils';

class AuthenticationService {
    private user = UserModel;
    private encryptionService: EncryptionService;

    public constructor() {
        this.encryptionService = new BCryptEncryptionService();
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
            const createdUser: User = await this.user.create({...dto,
                password: hashedPassword,});
            token = AuthenticationUtils.generateAuthenticationToken(createdUser._id, createdUser.email, createdUser.name);
            createdUser.password = undefined;
            createdUser.token = token;
            return createdUser;
        } catch (error) {
            console.log('---------------');
            console.log(error);
            console.log('---------------');
        }
    }
}

export default AuthenticationService; 
