interface Plan {
    _id?: string;
    app_id?: string;
    code?: string;
    name: string;
    description: string;
    features: string[];
    price: number;
    active: boolean;
    createdBy?: string;
    updatedBy?: string;
}

export default Plan;
