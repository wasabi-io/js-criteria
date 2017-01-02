const hasOwnProperty = Object.prototype.hasOwnProperty;

export default class Objects {

    /**
     *
     * @param items
     * @param callback callback callback method for loop in Array.
     * @param ignoreList
     * @return {boolean}
     */
    public static forEach(items: any, callback: (item: any, index: string, items: Array<any> | Object ) => boolean | any, ignoreList?: string[]): boolean {
        if(items) {
            if(ignoreList) {
                for(let key in  items) {
                    if(hasOwnProperty.call(items, key)) {
                        if(ignoreList.indexOf(key) !== -1) {
                            continue;
                        }
                        let item = items[key];
                        if((callback)(item, key, items) === false) {
                            break;
                        }
                    }
                }
            } else {
                for(let key in  items) {
                    if(hasOwnProperty.call(items, key)) {
                        let item = items[key];
                        if((callback)(item, key, items) === false) {
                            break;
                        }
                    }
                }
            }
            return true;
        }
        return false
    }

    /**
     *
     * @param object
     * @param key
     * @returns {boolean}
     */
    public static hasProperty(object: Object, key: string) {
        return hasOwnProperty.call(object, key);
    }
}