import { useCallback, useEffect } from 'react'

export interface Config {
  separator?: string
  orSeparator?: string
  matchStrategy?: 'key' | 'code'
  preventDefault?: boolean
  eventType?: 'keydown' | 'keyup' | string
}

export declare type KeyboardEventHandler = (e: KeyboardEvent) => any

const _defaultConfig: Config = {
  separator: '+',
  orSeparator: '|',
  matchStrategy: 'key', // key || code
  preventDefault: false,
  eventType: 'keydown'
}

const _specialKeys = {
  CTRL: 'CTRL',
  SHIFT: 'SHIFT',
  ALT: 'ALT',
  META: 'META'
}

function _extractRegularKeys(string: string): string[] {
  return string
    .replace(/ /g, '')
    .split('+')
    .filter((o) => !Object.values(_specialKeys).includes(o))
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
export default function useKey(
  key: string,
  handler: KeyboardEventHandler,
  config: Config
): any {
  config = { ..._defaultConfig, ...(config || {}) }
  const memoHandler = useCallback(handler, [])

  const internalHandler = (e: KeyboardEvent) => {
    console.log(e)
    const options = key
      .replace(/ /g, '')
      .toUpperCase()
      .split(config.orSeparator as string)
    const match = options.find((o) => {
      const combination = o.split(config.separator as string)
      const requireCtrl = combination.includes(_specialKeys.CTRL)
      const requireShift = combination.includes(_specialKeys.SHIFT)
      const requireAlt = combination.includes(_specialKeys.ALT)

      const regularKeys = _extractRegularKeys(o)
      return (
        regularKeys.includes(e[config.matchStrategy as string].toUpperCase()) &&
        requireCtrl === e.ctrlKey &&
        requireShift === e.shiftKey &&
        requireAlt === e.altKey
      )
    })
    if (!match) {
      return
    }
    if (config.preventDefault) {
      e.preventDefault()
    }
    memoHandler(e)
  }

  useEffect(() => {
    document.addEventListener(config.eventType as string, internalHandler)
    return () =>
      document.removeEventListener(config.eventType as string, internalHandler)
  }, [memoHandler, key])
}
