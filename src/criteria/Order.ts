/**
 * Provide ordering to the result set..
 */
class Order {
    /**
     *
     * @param {string} key
     * @return {Function}
     */
    public static asc (key: string): (dataList: any[]) => any[] {
        return Order.sort(key, false);
    }
    /**
     *
     * @param {string} key
     * @return {Function}
     */
    public static desc (key: string): (dataList: any[]) => any[] {
        return Order.sort(key, true);
    }

    /**
     *
     * @param {string} key
     * @param {boolean} isDesc
     * @return {Function}
     * @private
     */
    private static sort (key: string, isDesc: boolean): (dataList: any[]) => any[] {
        let less: number = isDesc ? 1 : -1;
        let greater: number = isDesc ? -1 : 1;
        return (dataList: any[]): any[] => {
            dataList.sort(function(source: any[], destination: any[]): number {
                let sourceValue = source[key];
                let destinationValue = destination[key];
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
