import * as typeorm from 'typeorm';
import CustomException from '../utils/exceptions/customexception';
import SubscriptionService from '../services/subscription/subscriptionservice';
import Subscription from '../types/subscription/subscription';
import SubscriptionDTO from '../dtos/subscription/susbcriptiondto';
import PlanDTO from '../dtos/subscription/plandto';
import SubscriptionManager from '../managers/subscriptionmanager';

(typeorm as any).getRepository = jest.fn();

describe('The SubscriptionService', () => {
    const subscriptionService = new SubscriptionService();
    const subscriptionManager = new SubscriptionManager();
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

    describe('when saving/updating a subscription plan', () => {
        describe('if there is a validation error', () => {
            it('should return an error', async () => {
                const plan: PlanDTO = {
                    name: '',
                    features: undefined,
                    description: 'Sample Description',
                    price: 0,
                    active: true
                };
                (typeorm as any).getRepository.mockReturnValue({
                    save: () => Promise.resolve(plan)
                });
                try {
                    const savedPlan = await subscriptionManager.savePlan(plan);
                } catch (error) {
                    expect(error).toMatchObject(new CustomException('Name of the plan cannot be empty,App details should be provided,Features of the plan cannot be empty'));
                }
            });
        });

        describe('if there are no validation errors', () => {
            it('should not return an error', () => {
                const plan: PlanDTO = {
                    app_id: 'APP_ID_009',
                    name: 'PLAN 1',
                    features: ['Feature 1', 'Feature 2'],
                    description: 'Plan 1 Description',
                    price: 0,
                    active: true
                };
                (typeorm as any).getRepository.mockReturnValue({
                    save: () => Promise.resolve(plan)
                });
                expect(subscriptionManager.savePlan(plan))
                    .resolves.toBeDefined();
            });
        });
    });
});
