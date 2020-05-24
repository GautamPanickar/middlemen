import * as typeorm from 'typeorm';
import AppDetailsService from '../services/user/appdetailsservice';
import AppDetails from '../types/user/appdetails';

(typeorm as any).getRepository = jest.fn();

describe('The AppDetailsService', () => {
    const appDetailsService = new AppDetailsService();

    describe('when finding the details of an app', () => {
        describe('if there is data', () => {
            it('should return the details', async () => {
                const app: AppDetails = {
                    name: 'Middlemen',
                    code: 'APP-MID-5789',
                    subdomain: 'mm'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    find: () => Promise.resolve(app)
                });
                expect(appDetailsService.findByCode(app.code))
                    .resolves.toBeDefined();
            });
        });
    });

    describe('when saving/updating the details of the app', () => {
        describe('if there is no validation error', () => {
            it('should not return error', async () => {
                const app: AppDetails = {
                    name: 'Middlemen',
                    code: 'APP-MID-5789',
                    subdomain: 'mm'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    save: () => Promise.resolve(app)
                });
                expect(appDetailsService.saveAppDetails(app))
                    .resolves.toBeDefined();
            });
        });
    });
});
