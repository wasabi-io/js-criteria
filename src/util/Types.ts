const toString = Object.prototype.toString;
const TO_STRING = {
    String: toString.call("")
};

export default class Types {
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isString(element: any): boolean {
        return toString.call(element) === TO_STRING.String;
    }
}
