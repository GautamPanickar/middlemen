import { AddressDTO } from './addressdto';
import SubscriptionDTO from 'dtos/subscription/susbcriptiondto';
import AuthorityDTO from './authoritydto';

export interface UserDTO {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  activated?: boolean;
  activationKey?: string;
  resetKey?: string;
  contactAddress?: AddressDTO;
  billingAddress?: AddressDTO;
  newSubscription?: SubscriptionDTO;
  subscriptions?: SubscriptionDTO[];
  authorities?: AuthorityDTO[];
  company?: string;
  gstNumber?: string;
  companyId?: string;
}
