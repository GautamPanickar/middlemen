import * as typeorm from 'typeorm';
import CustomException from '../utils/exceptions/customexception';
import SubscriptionService from '../services/subscription/subscriptionservice';
import Subscription from '../types/subscription/subscription';
import SubscriptionDTO from 'dtos/subscription/susbcriptiondto';

(typeorm as any).getRepository = jest.fn();

describe('The SubscriptionService', () => {
    const subscriptionService = new SubscriptionService();
    describe('when finding subscriptions of user', () => {
        describe('if there is data', () => {
            it('should return a list', () => {
                const subscriptions: Subscription[] = [];
                (typeorm as any).getRepository.mockReturnValue({
                    find: () => Promise.resolve(subscriptions)
                });
                expect(subscriptionService.findSubscriptionsForUser('user1234'))
                    .resolves.toBeDefined();
            });
        });
    });

    describe('when finding a subscription', () => {
        describe('if there is data', () => {
            it('should return the subscription', () => {
                const subscription: Subscription = {
                    _id: 'userid123456',
                    email: 'synnefx@s.com',
                    activated: true,
                    details: undefined,
                    user_id: 'user1234'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    findById: () => Promise.resolve(subscription)
                });
                expect(subscriptionService.findById(subscription._id))
                    .resolves.toBeDefined();
            });
        });
    });

    describe('when saving/updating/activating or cancelling a subscription', () => {
        describe('if there is no validation error', () => {
            it('should not return an error', () => {
                const subscription: SubscriptionDTO = {
                    id: 'userid123456',
                    email: 'synnefx@s.com',
                    activated: false,
                    details: undefined,
                    user_id: 'user1234'
                };
                (typeorm as any).getRepository.mockReturnValue({
                    save: () => Promise.resolve(subscription)
                });
                expect(subscriptionService.saveSubscription(subscription))
                    .resolves.toBeDefined();
            });
        });
    });
});
