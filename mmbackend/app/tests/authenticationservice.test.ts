import * as typeorm from 'typeorm';
import AuthenticationService from '../services/auth/authenticationservice';
import { UserDTO } from '../dtos/user/userdto';
import DuplicateUserException from '../utils/exceptions/authentication/duplicateuserexception';
import WrongCredentialsException from '../utils/exceptions/authentication/wrongcredentialsexception';

(typeorm as any).getRepository = jest.fn();
process.env.JWT_SECRET = 'jwt_secret';

describe('The AuthenticationService', () => {
    const authenticationService = new AuthenticationService();
    describe('when registering a user', () => {
        describe('if the email is already taken', () => {
            it('should throw an error', () => {
                const userData: UserDTO = {
                    name: 'Sachin Tendular',
                    email: 'srt@bcci.com',
                    password: 'srt123'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    findOne: () => Promise.resolve(userData)
                });
                expect(authenticationService.registerUser(userData))
                  .rejects.toMatchObject(new DuplicateUserException(userData.email));
            });
        });

        describe('if the email is not taken', () => {
            it('should not throw an error', () => {
                const userData: UserDTO = {
                    name: 'Sachin Tendular',
                    email: 'srt@bcci.com',
                    password: 'srt123'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    findOne: () => Promise.resolve(undefined),
                    create: () => ({
                        ...userData,
                        id: 0
                    }),
                    save: () => Promise.resolve()
                });
                expect(authenticationService.registerUser(userData))
                    .rejects.toMatchObject(new WrongCredentialsException());
            });
        });
    });

    describe('when authenticating a user', () => {
        describe('if the passwords do not match', () => {
            it('should throw an error', () => {
                const userData: UserDTO = {
                    name: 'Sachin Tendular',
                    email: 'srt@bcci.com',
                    password: 'srt123'
                };
                const incorrectUserData: UserDTO = {
                    name: 'Sachin Tendular',
                    email: 'srt@bcci.com',
                    password: 'srt123456'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    findOne: () => Promise.resolve(incorrectUserData)
                });
                expect(authenticationService.authenticateUser(userData))
                    .resolves.toBeDefined();
            });
        });

        describe('if the passwords match', () => {
            it('should not throw an error', () => {
                const userData: UserDTO = {
                    name: 'Sachin Tendular',
                    email: 'srt@bcci.com',
                    password: 'srt123'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    findOne: () => Promise.resolve(userData)
                });
                expect(authenticationService.authenticateUser(userData))
                    .resolves.toBeDefined();
            });
        });
    });
});
