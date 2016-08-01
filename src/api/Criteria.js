import Restrictions from "./Restrictions";

/**
 * Criteria Class to provide query on json data
 */
class Criteria {


    /**
     * Given map array
     * @type {Array<Map>}
     * @private
     */
    __mapArray: Array<Map>;
    /**
     *
     * @type {number}
     * @private
     */
    __firstResult: number = 0;
    /**
     *
     * @type {number}
     * @private
     */
    __maxResult: number ;
    /**
     *
     * @type {Array<Function>}
     * @private
     */
    __restrictions: Array<Function> = [];
    /**
     *
     * @type {Array<Function>}
     * @private
     */
    __order: Array<Function> = [];

    __aliases: {};
    /**
     *
     * @param {Array<Map>} mapArray
     */
    constructor(mapArray: Array<Map>) {
        this.__mapArray = mapArray;
        this.__maxResult = mapArray.length;
    }

    /**
     * @param name
     * @param alias
     */
    createAlias (name: string, alias: string) {
        this.__aliases[name] = alias;
    }
    /**
     *
     * @returns {number}
     */
    getFirstResult (): number {
        return this.__firstResult;
    }

    /**
     *
     * @returns {number}
     */
    getMaxResult (): number {
        return this.__maxResult;
    }

    /**
     *
     * @returns {Array<Function>}
     */
    getRestrictions (): Array<Function> {
        return this.__restrictions;
    }

    /**
     *
     * @param {Function} restriction
     */
    add (restriction: Function) {
        this.__restrictions.push(restriction);
    }

    /**
     *
     * @param {Function} order
     */
    addOrder (order: Function) {
        this.__order.push(order);
    }

    /**
     *
     * @param {number} first
     */
    setFirstResult (first: number) {
        this.__firstResult = first - 1;
    }

    /**
     *
     * @param {number} max
     */
    setMaxResults (max: number) {
        this.__maxResult = max;
    }

    /**
     *
     * @return {any}
     */
    list (): any {
        let dataArray = this.__mapArray;
        let first = this.__firstResult;
        let last = this.__firstResult + this.__maxResult;
        if (last > dataArray.length) {
            last = dataArray.length;
        }
        let result;
        /**
        if (this.__projections.length > 0 ) {
            result = 0;
            for (let i = first; i < last; i++) {
                let data = dataArray[i];
                if (Restrictions.and(this.__restrictions)(data)) {
                    result = result + 1;
                }
            }
        } else {
        **/
        result = [];
        let andOperation = null;
        if(!this.__restrictions || this.__restrictions === 0 ) {
            andOperation = (): boolean => { return true; };
        } else if( this.__restrictions.length === 1 ){
            andOperation = this.__restrictions[0];
        } else {
            andOperation = Restrictions.and.apply(Restrictions, this.__restrictions);
        }
        let i = 0;
        for (; i < dataArray.length; i++) {
            let data = dataArray[i];
            if (andOperation(data)) {
                result.push(data);
            }
        }

        for (i = 0; i < this.__order.length; i++) {
            result = this.__order[i](result);
        }

        result = result.slice(first, last);
        /** } **/
        return result;
    }
}
export default Criteria;
