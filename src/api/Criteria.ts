import Restrictions from "./Restrictions";

/**
 * Provides create criteria on object[] data.
 */
export default class Criteria <E> {

    /**
     * Holds given original data list which criteria work on.
     */
    private dataList: E[];
    /**
     * Holds added restrictions to constrain the results to be retrieved.
     * @type {Array}
     */
    private restrictions: ((e: E) => boolean)[] = [];
    /**
     *  Holds given orders to ordering the result set.
     * @type {Array}
     */
    private sortings: ((list: E[]) => E[])[] = [];
    /**
     * Holds  an integer that represents the first row in your result set, starting with row 0.
     * @type {number}
     */
    private firstResult : number = 0;
    /**
     * Holds to retrieve a fixed number maxResults of objects from the given data.
     * @type {number}
     */
    private maxResults: number = 0;

    /**
     *  Create a new Criteria, by given data.
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

    /**
     * This method takes an integer that represents the first row in your result set, starting with row 0.
     * @param firstResult
     * @return {Criteria}
     */
    public setFirstResult = (firstResult: number): Criteria<E> => {
        this.firstResult = firstResult;
        return this;
    };

    /**
     * This method tells Criteria to retrieve a fixed number maxResults of objects.
     * @param maxResults
     * @return {Criteria}
     */
    public setMaxResults(maxResults: number): Criteria<E> {
        this.maxResults = maxResults;
        return this;
    }

    /**
     * Get the results.
     * @return {{data: any[], totalCount: number}}
     */
    public list = (): {data: any[], totalCount: number} => {
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
