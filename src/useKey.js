import { useCallback, useEffect } from 'react';

const _defaultConfig = {
    separator: '+',
    orSeparator: '|',
    matchStrategy: 'key', // key || code
    preventDefault: false,
    eventType: 'keydown'
};

const _specialKeys = {
    CTRL: 'CTRL',
    SHIFT: 'SHIFT',
    ALT: 'ALT'
};

function _extractRegularKeys(string) {
    return string
        .replace(/ /g, '')
        .split('+')
        .filter(o => !Object.values(_specialKeys).includes(o));
}

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
export function useKey(key, handler, config = {}) {
    config = { ..._defaultConfig, ...config };
    const memoHandler = useCallback(handler);

    const internalHandler = e => {
        const options = key
            .replace(/ /g, '')
            .toUpperCase()
            .split(config.orSeparator);
        const match = options.find(o => {
            const combination = o.split(config.separator);
            const requireCtrl = combination.includes(_specialKeys.CTRL);
            const requireShift = combination.includes(_specialKeys.SHIFT);
            const requireAlt = combination.includes(_specialKeys.ALT);

            const regularKeys = _extractRegularKeys(o);
            return (
                regularKeys.includes(e[config.matchStrategy].toUpperCase()) &&
                requireCtrl === e.ctrlKey &&
                requireShift === e.shiftKey &&
                requireAlt === e.altKey
            );
        });
        if (!match) {
            return;
        }
        if (config.preventDefault) {
            e.preventDefault();
        }
        memoHandler(e);
    };
    
    useEffect(() => {
        document.addEventListener(config.eventType, internalHandler);
        return () => document.removeEventListener(config.eventType, internalHandler);
    }, [memoHandler, key]);
}
