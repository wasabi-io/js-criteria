/**
 * Provides ordering to the result set..
 */
import {Props} from "wasabi-common";

export interface OrderItem<E> {
    key: string;
    sort: OrderCallback<E>;
}

export interface OrderCallback<E> {
    (dataList: E[]): E[];
}

class Order {
    /**
     *
     * Sorts ascending the data by given key.
     * @param {string} key
     * @return {Function}
     */
    public static asc<E>(key: string): OrderItem<E> {
        return {
            key,
            sort: Order.sort(key, false)
        };
    }

    /**
     * Sorts descending given data by given key.
     * @param {string} key
     * @return {Function}
     */
    public static desc<E>(key: string): OrderItem<E> {
        return {
            key,
            sort: Order.sort(key, true)
        };
    }

    /**
     *
     * Sorts given data by given key and sorted type.
     * @param {string} key
     * @param {boolean} isDesc
     * @return {Function}
     * @private
     */
    private static sort<E>(key: string, isDesc: boolean): OrderCallback<E> {
        const less: number = isDesc ? 1 : -1;
        const greater: number = isDesc ? -1 : 1;
        return (dataList: E[]): E[] => {
            dataList.sort((source: Props<any>, destination: Props<any>): number => {
                const sourceValue = source[key];
                const destinationValue = destination[key];
                if (sourceValue === destinationValue) {
                    return 0;
                }
                if (sourceValue < destinationValue) {
                    return less;
                }
                return greater;
            });
            return dataList;
        };
    }
}

export default Order;
