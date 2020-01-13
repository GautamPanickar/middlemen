export class AppUtils {
    /**
     * Retruns if the string value is empty or not.
     * @param {string} value
     * @returns {boolean}
     */
    public static isEmpty(value: string): boolean {
        return value === undefined || value === null || value === '' || value.trim() === '';
    }

    /**
     * Retruns if the string value is not empty or not.
     * @param {string} value
     * @returns {boolean}
     */
    public static isNotEmpty(value: string): boolean {
        return !AppUtils.isEmpty(value);
    }

    /**
     * Checks if the given number value is valid or not.
     * @param {number} value
     * @returns {boolean}
     */
    public static isValid(value: number): boolean {
        return value !== null && value > 0;
    }

    /**
     * Returns the amount in the smallest unit. For Indian rupee it is paisa.
     * @param {number} amount
     * @returns {number}
     */
    public static getAmountInSmallestUnit(amount: number): number {
        return amount ? amount * 100 : 0;
    }

    /**
     * Returns a random receipt id.
     * @returns {string}
     */
    public static get randomReceiptId(): string {
        return 'receipt-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
    }

    /**
     * Returns if the 2 strings are equal ignoring case.
     * @param {string} a
     * @param {string} b
     * @returns {boolean}
     */
    public static areEqualIgnoringCase(a: string, b: string): boolean {
        return a.toUpperCase() === b.toUpperCase();
    }

    /**
     * Returns a unique company id.
     * @returns {string}
     */
    public static get uniqueCompanyId(): string {
        return 'COM-' + Math.random().toString(36).substr(2, 9) + '-' + Math.floor(1000 + Math.random() * 9000);
    }
}
