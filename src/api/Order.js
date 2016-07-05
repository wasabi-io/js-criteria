class Order {
    asc(key: string): Function {
        return this.__sort(key, false);
    }
    desc(key: string): Function {
        return this.__sort(key, true);
    }
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

export default new Order();
