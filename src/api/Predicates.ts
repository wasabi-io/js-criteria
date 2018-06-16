import Validations from "wasabi-common/lib/util/Validations";
import Strings from "wasabi-common/lib/types/Strings";
import Objects, {Props} from "wasabi-common/lib/types/Objects";

export interface Predicate {
    (data: Props<any>): boolean;
}

export interface PredicateMultiple {
    (predicates: Predicate[]): Predicate;
}

export interface CheckEquality {
    (leftValue: any, rightValue: any): boolean;
}

/**
 * Predicates to constrain the results to be retrieved.
 */
export default class Predicates {
    /**
     * @description evulates op and execute it.
     * @param {string} op
     * @param {string} key
     * @param {any} value
     * @return {Predicate}
     */
    public static op(key: string, op: string, value: any): Predicate {
        return (data: Props<any>): boolean => {
            if (typeof data[key] === "number") {
                return eval(data[key] + op + value);
            }
            const leftSide = Validations.isString(data[key]) ? "'" + data[key] + "'" : data[key];
            const rightSide = Validations.isString(value) ? "'" + value + "'" : value;
            return eval(leftSide + op + rightSide);
        };
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @param {CheckEquality} check
     * @return {Predicate}
     * @private
     */
    private static checkEquality(key: string, value: any, caseSensitive: boolean, check: CheckEquality): Predicate {
        return (data: Props<any>): boolean => {
            let propValue = data[key];
            if (propValue == null || value == null) {
                return propValue(propValue, value);
            }
            if (typeof propValue !== "string") {
                propValue = propValue.toString();
            }
            let equalValue: any = value;
            if (typeof equalValue !== "string") {
                equalValue = value.toString();
            }
            if (!caseSensitive) {
                equalValue = equalValue.toLocaleLowerCase();
                propValue = propValue.toLocaleLowerCase();
            }
            return check(propValue, equalValue);
        };
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @return {Predicate}
     */
    public static isTrue(key: string): Predicate {
        return (data: Props<any>): boolean => !!(data[key]) === true;
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @return {Predicate}
     */
    public static isFalse(key: string): Predicate {
        return (data: Props<any>): boolean => !!(data[key]) === false;
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @return {Predicate}
     */
    public static eq(key: string, value: any, caseSensitive?: boolean): Predicate {
        return this.checkEquality(key, value, caseSensitive, ((leftValue: any, rightValue: any) => leftValue === rightValue));
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @return {Predicate}
     */
    public static neq(key: string, value: any, caseSensitive?: boolean): Predicate {
        return this.checkEquality(key, value, caseSensitive, ((leftValue: any, rightValue: any) => leftValue !== rightValue));
    }

    /**
     * @description checks given value of data by key less then given value .
     * @param {string} key
     * @param {any} value
     * @return {Predicate}
     */
    public static lt(key: string, value: any): Predicate {
        return (data: Props<any>): boolean => data[key] < value;
    }

    /**
     * @description checks given value of data by key less then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {Predicate}
     */
    public static lte(key: string, value: any): Predicate {
        return (data: Props<any>): boolean => data[key] <= value;
    }

    /**
     * @description checks given value of data by key greater then given value .
     * @param {string} key
     * @param {any} value
     * @return {Predicate}
     */
    public static gt(key: string, value: any): Predicate {
        return (data: Props<any>): boolean => data[key] > value;
    }

    /**
     * @description checks given value of data by key greater then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {Predicate}
     */
    public static gte(key: string, value: any): Predicate {
        return (data: Props<any>): boolean => data[key] >= value;
    }

    /**
     * @description checks given value of data by key between given startValue and given endValue.
     * @param {string} key
     * @param {any} startValue
     * @param {any} endValue
     * @return {Predicate}
     */
    public static between(key: string, startValue: any, endValue: any): Predicate {
        let betweenStartValue = startValue;
        let betweenEndValue = endValue;
        if (betweenStartValue > betweenEndValue) {
            const temp = betweenStartValue;
            betweenStartValue = betweenEndValue;
            betweenEndValue = temp;
        }
        return Predicates.and(this.gte(key, betweenStartValue), this.lte(key, betweenEndValue));
    }

    /**
     *
     * @param data
     * @param key
     * @param value
     * @param fromLeft
     * @param fromRight
     * @param caseSensitive
     * @return {boolean}
     */
    public static checkLike(data: Props<any>, key: string, value: any, fromLeft: boolean, fromRight: boolean, caseSensitive?: boolean) {
        let propValue = data[key];
        if (propValue && typeof propValue !== "string") {
            propValue = propValue.toString();
        }
        let likeValue = value;
        if (!caseSensitive) {
            likeValue = likeValue.toLocaleLowerCase();
            propValue = propValue.toLocaleLowerCase();
        }

        if (fromLeft && fromRight) {
            return propValue.indexOf(likeValue) > -1;
        }

        if (fromLeft) {
            return Strings.startsWith(propValue, likeValue);
        }

        if (fromRight) {
            return Strings.endsWith(propValue, likeValue);
        }

        return Predicates.eq(key, likeValue, caseSensitive)(data);
    }

    /**
     * @description checks given value of data by key startsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Predicate}
     */
    public static startsWith(key: string, value: any, caseSensitive?: boolean): Predicate {
        return (data: Props<any>) => Predicates.checkLike(data, key, value, true, false, caseSensitive);
    }

    /**
     * @description checks given value of data by key endsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Predicate}
     */
    public static endsWith(key: string, value: any, caseSensitive?: boolean): Predicate {
        return (data: Props<any>) => Predicates.checkLike(data, key, value, false, true, caseSensitive);
    }

    /**
     * @description checks given value of data by key like given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Predicate}
     */
    public static like(key: string, value: any, caseSensitive?: boolean): Predicate {
        return (data: any) => Predicates.checkLike(data, key, value, true, true, caseSensitive);
    }

    /**
     * @description checks given value of data by key in given array values by caseSensitive parameter.
     * @param {string} key
     * @param { any[] } values
     * @param {boolean} caseSensitive
     * @returns {Predicate}
     */
    public static in(key: string, values: any[], caseSensitive?: boolean): Predicate {
        const predicates: Predicate[] = [];
        for (let i = 0; i < values.length; i = i + 1) {
            predicates[predicates.length] = this.eq(key, values[i], caseSensitive);
        }
        return Predicates.orOperation(predicates);
    }

    /**
     * @description checks given value of data by key in given array values by caseSensitive parameter.
     * @param {string} key
     * @param { any[] } values
     * @param {boolean} caseSensitive
     * @returns {Predicate}
     */
    public static likeIn(key: string, values: any[], caseSensitive?: boolean): Predicate {
        const predicates: Predicates[] = [];
        for (let i = 0; i < values.length; i = i + 1) {
            predicates[predicates.length] = this.like(key, values[i], caseSensitive);
        }
        return this.or.apply(this, predicates);
    }

    /**
     * @description checks given value of data by key is null.
     * @param {string} key
     * @returns {Predicate}
     */
    public static isNull(key: string): Predicate {
        return (data: any): boolean => {
            const propValue = data[key];
            return (propValue === undefined || propValue === null);
        };
    }

    /**
     * @description checks given value of data by key is not null.
     * @param {string} key
     * @returns {Predicate}
     */
    public static isNotNull(key: string): Predicate {
        return (data: any): boolean => {
            return !(data[key] === undefined || data[key] === null);
        };
    }

    /**
     * @description checks given value of data by key is empty.
     * @param {string} key
     * @returns {Predicate}
     */
    public static isEmpty(key: string): Predicate {
        return (data: any): boolean => {
            const propValue = data[key];
            return (propValue === undefined || propValue === null) || propValue === "";
        };
    }

    /**
     *
     * @param value
     * @param ignoreList
     * @return {(data:any)=>boolean}
     */
    public static query(value: string, ignoreList?: string[]): Predicate {
        const ignores = ignoreList || [];
        return (data: Props<any>): boolean => {
            let isSet = false;
            let result = false;
            Objects.forEach(data, (item: any, key: string) => {
                if (typeof item === "string" && ignores.indexOf(key) === -1) {
                    result = result || Predicates.checkLike(data, key, value, true, true);
                    isSet = true;
                }
            });
            return isSet ? result : true;
        };
    }

    /**
     * @description checks given value of data by key is not empty.
     * @param {string} key
     * @returns {Predicate}
     */
    public static isNotEmpty(key: string): Predicate {
        return (data: Props<any>): boolean => {
            const propValue = data[key];
            return !((propValue === undefined || propValue === null) || propValue === "");
        };
    }

    /**
     * @description joins Predicates functions with or validation.
     * @param { Predicate[] }predicates
     * @returns {Predicate}
     */
    public static or(...predicates: Predicate[]): Predicate {
        return Predicates.orOperation(predicates);
    }

    /**
     * @description joins Predicates functions with and validation.
     * @param { Predicate[] }predicates
     * @returns {Predicate}
     */
    public static and(...predicates: Predicate[]): Predicate {
        return Predicates.andOperation(predicates);
    }

    /**
     * @description joins Predicates functions with or validation.
     * @param { Predicate[] }predicates
     * @returns {Predicate}
     */
    public static orOperation(predicates: Predicate[]): Predicate {
        return (data: Props<any>): boolean => {
            let result = false;
            for (let i = 0; i < predicates.length; i = i + 1) {
                result = result || predicates[i](data);
            }
            return result;
        };
    }

    /**
     * @description joins Predicates functions with and validation.
     * @param { Predicate[] }predicates
     * @returns {Predicate}
     */
    public static andOperation(predicates: Predicate[]): Predicate {
        return (data: Props<any>): boolean => {
            let result = true;
            for (let i = 0; i < predicates.length; i = i + 1) {
                result = result && predicates[i](data);
            }
            return result;
        };
    }

}
