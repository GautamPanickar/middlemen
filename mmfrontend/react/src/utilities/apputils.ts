import * as moment from 'moment';
import { Moment } from 'moment';
import SelectorOption from '../components/typings/selectoroption';

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
     * Returns a readable date in the format (February 1, 2019 12:22 PM)
     * @param {moment.Moment} date
     * @returns {string}
     */
    public static getReadableDate(date: Moment): string {
        return moment(date).format('lll');
    }

    /**
     * Returns the readable date without time February 1, 2019)
     * @param {moment.Moment} date
     * @returns {string}
     */
    public static getReadableDateWithoutTime(date: Moment): string {
        return moment(date).format('ll');
    }

    /**
     * Returns a formatted date string.
     * @param {string} format
     * @param {moment.Moment} date
     * @returns {string}
     */
    public static getFormattedDate(format: string, date: Moment): string {
        return moment(date).format(format);
    }

    /**
     * Checks if the given dates are same.
     * The granularity is limited to day, month and year.
     * Time is not considered.
     * @param {moment.Moment} date1
     * @param {moment.Moment} date2
     * @returns {boolean}
     */
    public static areSameDates(date1: Moment, date2: Moment): boolean {
        return date1.isSame(date2, 'day');
    }

    /**
     * Checks if date1 is after date2
     * The granularity is limited to day, month and year.
     * Time is not considered.
     * @param {moment.Moment} date1
     * @param {moment.Moment} date2
     * @returns {boolean}
     */
    public static isDateAfter(date1: Moment, date2: Moment): boolean {
        return date1.isAfter(date2, 'day');
    }

    /**
     * Maps the constants to Selector object.
     * @param constants 
     */
    public static mapConstantsToSelector(constants: string[]): SelectorOption[]  {
        let selectorOptions: SelectorOption[] = [];
        constants.map((item: string) => {
            selectorOptions.push({
                label: item,
                value: item
            });
        });
        return selectorOptions;
    }
}
