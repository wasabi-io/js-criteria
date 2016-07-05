/**
 * Provide ordering to the result set..
 */
class Order {

    /**
     *
     * @param {string} key
     * @return {Function}
     */
    asc = (key: string): Function => {
        return this.__sort(key, false);
    }
    /**
     *
     * @param {string} key
     * @return {Function}
     */
    desc = (key: string): Function => {
        return this.__sort(key, true);
    }

    /**
     *
     * @param {string} key
     * @param {boolean} isDesc
     * @return {Function}
     * @private
     */
    __sort(key: string, isDesc: boolean): Function {
        let less: number = isDesc ? 1 : -1;
        let greater: number = isDesc ? -1 : 1;
        return (dataList: Array<Map>): Array<Map> => {
            dataList.sort((source: Map, destination: Map): number => {
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

export default new Order();
