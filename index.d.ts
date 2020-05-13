export interface Config {
    separator?: string;
    orSeparator?: string;
    matchStrategy?: "key" | "code";
    preventDefault?: boolean;
    eventType?: "keydown" | "keyup" | string;
}
/**
 * handle event
 * NOTE: returns any to avoid ts to complain on Promises
 */
export declare type KeyboardEventHandler = (e: KeyboardEvent) => any;
/**
 *
 * @param {String} key
 * @param {Function} handler
 * @param {Object} config - Hook config object
 * @param {String} [config.separator] - Keys separator
 * @param {String} [config.orSeparator] - Or separator
 * @param {String} [config.matchStrategy] - Strategy for matching gived string. Default: key
 * @param {String} [config.preventDefault] - Should it prevent the default key behaviour
 * @param {String} [config.eventType] - Event type. Default: keydown
 */
declare function useKey(key: string, handler: KeyboardEventHandler, config?: Config): void;
export default useKey;
