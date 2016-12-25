import Restrictions from "./Restrictions";

/**
 *
 */
export default class Criteria <E> {

    /**
     *
     */
    dataList: E[];
    /**
     *
     * @type {Array}
     */
    restrictions: ((e: E) => boolean)[] = [];
    /**
     *
     * @type {Array}
     */
    sortings: ((list: E[]) => E[])[] = [];
    /**
     *
     * @type {number}
     */
    firstResult : number = 0;
    /**
     *
     * @type {number}
     */
    maxResults: number = 0;

    /**
     *
     * @param dataList
     */
    public constructor(dataList: E[]) {
        this.dataList = dataList;
    }

    /**
     *
     * @param restriction
     * @return {Criteria}
     */
    public add = (restriction: (e: E) => boolean): Criteria<E> => {
        if(restriction) {
            this.restrictions[this.restrictions.length] = restriction;
        }
        return this;
    };

    /**
     *
     * @param sorting
     * @return {Criteria}
     */
    public addOrder = (sorting: (list: E[]) => E[]): Criteria<E> => {
        if(sorting) {
            this.sortings[this.sortings.length] = sorting;
        }
        return this;
    };

    public setFirstResult = (firstResult: number): Criteria<E> => {
        this.firstResult = firstResult;
        return this;
    };

    public setMaxResults(maxResults: number): Criteria<E> {
        this.maxResults = maxResults;
        return this;
    }

    public list = <D, C>(): {data: D, totalCount: C} => {
        let dataArray = this.dataList;
        let first = this.firstResult;
        let last = this.firstResult + this.maxResults;
        if (last > dataArray.length) {
            last = dataArray.length;
        }

        let result;
        result = [];
        let andOperation: (e: E) => boolean = null;
        if (!this.restrictions || this.restrictions.length === 0) {
            andOperation = (): boolean => { return true; };
        } else if (this.restrictions.length === 1) {
            andOperation = this.restrictions[0];
        } else {
            andOperation = Restrictions.and.apply(undefined, this.restrictions);
        }
        let i = 0;
        for (; i < dataArray.length; i++) {
            let data = dataArray[i];
            if (andOperation(data)) {
                result.push(data);
            }
        }

        for (i = 0; i < this.sortings.length; i++) {
            result = this.sortings[i](result);
        }
        /** } **/
        if(last < dataArray.length && first < last) {
            return result.splice(first, last);
        }
        return result;
    }
}
