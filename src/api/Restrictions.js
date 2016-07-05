class Restrictions {

    gt(key: string, value: any): Function {
        return (data: Map): boolean => {
            return data[key] > value;
        };
    }

    lt(key: string, value: any): Function {
        return (data: Map): boolean => {
            return data[key] < value;
        };
    }

    __like(key: string, value: any,isILike: boolean): Function  {
        let sw = value.startsWith("%");
        let ew = value.endsWith("%");
        let startIndex = sw ? 1 : 0;

        let endIndex = ew ? value.length - 1 : value.length;
        value = value.substring(startIndex, endIndex);

        return (data: Map): boolean => {
            let propValue = data[key];
            if (isILike) {
                value = value.toLocaleLowerCase();
                propValue = propValue.toLocaleLowerCase();
            }

            if (sw && ew) {
                return propValue.indexOf(value) > -1;
            } else if (sw) {
                return propValue.endsWith(value);
            } else if (ew) {
                return propValue.startsWith(value);
            }
            return propValue === value;
        };
    }

    like(key: string, value: any): Function {
        return this.__like(key, value, false);
    }

    ilike(key: string, value: any): Function {
        return this.__like(key, value, true);
    }

    between(key: string, startValue: any, endValue: any): Function {
        return (data: Map): boolean => {
            let propValue = data[key];
            return propValue >= startValue && propValue <= endValue;
        };
    }

    isNull(key: string): Function {
        return (data: Map): boolean => {
            let propValue = data[key];
            return (propValue === undefined || propValue === null);
        };
    }

    isNotNull(key: string): Function {
        return (data: Map): boolean => {
            return !(data[key] === undefined || data[key] === null);
        };
    }
    isEmpty(key: string): Function {
        return (data: Map): boolean => {
            let propValue = data[key];
            return (propValue === undefined || propValue === null) || propValue === "";
        };
    }
    isNotEmpty(key: string): Function {
        return (data: Map): boolean => {
            let propValue = data[key];
            return !((propValue === undefined || propValue === null) || propValue === "");
        };
    }
    or(...restrictions: Array<Function>) {
        return (data: Map): boolean => {
            let result = false;
            for (let i = 0; i < restrictions.length; i++) {
                result = result || restrictions[i](data);
            }
            return result;
        };
    }

    and(...restrictions: Array<Function>) {
        return (data: Map): boolean => {
            let result = true;
            for (let i = 0; i < restrictions.length; i++) {
                result = result && restrictions[i](data);
            }
            return result;
        };
    }
}

export default new Restrictions();
