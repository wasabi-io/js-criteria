import Restrictions from "./Restrictions";

/**
 * Property Resrictions to constrain the results to be retrieved.
 */
export class PropertyRestrictions {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    /**
     * @description evulates op and execute it.
     * @param {string} op
     * @param {any} value
     * @return {(data: any) => boolean}
     */
    public op(op: string, value: any): (data: any) => boolean {
        return Restrictions.op(this.name, op, value);
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @return {Function}
     */
    public eq(value: any, caseSensitive?: boolean): (data: any) => boolean {
        return Restrictions.eq(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key less then given value .
     * @param {any} value
     * @return {Function}
     */
    public lt(value: any): (data: any) => boolean {
        return Restrictions.lt(this.name, value);
    }

    /**
     * @description checks given value of data by key less then or equals given value .
     * @param {any} value
     * @return {Function}
     */
    public lte(value: any): (data: any) => boolean {
        return Restrictions.lte(this.name, value);
    }

    /**
     * @description checks given value of data by key greater then given value .
     * @param {any} value
     * @return {Function}
     */
    public gt(value: any): (data: any) => boolean {
        return Restrictions.gt(this.name, value);
    }

    /**
     * @description checks given value of data by key greater then or equals given value .
     * @param {any} value
     * @return {Function}
     */
    public gte(value: any): (data: any) => boolean {
        return Restrictions.gte(this.name, value);
    }

    /**
     * @description checks given value of data by key between given startValue and given endValue.
     * @param {string} key
     * @param {any} startValue
     * @param {any} endValue
     * @return {Function}
     */
    public between(startValue: any, endValue: any): (data: any) => boolean {
        return Restrictions.between(this.name, startValue, endValue);
    }

    /**
     * @description checks given value of data by key startsWith given value by caseSensitive parameter.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public startsWith(value: any, caseSensitive?: boolean): (data: any) => boolean {
        return Restrictions.startsWith(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key endsWith given value by caseSensitive parameter.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public endsWith(value: any, caseSensitive?: boolean): (data: any) => boolean {
        return Restrictions.endsWith(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key contains given value by caseSensitive parameter.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public contains(value: any, caseSensitive?: boolean): (data: any) => boolean {
        return Restrictions.contains(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key like given value by caseSensitive parameter.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public like(value: any, caseSensitive?: boolean): (data: any) => boolean {
        return Restrictions.like(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key in given array values by caseSensitive parameter.
     * @param {string} key
     * @param {Array<any>} values
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public in(values: any[], caseSensitive?: boolean): (data: any) => boolean {
        return Restrictions.in(this.name, values, caseSensitive);
    }

    /**
     * @description checks given value of data by key is null.
     * @returns {Function}
     */
    public isNull(): (data: any) => boolean {
        return Restrictions.isNull(this.name);
    }

    /**
     * @description checks given value of data by key is not null.
     * @returns {Function}
     */
    public isNotNull(): (data: any) => boolean {
        return Restrictions.isNotNull(this.name);
    }

    /**
     * @description checks given value of data by key is empty.
     * @returns {Function}
     */
    public isEmpty(): (data: any) => boolean {
        return Restrictions.isEmpty(this.name);
    }

    /**
     * @description checks given value of data by key is not empty.
     * @returns {Function}
     */
    public isNotEmpty(): (data: any) => boolean {
        return Restrictions.isNotEmpty(this.name);
    }
}

/**
 * Provide to create restriction by select key of data.
 */
export default class Property {
    /**
     * method keep key and return some restrictions to apply the data by given key.
     * @param name
     * @return {PropertyRestrictions}
     */
    static forName(name: string): PropertyRestrictions {
        return new PropertyRestrictions(name);
    }
}
