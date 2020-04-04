interface BreadcrumbItem {
    ukey: string;
    name: string;
    parent: BreadcrumbItem;
    active?: boolean;
}

export default BreadcrumbItem;
