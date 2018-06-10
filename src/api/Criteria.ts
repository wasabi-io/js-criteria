import Type from "../lang/Type";
import Restrictions from "./Restrictions";
import CriteriaResult from "./CriteriaResult";

export interface Query {
    value: string;
    ignoreList?: string[];
}

/**
 * Provides create criteria on object[] data.
 */
export default class Criteria<E> extends Type {

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
    private sorts: ((list: E[]) => E[])[] = [];
    /**
     *
     * @type {Array}
     */
    private queries: Query[] = [];

    /**
     * Holds  an integer that represents the first row in your result set, starting with row 0.
     * @type {number}
     */
    private firstResult: number = 0;
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
        super();
        this.dataList = dataList;
    }

    /**
     * set global query
     * @param query
     */
    public addQuery(query: Query): Criteria<E> {
        this.queries.push(query);
        return this;
    }

    /**
     *
     * @param restriction
     * @return {Criteria}
     */
    public add(restriction: (e: E) => boolean): Criteria<E> {
        if (restriction) {
            this.restrictions[this.restrictions.length] = restriction;
        }
        return this;
    }

    /**
     *
     * @param sorting
     * @return {Criteria}
     */
    public addOrder(sorting: (list: E[]) => E[]): Criteria<E> {
        if (sorting) {
            this.sorts[this.sorts.length] = sorting;
        }
        return this;
    }

    /**
     * This method takes an integer that represents the first row in your result set, starting with row 0.
     * @param firstResult
     * @return {Criteria}
     */
    public setFirstResult(firstResult: number): Criteria<E> {
        this.firstResult = firstResult;
        return this;
    }

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
    public list(): CriteriaResult<E> {
        return Criteria.list(this);
    }

    private static getQueryRestriction<E>(instance: Criteria<E>): (data: E) => boolean {
        let restriction: (data: E) => boolean;
        if (instance.queries.length > 0) {
            const restrictions = [];
            for (let i = 0; i < instance.queries.length; i = i + 1) {
                const query = instance.queries[i];
                restrictions[i] = Restrictions.query(query.value, query.ignoreList);
            }
            if (restrictions.length === 1) {
                restriction = restrictions[0];
            } else {
                restriction = Restrictions.or.apply(undefined, restrictions);
            }
            return restriction;
        }
        return (data: E) => true;
    }

    private static getFilter<E>(instance: Criteria<E>) {
        if (instance.restrictions.length === 1) {
            return instance.restrictions[0];
        }
        if (instance.restrictions.length > 1) {
            return Restrictions.and.apply(undefined, instance.restrictions);
        }
        return (data: E) => true;
    }

    /**
     * Get the results.
     * @return {{data: any[], totalCount: number}}
     */
    public static list<E>(instance: Criteria<E>): CriteriaResult<E> {
        const dataArray = instance.dataList;

        let data: E[] = [];

        const query = Criteria.getQueryRestriction(instance);
        const filter = Criteria.getFilter(instance);

        for (let i = 0; i < dataArray.length; i = i + 1) {
            const item = dataArray[i];
            const isFilterOk = filter(item);
            const isQueryOk = query(item);
            if (isFilterOk && isQueryOk) {
                data.push(item);
            }
        }

        for (let i = 0; i < instance.sorts.length; i = i + 1) {
            data = instance.sorts[i](data);
        }
        /** } **/

        const first = instance.firstResult || 0;
        const maxResult = instance.maxResults || data.length;
        let last = first + maxResult;
        if (last > dataArray.length) {
            last = dataArray.length;
        }

        const totalCount = dataArray.length;

        if (first !== 0 || last !== dataArray.length) {
            return new CriteriaResult<E>(totalCount, data.splice(first, last));
        }
        return new CriteriaResult<E>(totalCount, data);
    }
}
