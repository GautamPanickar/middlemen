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
     * Returns if the 2 strings are equal ignoring case.
     * @param {string} a
     * @param {string} b
     * @returns {boolean}
     */
    public static areEqualIgnoringCase(a: string, b: string): boolean {
        return a.toUpperCase() === b.toUpperCase();
    }
}
