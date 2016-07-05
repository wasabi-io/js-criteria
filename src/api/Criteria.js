import Restrictions from "./Restrictions";

class Criteria {

    __mapArray;
    __firstResult = 0;
    __maxResult ;
    __restrictions = [];
    __order = [];

    constructor(mapArray: Array<Map>) {
        this.__mapArray = mapArray;
        this.__maxResult = mapArray.length;
    }

    getFirstResult(): number {
        return this.__firstResult;
    }
    getMaxResult(): number  {
        return this.__maxResult;
    }
    getRestrictions(): Array<Function> {
        return this.__restrictions;
    }

    add(restriction: Function) {
        this.__restrictions.push(restriction);
    }

    addOrder(order: Function) {
        this.__order.push(order);
    }

    setFirstResult(first: number) {
        this.__firstResult = first - 1;
    }
    setMaxResults(max: number) {
        this.__maxResult = max;
    }

    list(): any {
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
            let i;
            for (i = 0; i < dataArray.length; i++) {
                let data = dataArray[i];
                let isDataAdded = true;
                if (this.__restrictions.length > 0) {
                    if (!Restrictions.and.apply(null, this.__restrictions)(data)) {
                        isDataAdded = false;
                    }
                }
                if (isDataAdded) {
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
