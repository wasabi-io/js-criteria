import Validation from "../util/Validation";
/**
 * Resrictions to constrain the results to be retrieved.
 */
class Restrictions {


    /**
     * @description evulates op and execute it.
     * @param {string} op
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    op(op: string, key: string, value: any): Function {
        return (data: Map): boolean => {
            if (typeof data[key] === "number") {
                return eval(data[key]+ op + value);
            }
            return eval("'" + data[key] + "'" + op + "'" +value + "'");
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
    __eq(key: string, value: any, caseSensitive: boolean): Function {
        return (data: Map): boolean => {
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
    eq(key: string, value: any, caseSensitive: boolean): Function {
        return this.__eq(key, value, caseSensitive);
    }

    /**
     * @description checks given value of data by key less then given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    lt(key: string, value: any): Function {
        return (data: Map): boolean => {
            return data[key] < value;
        };
    };

    /**
     * @description checks given value of data by key less then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    lte(key: string, value: any): Function {
        return (data: Map): boolean => {
            /* eslint-disable eqeqeq */
            console.log(data[key]);
            console.log(value);
            return data[key] <= value;
        };
    };

    /**
     * @description checks given value of data by key greater then given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    gt(key: string, value: any): Function {
        return (data: Map): boolean => {
            return data[key] > value;
        };
    };

    /**
     * @description checks given value of data by key greater then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {Function}
     */
    gte(key: string, value: any): Function {
        return (data: Map): boolean => {
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
    between(key: string, startValue: any, endValue: any): Function{
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
    __like(key: string, value: any, fromLeft: boolean, fromRight: boolean, caseSensitive: boolean): Function{
        return (data: Map): boolean => {
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
                return Validation.startsWith(propValue, value);
            } else if (fromRight) {
                return Validation.endsWith(propValue, value);
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
    __likeWithPercent(key: string, value: any, caseSensitive: boolean): Function{
        let fromLeft = Validation.endsWith(value, "%");
        let fromRight = Validation.startsWith(value, "%");
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
    startsWith(key: string, value: any, caseSensitive: boolean): Function {
        return this.__like(key, value, true, false, caseSensitive);
    }

    /**
     * @description checks given value of data by key endsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    endsWith(key: string, value: any, caseSensitive: boolean): Function {
        return this.__like(key, value, false, true, caseSensitive);
    }

    /**
     * @description checks given value of data by key contains given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    contains(key: string, value: any, caseSensitive: boolean): Function {
        return this.__like(key, value, true, true, caseSensitive);
    }

    /**
     * @description checks given value of data by key like given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {Function}
     */
    like(key: string, value: any, caseSensitive: boolean): Function {
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
    in(key: string, values: Array<any>, caseSensitive: boolean) : Function {
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
    isNull(key: string): Function {
        return (data: Map): boolean => {
            let propValue = data[key];
            return (propValue === undefined || propValue === null);
        };
    }

    /**
     * @description checks given value of data by key is not null.
     * @param {string} key
     * @returns {Function}
     */
    isNotNull(key: string): Function {
        return (data: Map): boolean => {
            return !(data[key] === undefined || data[key] === null);
        };
    }

    /**
     * @description checks given value of data by key is empty.
     * @param {string} key
     * @returns {Function}
     */
    isEmpty(key: string): Function {
        return (data: Map): boolean => {
            let propValue = data[key];
            return (propValue === undefined || propValue === null) || propValue === "";
        };
    }

    /**
     * @description checks given value of data by key is not empty.
     * @param {string} key
     * @returns {Function}
     */
    isNotEmpty(key: string): Function {
        return (data: Map): boolean => {
            let propValue = data[key];
            return !((propValue === undefined || propValue === null) || propValue === "");
        };
    }

    /**
     * @description joins Restrictions functions with or validation.
     * @param { ...Function }restrictions
     * @returns {Function}
     */
    or(...restrictions: Array<Function>): Function {
        return (data: Map): boolean => {
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
    and (...restrictions: Array<Function>): Function {
        return (data: Map): boolean => {

            let result = true;
            for (let i = 0; i < restrictions.length; i++) {
                result = result && restrictions[i](data);
            }

            return result;
        };
    }

}

export default new Restrictions();
