import {Props} from "wasabi-common/lib/types/Objects";
import Predicates, {Predicate, PredicateMultiple} from "./Predicates";

export interface RestrictionItem {
    key: string;
    op: string;
    predicate: Predicate;
}

/**
 * Resrictions to constrain the results to be retrieved.
 */
export default class Restrictions {

    /**
     * @param {string} key
     * @param {string} op
     * @param {Predicate} predicate
     * @returns {RestrictionItem}
     */
    public static wrap(key: string, op: string, predicate: Predicate): RestrictionItem {
        return {
            key,
            op,
            predicate
        };
    }

    /**
     * @description evulates op and execute it.
     * @param {string} op
     * @param {string} key
     * @param {any} value
     * @return {RestrictionItem}
     */
    public static op(key: string, op: string, value: any): RestrictionItem {
        return Restrictions.wrap(key, op, Predicates.op(key, op, value));
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @return {RestrictionItem}
     * @private
     */
    public static isTrue(key: string): RestrictionItem {
        return Restrictions.wrap(key, "isTrue", Predicates.isTrue(key));
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @return {RestrictionItem}
     * @private
     */
    public static isFalse(key: string): RestrictionItem {
        return Restrictions.wrap(key, "isFalse", Predicates.isFalse(key));
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @return {RestrictionItem}
     */
    public static eq(key: string, value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.wrap(key, "eq", Predicates.eq(key, value, caseSensitive));
    }

    /**
     * @description checks equality given value and given value of data by key.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @return {RestrictionItem}
     */
    public static neq(key: string, value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.wrap(key, "neq", Predicates.neq(key, value, caseSensitive));
    }

    /**
     * @description checks given value of data by key less then given value .
     * @param {string} key
     * @param {any} value
     * @return {RestrictionItem}
     */
    public static lt(key: string, value: any): RestrictionItem {
        return Restrictions.wrap(key, "lt", Predicates.lt(key, value));
    }

    /**
     * @description checks given value of data by key less then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {RestrictionItem}
     */
    public static lte(key: string, value: any): RestrictionItem {
        return Restrictions.wrap(key, "lte", Predicates.lte(key, value));
    }

    /**
     * @description checks given value of data by key greater then given value .
     * @param {string} key
     * @param {any} value
     * @return {RestrictionItem}
     */
    public static gt(key: string, value: any): RestrictionItem {
        return Restrictions.wrap(key, "gt", Predicates.gt(key, value));
    }

    /**
     * @description checks given value of data by key greater then or equals given value .
     * @param {string} key
     * @param {any} value
     * @return {RestrictionItem}
     */
    public static gte(key: string, value: any): RestrictionItem {
        return Restrictions.wrap(key, "gte", Predicates.gte(key, value));
    }

    /**
     * @description checks given value of data by key between given startValue and given endValue.
     * @param {string} key
     * @param {any} startValue
     * @param {any} endValue
     * @return {RestrictionItem}
     */
    public static between(key: string, startValue: any, endValue: any): RestrictionItem {
        return Restrictions.wrap(key, "between", Predicates.between(key, startValue, endValue));
    }

    /**
     * @description checks given value of data by key startsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public static startsWith(key: string, value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.wrap(key, "startsWith", Predicates.startsWith(key, value, caseSensitive));
    }

    /**
     * @description checks given value of data by key endsWith given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public static endsWith(key: string, value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.wrap(key, "endsWith", (data: Props<any>) => {
            return Predicates.checkLike(data, key, value, false, true, caseSensitive);
        });
    }

    /**
     * @description checks given value of data by key like given value by caseSensitive parameter.
     * @param {string} key
     * @param {any} value
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public static like(key: string, value: any, caseSensitive?: boolean): RestrictionItem {
        return Restrictions.wrap(key, "like", Predicates.like(key, value, caseSensitive));
    }

    /**
     * @description checks given value of data by key in given array values by caseSensitive parameter.
     * @param {string} key
     * @param {any[]} values
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public static in(key: string, values: any[], caseSensitive?: boolean): RestrictionItem {
        return Restrictions.wrap(key, "in", Predicates.in(key, values, caseSensitive));
    }

    /**
     * @description checks given value of data by key in given array values by caseSensitive parameter.
     * @param {string} key
     * @param {any[]} values
     * @param {boolean} caseSensitive
     * @returns {RestrictionItem}
     */
    public static likeIn(key: string, values: any[], caseSensitive?: boolean): RestrictionItem {
        return Restrictions.wrap(key, "likeIn", Predicates.likeIn(key, values, caseSensitive));
    }

    /**
     * @description checks given value of data by key is null.
     * @param {string} key
     * @returns {RestrictionItem}
     */
    public static isNull(key: string): RestrictionItem {
        return Restrictions.wrap(key, "isNull", Predicates.isNull(key));
    }

    /**
     * @description checks given value of data by key is not null.
     * @param {string} key
     * @returns {RestrictionItem}
     */
    public static isNotNull(key: string): RestrictionItem {
        return Restrictions.wrap(key, "isNotNull", Predicates.isNotNull(key));
    }

    /**
     * @description checks given value of data by key is empty.
     * @param {string} key
     * @returns {RestrictionItem}
     */
    public static isEmpty(key: string): RestrictionItem {
        return Restrictions.wrap(key, "isEmpty", Predicates.isEmpty(key));
    }

    /**
     * @description checks given value of data by key is not empty.
     * @param {string} key
     * @returns {RestrictionItem}
     */
    public static isNotEmpty(key: string): RestrictionItem {
        return Restrictions.wrap(key, "isNotEmpty", Predicates.isNotEmpty(key));
    }

    /**
     *
     * @param value
     * @param ignoreList
     * @return {RestrictionItem}
     */
    public static query(value: string, ignoreList?: string[]): RestrictionItem {
        return Restrictions.wrap("", "query", Predicates.query(value, ignoreList));
    }

    /**
     * @description joins Restrictions functions with or validation.
     * @param { ...RestrictionItem }restrictions
     * @returns {RestrictionItem}
     */
    public static or(...restrictions: RestrictionItem[]): RestrictionItem {
        return Restrictions.operateMultiple("or", restrictions, Predicates.orOperation);
    }

    /**
     * @description joins Restrictions functions with and validation.
     * @param { ...RestrictionItem }restrictions
     * @returns {RestrictionItem}
     */
    public static and(...restrictions: RestrictionItem[]): RestrictionItem {
        return Restrictions.operateMultiple("and", restrictions, Predicates.andOperation);
    }

    /**
     * @description joins Restrictions functions with and validation.
     * @param  {string} op
     * @param { RestrictionItem[] } restrictions
     * @param {PredicateMultiple} predicateMultiple
     * @returns {Function}
     */
    private static operateMultiple(op: string, restrictions: RestrictionItem[], predicateMultiple: PredicateMultiple): RestrictionItem {
        const keys = [];
        const predicates = [];
        for (const restriction of restrictions) {
            keys.push(`${restriction.key}:${restriction.op}`);
            predicates.push(restriction.predicate);
        }
        return Restrictions.wrap(keys.join("-"), op, predicateMultiple(predicates));
    }
}
