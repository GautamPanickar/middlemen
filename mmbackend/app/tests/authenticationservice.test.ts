import * as typeorm from 'typeorm';
import AuthenticationService from '../services/auth/authenticationservice';
import TokenData from '../types/user/tokendata';
import { UserDTO } from '../dtos/user/userdto';
import DuplicateUserException from '../utils/exceptions/authentication/duplicateuserexception';

describe('The AuthenticationService', () => {
    const authenticationService = new AuthenticationService();
    describe('when registering a user', () => {
        it('should throw an error', async () => {
            const userData: UserDTO = {
                name: 'John Smith',
                email: 'john@smith.com',
                password: 'strongPassword123'
            };
            (typeorm as any).getRepository.mockReturnValue({
                findOne: () => Promise.resolve(userData),
            });
            await expect(authenticationService.registerUser(userData))
              .rejects.toMatchObject(new DuplicateUserException(userData.email));
        });
    });
})