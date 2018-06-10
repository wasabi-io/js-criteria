/**
 * Provides ordering to the result set..
 */
import {Props} from "wasabi-common";

class Order {
    /**
     *
     * Sorts ascending the data by given key.
     * @param {string} key
     * @return {Function}
     */
    public static asc(key: string): (dataList: any[]) => any[] {
        return Order.sort(key, false);
    }

    /**
     * Sorts descending given data by given key.
     * @param {string} key
     * @return {Function}
     */
    public static desc(key: string): (dataList: any[]) => any[] {
        return Order.sort(key, true);
    }

    /**
     *
     * Sorts given data by given key and sorted type.
     * @param {string} key
     * @param {boolean} isDesc
     * @return {Function}
     * @private
     */
    private static sort(key: string, isDesc: boolean): (dataList: any[]) => any[] {
        const less: number = isDesc ? 1 : -1;
        const greater: number = isDesc ? -1 : 1;
        return (dataList: any[]): any[] => {
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
