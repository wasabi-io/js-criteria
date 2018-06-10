import Validations from "wasabi-common/lib/util/Validations";
import Strings from "wasabi-common/lib/types/Strings";
import Objects, {Props} from "wasabi-common/lib/types/Objects";

export interface Predicate {
    (data: Props<any>): boolean;
}

/**
 * Resrictions to constrain the results to be retrieved.
 */
export default class Restrictions {
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
     * @return {Function}
     * @private
     */
    private static equal(key: string, value: any, caseSensitive: boolean): Predicate {
        return (data: Props<any>): boolean => {
            let propValue = data[key];
            if (propValue == null || value == null) {
                return propValue === value;
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
            return propValue === equalValue;
        };
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @return {Function}
     */
    public static eq(key: string, value: any, caseSensitive?: boolean): Predicate {
        return this.equal(key, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key less then given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    public static lt(key: string, value: any): (data: Props<any>) => boolean {
        return (data: Props<any>): boolean => {
            return data[key] < value;
        };
    }

    /**
     * @description checks given value of data by key less then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    public static lte(key: string, value: any): Predicate {
        return (data: Props<any>): boolean => {
            return data[key] <= value;
        };
    }

    /**
     * @description checks given value of data by key greater then given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    public static gt(key: string, value: any): Predicate {
        return (data: Props<any>): boolean => {
            return data[key] > value;
        };
    }

    /**
     * @description checks given value of data by key greater then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    public static gte(key: string, value: any): Predicate {
        return (data: Props<any>): boolean => {
            return data[key] >= value;
        };
    }

    /**
     * @description checks given value of data by key between given startValue and given endValue.
     * @param {string} key
     * @param {any} startValue
     * @param {any} endValue
     * @return {Function}
     */
    public static between(key: string, startValue: any, endValue: any): Predicate {
        let betweenStartValue = startValue;
        let betweenEndValue = endValue;
        if (betweenStartValue > betweenEndValue) {
            const temp = betweenStartValue;
            betweenStartValue = betweenEndValue;
            betweenEndValue = temp;
        }
        return this.and.apply(this, [this.gte(key, betweenStartValue), this.lte(key, betweenEndValue)]);
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
    private static checkLike(data: Props<any>, key: string, value: any, fromLeft: boolean, fromRight: boolean, caseSensitive?: boolean) {
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

        return this.equal(key, likeValue, caseSensitive)(data);
    }

    /**
     * @description checks given value of data by key like given value by percent (%) charachter like sql `like`.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     * @private
     */
    public static likeWithPercent(key: string, value: any, caseSensitive: boolean): Predicate {
        const fromLeft = Strings.endsWith(value, "%");
        const fromRight = Strings.startsWith(value, "%");
        const startIndex = fromRight ? 1 : 0;
        const endIndex = fromLeft ? value.length - 1 : value.length;
        const likeValue = value.substring(startIndex, endIndex);
        return (data: Props<any>) => {
            return Restrictions.checkLike(data, key, likeValue, fromLeft, fromRight, caseSensitive);
        };
    }

    /**
     * @description checks given value of data by key startsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static startsWith(key: string, value: any, caseSensitive?: boolean): Predicate {
        return (data: Props<any>) => {
            return Restrictions.checkLike(data, key, value, true, false, caseSensitive);
        };
    }

    /**
     * @description checks given value of data by key endsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static endsWith(key: string, value: any, caseSensitive?: boolean): Predicate {
        return (data: Props<any>) => {
            return Restrictions.checkLike(data, key, value, false, true, caseSensitive);
        };
    }

    /**
     * @description checks given value of data by key contains given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static contains(key: string, value: any, caseSensitive?: boolean): Predicate {
        return (data: any) => {
            return Restrictions.checkLike(data, key, value, true, true, caseSensitive);
        };
    }

    /**
     * @description checks given value of data by key like given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static like(key: string, value: any, caseSensitive?: boolean): Predicate {
        return this.likeWithPercent(key, value, caseSensitive);
    }

    /**
     *
     * @description @param {string} key
     * @param {Array<any>} values
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    /**
     * @description checks given value of data by key in given array values by caseSensitive parameter.
     * @param {string} key
     * @param {Array<any>} values
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static in(key: string, values: any[], caseSensitive?: boolean): Predicate {
        const restrictions: Restrictions[] = [];
        for (let i = 0; i < values.length; i = i + 1) {
            restrictions[restrictions.length] = this.eq(key, values[i], caseSensitive);
        }
        return this.or.apply(this, restrictions);
    }

    /**
     * @description checks given value of data by key is null.
     * @param {string} key
     * @returns {Function}
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
     * @returns {Function}
     */
    public static isNotNull(key: string): Predicate {
        return (data: any): boolean => {
            return !(data[key] === undefined || data[key] === null);
        };
    }

    /**
     * @description checks given value of data by key is empty.
     * @param {string} key
     * @returns {Function}
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
                    result = result || Restrictions.checkLike(data, key, value, true, true);
                    isSet = true;
                }
            });
            return isSet ? result : true;
        };
    }

    /**
     * @description checks given value of data by key is not empty.
     * @param {string} key
     * @returns {Function}
     */
    public static isNotEmpty(key: string): (data: Props<any>) => boolean {
        return (data: Props<any>): boolean => {
            const propValue = data[key];
            return !((propValue === undefined || propValue === null) || propValue === "");
        };
    }

    /**
     * @description joins Restrictions functions with or validation.
     * @param { ...Function }restrictions
     * @returns {Function}
     */
    public static or(...restrictions: ((data: Props<any>) => boolean)[]): (data: Props<any>) => boolean {
        return (data: Props<any>): boolean => {
            let result = false;
            for (let i = 0; i < restrictions.length; i = i + 1) {
                result = result || restrictions[i](data);
            }
            return result;
        };
    }

    /**
     * @description joins Restrictions functions with and validation.
     * @param { ...Function }restrictions
     * @returns {Function}
     */
    public static and(...restrictions: ((data: Props<any>) => boolean)[]): (data: Props<any>) => boolean {
        return (data: Props<any>): boolean => {
            let result = true;
            for (let i = 0; i < restrictions.length; i = i + 1) {
                result = result && restrictions[i](data);
            }
            return result;
        };
    }

}

