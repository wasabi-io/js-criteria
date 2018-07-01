import {Props} from "wasabi-common";
import Type from "../lang/Type";
import {default as Restrictions, RestrictionItem} from "./Restrictions";
import CriteriaResult from "./CriteriaResult";
import {default as Order, OrderCallback, OrderItem} from "./Order";
import Strings from "wasabi-common/lib/types/Strings";

export enum OrderType {
    asc = "asc",
    desc = "desc"
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
    private restrictionMap: Props<RestrictionItem>;

    /**
     *  Holds given orders to ordering the result set.
     * @type {Array}
     */
    private sortMap: Props<OrderCallback<E>>;

    /**
     * Holds  an integer that represents the first row in your result set, starting with row 0.
     * @type {number}
     */
    private _offset: number;
    /**
     * Holds to retrieve a fixed number maxResults of objects from the given data.
     * @type {number}
     */
    private _limit: number;

    /**
     *  Create a new Criteria, by given data.
     * @param dataList
     */
    public constructor(dataList: E[]) {
        super();
        this.dataList = dataList;
        this.init();
    }

    private init() {
        this.restrictionMap = {};
        this.sortMap = {};
        this._offset = 0;
        this._limit = this.dataList.length;
    }

    public get offset() {
        return this._offset;
    }

    /**
     * This method takes an integer that represents the first row in your result set, starting with row 0.
     * @param firstResult
     * @return {Criteria}
     */
    public setOffset(firstResult: number): Criteria<E> {
        this._offset = firstResult;
        return this;
    }

    public get limit() {
        return this._limit;
    }

    /**
     * This method tells Criteria to retrieve a fixed number maxResults of objects.
     * @param limit
     * @return {Criteria}
     */
    public setLimit(limit: number): Criteria<E> {
        this._limit = limit;
        return this;
    }

    public sort(name: string, orderType: OrderType): Criteria<E> {
        const orderFn = orderType === OrderType.desc ? Order.desc : Order.asc;
        this.addOrder(orderFn(name));
        return this;
    }

    public asc(name: string): Criteria<E> {
        this.addOrder(Order.asc(name));
        return this;
    }

    public desc(name: string): Criteria<E> {
        this.addOrder(Order.desc(name));
        return this;
    }

    public isTrue(name: string): Criteria<E> {
        this.add(Restrictions.isTrue(name));
        return this;
    }

    public isFalse(name: string): Criteria<E> {
        this.add(Restrictions.isFalse(name));
        return this;
    }

    public isNull(name: string): Criteria<E> {
        this.add(Restrictions.isNull(name));
        return this;
    }

    public isNotNull(name: string): Criteria<E> {
        this.add(Restrictions.isNotNull(name));
        return this;
    }

    public eq(name: string, value: any, caseSensitive?: boolean): Criteria<E> {
        this.add(Restrictions.eq(name, value, caseSensitive));
        return this;
    }

    public neq(name: string, value: any, caseSensitive?: boolean): Criteria<E> {
        this.add(Restrictions.neq(name, value, caseSensitive));
        return this;
    }

    public gt(name: string, value: any): Criteria<E> {
        this.add(Restrictions.gt(name, value));
        return this;
    }

    public gte(name: string, value: any): Criteria<E> {
        this.add(Restrictions.gte(name, value));
        return this;
    }

    public lt(name: string, value: any): Criteria<E> {
        this.add(Restrictions.lt(name, value));
        return this;
    }

    public lte(name: string, value: any): Criteria<E> {
        this.add(Restrictions.lte(name, value));
        return this;
    }

    public between(name: string, leftValue: any, rightValue: any): Criteria<E> {
        this.add(Restrictions.between(name, leftValue, rightValue));
        return this;
    }

    public like(name: string, value: any, caseSensitive?: boolean): Criteria<E> {
        this.add(Restrictions.like(name, value, caseSensitive));
        return this;
    }

    public likeIn(name: string, values: any[], caseSensitive?: boolean): Criteria<E> {
        this.add(Restrictions.likeIn(name, values, caseSensitive));
        return this;
    }

    public in(name: string, values: any[], caseSensitive?: boolean): Criteria<E> {
        this.add(Restrictions.in(name, values, caseSensitive));
        return this;
    }

    public startsWith(name: string, value: any, caseSensitive?: boolean): Criteria<E> {
        this.add(Restrictions.startsWith(name, value, caseSensitive));
        return this;
    }

    public endsWith(name: string, value: any, caseSensitive?: boolean): Criteria<E> {
        this.add(Restrictions.endsWith(name, value, caseSensitive));
        return this;
    }

    public query(value: any, ignoreList?: string[]): Criteria<E> {
        this.add(Restrictions.query(name, ignoreList));
        return this;
    }

    /**
     * @param {OrderItem<E>} orderItem
     * @return {Criteria}
     */
    public addOrder(orderItem: OrderItem<E>): Criteria<E> {
        if (orderItem) {
            if (this.sortMap[orderItem.key]) {
                delete this.sortMap[orderItem.key];
            }
            this.sortMap[orderItem.key] = orderItem.sort;
        }
        return this;
    }

    public removeOrder(key: string): Criteria<E> {
        if (this.sortMap[key]) {
            delete this.sortMap[key];
        }
        return this;
    }

    public clearOrder(): Criteria<E> {
        this.sortMap = {};
        return this;
    }

    /**
     * Get the results.
     * @return {number}
     */
    public get total(): number {
        return this.dataList ? this.dataList.length : 0;
    }

    private static indexOfRestriction(name: string, op: string) {
        return `${name}&${op}`;
    }

    /**
     *
     * @param restriction
     * @return {Criteria}
     */
    public add(restriction: RestrictionItem): Criteria<E> {
        if (restriction) {
            const index: string = Criteria.indexOfRestriction(restriction.key, restriction.op);
            this.removeRestrictionByIndex(index);
            this.restrictionMap[index] = restriction;
        }
        return this;
    }

    public removeRestrictionByName(name: string): Criteria<E> {
        for (const key in this.restrictionMap) {
            if (this.restrictionMap.hasOwnProperty(key)) {
                if (Strings.startsWith(key, `${name}&`)) {
                    delete this.restrictionMap[key];
                }
            }
        }
        return this;
    }

    public removeRestriction(name: string, op: string): Criteria<E> {
        const index = Criteria.indexOfRestriction(name, op);
        return this.removeRestrictionByIndex(index);
    }

    public removeRestrictionByIndex(index: string): Criteria<E> {
        if (this.restrictionMap[index]) {
            delete this.restrictionMap[index];
        }
        return this;
    }

    public clearRestriction(): Criteria<E> {
        this.restrictionMap = {};
        return this;
    }

    /**
     * Get the results.
     * @return {{data: any[], totalCount: number}}
     */
    public list(): CriteriaResult<E> {
        return Criteria.list(this);
    }

    public clear(): Criteria<E> {
        this.init();
        return this;
    }

    private static has(props: Props<any>) {
        for (const key in props) {
            if (props.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    }

    private static filter<E>(instance: Criteria<E>, item: any) {
        let result = true;
        for (const key in instance.restrictionMap) {
            if (instance.restrictionMap.hasOwnProperty(key)) {
                const restriction = instance.restrictionMap[key];
                result = result && restriction.predicate(item);
            }
        }
        return result;
    }

    /**
     * Get the results.
     * @return {{data: any[], totalCount: number}}
     */
    public static list<E>(instance: Criteria<E>): CriteriaResult<E> {
        const dataArray = instance.dataList;

        let data = Criteria.has(instance.restrictionMap) ? dataArray.filter(Criteria.filter.bind(Criteria, instance)) : dataArray.slice(0);

        const total = data.length;

        for (const key in instance.sortMap) {
            data = instance.sortMap[key](data);
        }
        /** } **/

        const first = instance.offset || 0;
        const limit = instance.limit || data.length - first;

        if (first === 0 && limit === dataArray.length) {
            return new CriteriaResult<E>(total, data);
        }
        return new CriteriaResult<E>(total, data.splice(first, limit));
    }
}
