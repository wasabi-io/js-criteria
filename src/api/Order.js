/**
 * Provide ordering to the result set..
 */
class Order {

    /**
     *
     * @param {string} key
     * @return {Function}
     */
    asc(key: string): Function {
        return Order._this.__sort(key, false);
    }
    /**
     *
     * @param {string} key
     * @return {Function}
     */
    desc(key: string): Function {
        return Order._this.__sort(key, true);
    }

    /**
     *
     * @param {string} key
     * @param {boolean} isDesc
     * @return {Function}
     * @private
     */
    __sort(key: string, isDesc: boolean): Function {
        let less = isDesc ? 1 : -1;
        let greater = isDesc ? -1 : 1;
        return (dataList: Array<Map>): Array<Map> => {
            dataList.sort((source, destination) => {
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
Order._this = new Order();
export default new Order();
