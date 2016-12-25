const toString = Object.prototype.toString;
const TO_STRING = {
    String: toString.call("")
};

// Provides most used operations and validations on all types.
export default class Types {
    /**
     * checks given object is string or not.
     * @param obj
     * @return {boolean}
     * @public
     */
    public static isString(obj: any): boolean {
        return toString.call(obj) === TO_STRING.String;
    }
}
