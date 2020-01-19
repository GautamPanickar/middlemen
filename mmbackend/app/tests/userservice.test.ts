import * as typeorm from 'typeorm';
import UserService from '../services/user/userservice';
import User from '../types/user/user';
import UserManager from '../managers/usermanager';
import { UserDTO } from '../dtos/user/userdto';
import CustomException from '../utils/exceptions/customexception';

(typeorm as any).getRepository = jest.fn();

describe('The UserService', () => {
    const userService = new UserService();
    const userManager = new UserManager();
    describe('when finding all users', () => {
        describe('if there is data', () => {
            it('should return a list', () => {
                const userList: User[] = [];
                (typeorm as any).getRepository.mockReturnValue({
                    find: () => Promise.resolve(userList)
                });
                expect(userService.findAllUsers())
                    .resolves.toBeDefined();
            });
        });
    });

    describe('when finding a user', () => {
        describe('if there is data', () => {
            it('should return a single user', () => {
                const user: User = {_id: 'userid123456'};
                (typeorm as any).getRepository.mockReturnValue({
                    findById: () => Promise.resolve(user)
                });
                expect(userService.findById(user._id))
                    .resolves.toBeDefined();
            });
        });
    });

    describe('when saving/updating a user', () => {
        describe('if there is validation error', () => {
            it('should return error', () => {
                const userData: UserDTO = {
                    name: 'Sachin Tendular',
                    email: 'srt@bcci.com'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    save: () => Promise.resolve(undefined)
                });
                expect(userManager.updateUser(userData))
                    .rejects.toMatchObject(new CustomException('Validation error while updating user', []));
            });
        });
    });

    describe('if there is no validation error', () => {
        it('should not return error', () => {
            const userData: UserDTO = {
                name: 'Sachin Tendular',
                email: 'srt@bcci.com',
                contactAddress: {
                    line1: 'BB Tanta',
                    country: 'India',
                    state: 'Kerala',
                    phone: '8758875887'
                },
                billingAddress: {
                    line1: 'BB Tanta',
                    country: 'India',
                    state: 'Kerala',
                    phone: '8758875887'
                }
            };
            (typeorm as any).getRepository.mockReturnValue({
                save: () => Promise.resolve(userData)
            });
            expect(userManager.updateUser(userData))
                .resolves.toBeDefined();
        });
    });
});
