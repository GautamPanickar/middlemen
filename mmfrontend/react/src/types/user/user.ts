import { Address } from './address';
import Subscription from './subscription';
import { Authority } from './authority';

export interface User {
    _id?: string;
    name?: string;
    email: string;
    password?: string;
    activated?: boolean;
    activationKey?: string;
    resetKey?: string;
    contactAddress?: Address;
    billingAddress?: Address;
    newSubscription?: Subscription;
    subscriptions?: Subscription[];
    authorities?: Authority[];
    gstNumber?: string;
    company?: string;    
    companyId?: string;
  }