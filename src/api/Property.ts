import Restrictions, {RestrictionItem} from "./Restrictions";

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
     * @return {RestrictionItem}
     */
    public op(op: string, value: any): RestrictionItem {
        return Restrictions.op(this.name, op, value);
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @return {RestrictionItem}
     */
    public eq(value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.eq(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key less then given value .
     * @param {any} value
     * @return {RestrictionItem}
     */
    public lt(value: any): RestrictionItem {
        return Restrictions.lt(this.name, value);
    }

    /**
     * @description checks given value of data by key less then or equals given value .
     * @param {any} value
     * @return {RestrictionItem}
     */
    public lte(value: any): RestrictionItem {
        return Restrictions.lte(this.name, value);
    }

    /**
     * @description checks given value of data by key greater then given value .
     * @param {any} value
     * @return {RestrictionItem}
     */
    public gt(value: any): RestrictionItem {
        return Restrictions.gt(this.name, value);
    }

    /**
     * @description checks given value of data by key greater then or equals given value .
     * @param {any} value
     * @return {RestrictionItem}
     */
    public gte(value: any): RestrictionItem {
        return Restrictions.gte(this.name, value);
    }

    /**
     * @description checks given value of data by key between given startValue and given endValue.
     * @param {any} startValue
     * @param {any} endValue
     * @return {RestrictionItem}
     */
    public between(startValue: any, endValue: any): RestrictionItem {
        return Restrictions.between(this.name, startValue, endValue);
    }

    /**
     * @description checks given value of data by key startsWith given value by caseSensitive parameter.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public startsWith(value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.startsWith(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key endsWith given value by caseSensitive parameter.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public endsWith(value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.endsWith(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key like given value by caseSensitive parameter.
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public like(value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.like(this.name, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key in given array values by caseSensitive parameter.
     * @param {any[]} values
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public in(values: any[], caseSensitive?: boolean): RestrictionItem {
        return Restrictions.in(this.name, values, caseSensitive);
    }

    /**
     * @description checks given value of data by key is null.
     * @returns {RestrictionItem}
     */
    public isNull(): RestrictionItem {
        return Restrictions.isNull(this.name);
    }

    /**
     * @description checks given value of data by key is not null.
     * @returns {RestrictionItem}
     */
    public isNotNull(): RestrictionItem {
        return Restrictions.isNotNull(this.name);
    }

    /**
     * @description checks given value of data by key is empty.
     * @returns {RestrictionItem}
     */
    public isEmpty(): RestrictionItem {
        return Restrictions.isEmpty(this.name);
    }

    /**
     * @description checks given value of data by key is not empty.
     * @returns {RestrictionItem}
     */
    public isNotEmpty(): RestrictionItem {
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
