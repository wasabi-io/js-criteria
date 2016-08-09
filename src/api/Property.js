import Binder from "../util/Binder";
import Restrictions from "./Restrictions";

class PropertyRestriction extends Binder{
    __key;
    constructor(key: string) {
        super();
        this.__key = key;
    }
    /**
     *
     * @param {string} op
     * @param {any} value
     * @returns {Function}
     */
    op(op: string, value: any): Function {
        return Restrictions.op(op, this.__key, value);
    }
    /**
     *
     * @param {any} value
     * @returns {Function}
     */
    gt(value: any): Function {
        return Restrictions.gt(this.__key, value);
    };

    /**
     * @param {any} value
     * @returns {Function}
     */
    lt(value: any): Function {
        return Restrictions.lt(this.__key, value);
    };

    /**
     * @param {any} value
     * @returns {Function}
     */
    like(value: any): Function {
        return Restrictions.like(this.__key, value);
    };

    /**
     * @param {Array<any>} values
     * @returns {Function}
     */
    in(values: Array<any>) : Function {
        return Restrictions.in(this.__key, values);
    }
    /**
     * @param {any} value
     * @returns {Function}
     */
    ilike(value: any): Function {
        return Restrictions.ilike(this.__key, value);
    };
    /**
     * @param {Array<any>} values
     * @returns {Function}
     */
    iin(values: Array<any>) : Function{
        return Restrictions.iin(this.__key, values);
    }
    /**
     * @param {any} startValue
     * @param {any} endValue
     * @returns {Function}
     */
    between(startValue: any, endValue: any): Function{
        return Restrictions.between(this.__key, startValue, endValue);
    }

    /**
     * @returns {Function}
     */
    isNull(): Function {
        return Restrictions.isNull(this.__key);
    }
    /**
     * @returns {Function}
     */
    isNotNull(): Function {
        return Restrictions.isNotNull(this.__key);
    }
    /**
     *
     * @param {string} key
     * @returns {Function}
     */
    isEmpty(): Function {
        return Restrictions.isEmpty(this.__key);
    }
    /**
     *
     * @param {string} key
     * @returns {Function}
     */
    isNotEmpty(): Function {
        return Restrictions.isNotEmpty(this.__key);
    }
}
class Property {
    forName(name: string): PropertyRestriction {
        return new PropertyRestriction(name);
    }
}

export default new Property();