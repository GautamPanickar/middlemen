interface SubscriptionDetailsDTO {
    plan: number;
    status: number;
    cancelledOn?: string;
    nextBillingOn?: string;
    startedOn: string;
    previousPlan?: number;
}

export default SubscriptionDetailsDTO;