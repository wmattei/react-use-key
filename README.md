# react-use-key

> React hook for key binding and execute handler

[![NPM](https://img.shields.io/npm/v/react-use-key.svg)](https://www.npmjs.com/package/react-use-key) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-key
```

or

```bash
yarn add react-use-key
```

## Usage

```jsx
import React from 'react'

import useKey from 'react-use-key'

function Example(props) {
    
    //Simple use
    useKey('a', () => console.log('You pressed "a"'), null);
    
    //More than 1 match expression:
    useKey('a|1|4|j|g', e => console.log(`You pressed ${e.key}`), null);
    
    //Combinations
    useKey('ctrl+shift+1', () => console.log('You pressed 1 with CTRL and SHIFT'), null);
    
    //Complex combinations
    useKey('ctrl+shift+f | alt+g | p', e => console.log(`You pressed ${e.key} with alt: ${e.altKey}, ctrl: ${e.ctrlKey}`), null);
    
    return (
      <></>
    )
}
```

### Additional Options

The third parameter is an **optional** configuration object that includes:

| Key  | Description | Default |
| ------------- | ------------- | ------------- |
| separator  | Separator character for combinations patterns | + |
| orSeparator  | Character that separates patterns when more than one is available  | \| |
| matchStrategy  | The key from the javascript event object that will be used to match the passed key. The availables options are `key` and `code`. When code is selected you will have to pass the complete code of the character. e.g `Numpad1` will only match if the pressed key is `1` from the Numpad | key |
| preventDefault  | If the event should prevent the default key behaviour | false |
| eventType  | Javascript native event type. Options are: `keypress`, `keydown`, `keyup` | keydown |




**Thanks for downloading**

**Feel free to report an issue or to create new features**

## License

MIT © [wmattei](https://github.com/wmattei)
