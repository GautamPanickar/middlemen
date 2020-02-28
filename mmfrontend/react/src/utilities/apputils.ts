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

    /**
     * Returns true if date1 comes after date2
     * @param date1 
     * @param date2 
     */
    public static isDateAfter(date1: Date, date2: Date): boolean {
        return date1 > date2;
    }

    /**
     * Returns true if both the dates are the same. Comopared on day, no time is considered.
     * @param date1 
     * @param date2 
     */
    public static areSameDates(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear()
            &&  date1.getMonth() === date2.getMonth() 
            &&  date1.getDay() === date2.getDay();
    }
}
