import {Props} from "wasabi-common";
import Functions from "wasabi-common/lib/types/Functions";

const RESTRICTED_CONSTRUCTORS = [
    "Object",
    "ReactComponent",
    "Component",
    "Class",
    "Date",
    "File"
];

const RESTRICTED_BIND_TYPES = [
    "constructor",
    "componentWillMount",
    "render",
    "componentDidMount",
    "componentWillReceiveProps",
    "shouldComponentUpdate",
    "componentWillUpdate",
    "render",
    "componentDidUpdate",
    "componentWillUnmount",
    "setState",
    "forceUpdate",
    "defaultProps",
    "displayName",
    "propTypes",
    "props",
    "state",
    "isMounted",
    "replaceState"
];

/**
 * A class which  implements __bindAll which binds all methods to the instance.
 * Essential to use at all classes if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class Class
 */
export default class Type {

    constructor() {
        Type.bindAll(this);
    }

    /**
     *
     * @param instance
     * @return {undefined}
     */
    bindAll(instance: Object) {
        return Type.bindAll(instance);
    }

    /**
     * Binds all methods to the instance.
     * @param {Object} instance to bind
     */
    public static bindAll(instance: Props<any>) {
        let parent = Object.getPrototypeOf(instance);
        const bindedNames: Props<any> = {};
        while (RESTRICTED_CONSTRUCTORS.indexOf(Functions.getName(parent.constructor)) === -1) {
            const names: string[] = Object.getOwnPropertyNames(parent);
            for (let i = 0; i < names.length; i = i + 1) {
                const name = names[i];
                if (!bindedNames[name] && typeof parent[name] === "function" && RESTRICTED_BIND_TYPES.indexOf(name) === -1) {
                    instance[name] = parent[name].bind(instance);
                    bindedNames[name] = true;
                }
            }
            parent = Object.getPrototypeOf(parent);

        }
    }
}
