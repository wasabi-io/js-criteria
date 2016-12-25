import Types from "../util/Types";
import Strings from "../util/Strings";
/**
 * Resrictions to constrain the results to be retrieved.
 */
class Restrictions {
    /**
     * @description evulates op and execute it.
     * @param {string} op
     * @param {string} key
     * @param {any} value
     * @return {(data: any) => boolean}
     */
    public static op(key: string, op: string, value: any): (data: any) => boolean {
        return (data: any): boolean => {
            if (typeof data[key] === "number") {
                return eval(data[key]+ op + value);
            }
            let leftSide = Types.isString(data[key]) ? "'" + data[key] + "'": data[key];
            let rightSide = Types.isString(value) ? "'" + value + "'": value;
            let result = eval(leftSide + op + rightSide );
            return result;
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
    private static __eq(key: string, value: any, caseSensitive: boolean): (data: any) => boolean {
        return (data: any): boolean => {
            let propValue = data[key];
            if (propValue && typeof propValue !== "string") {
                propValue = propValue.toString();
            }
            if (value && typeof value !== "string") {
                value = value.toString();
            }
            if (!caseSensitive) {
                if(value) {
                    value = value.toLocaleLowerCase();
                }
                if(propValue){
                    propValue = propValue.toLocaleLowerCase();
                }
            }
            return propValue === value;
        };
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @return {Function}
     */
    public static eq(key: string, value: any, caseSensitive?: boolean): (data: any) => boolean {
        return this.__eq(key, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key less then given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    public static lt(key: string, value: any): (data: any) => boolean {
        return (data: any): boolean => {
            return data[key] < value;
        };
    };

    /**
     * @description checks given value of data by key less then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    public static lte(key: string, value: any): (data: any) => boolean {
        return (data: any): boolean => {
            return data[key] <= value;
        };
    };

    /**
     * @description checks given value of data by key greater then given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    public static gt(key: string, value: any): (data: any) => boolean {
        return (data: any): boolean => {
            return data[key] > value;
        };
    };

    /**
     * @description checks given value of data by key greater then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    public static gte(key: string, value: any): (data: any) => boolean {
        return (data: any): boolean => {
            return data[key] >= value;
        };
    };

    /**
     * @description checks given value of data by key between given startValue and given endValue.
     * @param {string} key
     * @param {any} startValue
     * @param {any} endValue
     * @return {Function}
     */
    public static between(key: string, startValue: any, endValue: any): (data: any) => boolean{
        if(startValue > endValue) {
            let temp = startValue;
            startValue = endValue;
            endValue = temp;
        }
        let funcArray = [this.gte(key, startValue), this.lte(key, endValue)];
        return this.and.apply(this, funcArray);
    }

    /**
     * @description checks given value of data by key like given value by  fromLeft and fromRight parameters.
     * @param {string} key
     * @param {any} value
     * @param {boolean} fromLeft
     * @param {boolean} fromRight
     * @param {boolean} caseSensitive
     * @returns {Function}
     * @private
     */
    private static __like(key: string, value: any, fromLeft: boolean, fromRight: boolean, caseSensitive: boolean): (data: any) => boolean{
        return (data: any): boolean => {
            let propValue = data[key];
            if (propValue && typeof propValue !== "string") {
                propValue = propValue.toString();
            }
            if (!caseSensitive) {
                value = value.toLocaleLowerCase();
                propValue = propValue.toLocaleLowerCase();
            }

            if (fromLeft && fromRight) {
                return propValue.indexOf(value) > -1;
            } else if (fromLeft) {
                return Strings.startsWith(propValue, value);
            } else if (fromRight) {
                return Strings.endsWith(propValue, value);
            } else {
                return this.__eq(key, value, caseSensitive)(data);
            }


        };
    }

    /**
     * @description checks given value of data by key like given value by percent (%) charachter like sql `like`.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     * @private
     */
    public static __likeWithPercent(key: string, value: any, caseSensitive: boolean): (data: any) => boolean{
        let fromLeft = Strings.endsWith(value, "%");
        let fromRight = Strings.startsWith(value, "%");
        let startIndex = fromRight ? 1 : 0;
        let endIndex = fromLeft ? value.length - 1 : value.length;
        value = value.substring(startIndex, endIndex);
        return this.__like(key, value, fromLeft, fromRight, caseSensitive);
    }

    /**
     * @description checks given value of data by key startsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static startsWith(key: string, value: any, caseSensitive?: boolean): (data: any) => boolean {
        return this.__like(key, value, true, false, caseSensitive);
    }

    /**
     * @description checks given value of data by key endsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static endsWith(key: string, value: any, caseSensitive?: boolean): (data: any) => boolean {
        return this.__like(key, value, false, true, caseSensitive);
    }

    /**
     * @description checks given value of data by key contains given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static contains(key: string, value: any, caseSensitive?: boolean): (data: any) => boolean {
        return this.__like(key, value, true, true, caseSensitive);
    }

    /**
     * @description checks given value of data by key like given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    public static like(key: string, value: any, caseSensitive?: boolean): (data: any) => boolean {
        return this.__likeWithPercent(key, value, caseSensitive);
    };

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
    public static in(key: string, values: Array<any>, caseSensitive?: boolean) : (data: any) => boolean {
        let restrictions = [];
        for (let i = 0; i < values.length; i++) {
            restrictions[restrictions.length] = this.eq(key, values[i], caseSensitive);
        }
        return this.or.apply(this, restrictions);
    }

    /**
     * @description checks given value of data by key is null.
     * @param {string} key
     * @returns {Function}
     */
    public static isNull(key: string): (data: any) => boolean {
        return (data: any): boolean => {
            let propValue = data[key];
            return (propValue === undefined || propValue === null);
        };
    }

    /**
     * @description checks given value of data by key is not null.
     * @param {string} key
     * @returns {Function}
     */
    public static isNotNull(key: string): (data: any) => boolean {
        return (data: any): boolean => {
            return !(data[key] === undefined || data[key] === null);
        };
    }

    /**
     * @description checks given value of data by key is empty.
     * @param {string} key
     * @returns {Function}
     */
    public static isEmpty(key: string): (data: any) => boolean {
        return (data: any): boolean => {
            let propValue = data[key];
            return (propValue === undefined || propValue === null) || propValue === "";
        };
    }

    /**
     * @description checks given value of data by key is not empty.
     * @param {string} key
     * @returns {Function}
     */
    public static isNotEmpty(key: string): (data: any) => boolean {
        return (data: any): boolean => {
            let propValue = data[key];
            return !((propValue === undefined || propValue === null) || propValue === "");
        };
    }

    /**
     * @description joins Restrictions functions with or validation.
     * @param { ...Function }restrictions
     * @returns {Function}
     */
    public static or(...restrictions: ((data: any) => boolean)[]): (data: any) => boolean {
        return (data: any): boolean => {
            let result = false;
            for (let i = 0; i < restrictions.length; i++) {
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
    public static and (...restrictions: ((data: any) => boolean)[]): (data: any) => boolean {
        return (data: any): boolean => {
            let result = true;
            for (let i = 0; i < restrictions.length; i++) {
                result = result && restrictions[i](data);
            }
            return result;
        };
    }

}

export default Restrictions;

