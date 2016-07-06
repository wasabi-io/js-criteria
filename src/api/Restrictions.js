import Validation from "../util/Validation";
/**
 * Resrictions to constrain the results to be retrieved.
 */
class Restrictions {

    /**
     *
     * @param {string} op
     * @param {string} key
     * @param {any} value
     * @returns {Function}
     */
    op(op: string, key: string, value: any) {
        return (data: Map): boolean => {
            if (typeof data[key] === "number") {
                console.log(data[key]+ op + value);
                return eval(data[key]+ op + value)
            }
            return eval("'" + data[key] + "'" + op + "'" +value + "'");
        };
    }
    /**
     *
     * @param {string} key
     * @param {any} value
     * @returns {Function}
     */
    gt = (key: string, value: any): Function => {
        return (data: Map): boolean => {
            return data[key] > value;
        };
    };

    /**
     *
     * @param {string} key
     * @param {any} value
     * @returns {Function}
     */
    lt = (key: string, value: any): Function => {
        return (data: Map): boolean => {
            return data[key] < value;
        };
    };

    /**
     *
     * @param {string} key
     * @param {any} value
     * @param {boolean} isILike
     * @returns {Function}
     * @private
     */
    __like = (key: string, value: any,isILike: boolean): Function => {
        let sw = Validation.startsWith(value, "%");
        let ew = Validation.endsWith(value, "%");
        let startIndex = sw ? 1 : 0;
        let endIndex = ew ? value.length - 1 : value.length;
        value = value.substring(startIndex, endIndex);
        return (data: Map): boolean => {
            let propValue = data[key];
            if (propValue && typeof propValue !== "string") {
                propValue = propValue.toString();
            }
            if (isILike) {
                value = value.toLocaleLowerCase();
                propValue = propValue.toLocaleLowerCase();
            }
            if (sw && ew) {
                return propValue.indexOf(value) > -1;
            } else if (sw) {
                return Validation.endsWith(propValue, value);
            } else if (ew) {
                return Validation.startsWith(propValue, value);
            }
            return propValue === value;
        };
    };

    /**
     *
     * @param {string} key
     * @param {any} value
     * @returns {Function}
     */
    like = (key: string, value: any): Function => {
        return this.__like(key, value, false);
    };

    /**
     *
     * @param {string} key
     * @param {Array<any>} values
     * @returns {Function}
     */
    in = (key: string, values: Array<any>) : Function => {
        let restrictions = [];
        for (let i = 0; i < values.length; i++) {
            restrictions[restrictions.length] = this.like(key, values[i]);
        }
        return this.or.apply(this, restrictions);
    }
    /**
     *
     * @param {string} key
     * @param {any} value
     * @returns {Function}
     */
    ilike = (key: string, value: any): Function => {
        return this.__like(key, value, true);
    };
    /**
     *
     * @param {string} key
     * @param {Array<any>} values
     * @returns {Function}
     */
    iin = (key: string, values: Array<any>) : Function => {
        let restrictions = [];
        for (let i = 0; i < values.length; i++) {
            restrictions[restrictions.length] = this.ilike(key, values[i]);
        }
        return this.or.apply(this, restrictions);
    }
    /**
     *
     * @param {string} key
     * @param {any} startValue
     * @param {any} endValue
     * @returns {Function}
     */
    between = (key: string, startValue: any, endValue: any): Function => {
        return (data: Map): boolean => {
            let propValue = data[key];
            return propValue >= startValue && propValue <= endValue;
        };
    }

    /**
     *
     * @param {string} key
     * @returns {Function}
     */
    isNull = (key: string): Function => {
        return (data: Map): boolean => {
            let propValue = data[key];
            return (propValue === undefined || propValue === null);
        };
    }
    /**
     *
     * @param {string} key
     * @returns {Function}
     */
    isNotNull = (key: string): Function => {
        return (data: Map): boolean => {
            return !(data[key] === undefined || data[key] === null);
        };
    }
    /**
     *
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
     *
     * @param {string} key
     * @returns {Function}
     */
    isNotEmpty = (key: string): Function => {
        return (data: Map): boolean => {
            let propValue = data[key];
            return !((propValue === undefined || propValue === null) || propValue === "");
        };
    }

    /**
     *
     * @param { ...Function }restrictions
     * @returns {Function}
     */
    or = (...restrictions: Array<Function>): Function => {
        return (data: Map): boolean => {
            let result = false;
            for (let i = 0; i < restrictions.length; i++) {
                result = result || restrictions[i](data);
            }
            return result;
        };
    }
    /**
     *
     * @param { ...Function }restrictions
     * @returns {Function}
     */
    and = (...restrictions: Array<Function>): Function => {
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
