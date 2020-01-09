import { AddressDTO } from './addressdto';
import SubscriptionDTO from 'dtos/subscription/susbcriptiondto';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  activated: boolean;
  activationKey: string;
  resetKey: string;
  contactAddress?: AddressDTO;
  billingAddress?: AddressDTO;
  newSubscription?: SubscriptionDTO;
  subscriptions?: SubscriptionDTO[];
}
