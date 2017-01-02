import Restrictions from "./Restrictions";


export interface Query {
    param: string,
    ignoreList?: string[]
}
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
     *
     * @type {Array}
     */
    private queries: Query[] = [];

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
     * set global query
     * @param query
     */
    public addQuery(query: Query) {
        this.queries.push(query);
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

    private static defaultTrue (data: any) : boolean {
        return true;
    }

    private static defaultFalse (data: any) : boolean {
        return false;
    }

    private static getQueryRestriction(instance): (data: any) => boolean  {
        let restriction: (data: any) => boolean;
        if(instance.queries.length > 0 ) {
            let restrictions = [];
            for(let i = 0 ; i < instance.queries.length; i++) {
                let query = instance.queries[i];
                restrictions[i] = Restrictions.query(query.param, query.ignoreList);
            }
            if(restrictions.length === 1) {
                restriction = restrictions[0];
            } else {
                restriction = Restrictions.or.apply(undefined, restrictions);
            }
            return restriction;
        }
        return Criteria.defaultTrue;
    }
    private static getFilter(instance){
        if (instance.restrictions.length === 1) {
            return instance.restrictions[0];
        } else if(instance.restrictions.length > 1) {
            return Restrictions.and.apply(undefined, instance.restrictions);
        }
        return Criteria.defaultTrue;
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

        let query = Criteria.getQueryRestriction(this);
        let filter = Criteria.getFilter(this);
        for (let i = 0; i < dataArray.length; i++) {
            let data = dataArray[i];
            let isFilterOk = filter(data);
            let isQueryOk = query(data);
            if (isFilterOk && isQueryOk) {
                result.push(data);
            }
        }

        for (let i = 0; i < this.sortings.length; i++) {
            result = this.sortings[i](result);
        }
        /** } **/
        if(last < dataArray.length && first < last) {
            return result.splice(first, last);
        }
        return result;
    }
}
