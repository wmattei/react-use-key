import useKey from './';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

describe('Hook', () => {
    testHook({
        name: 'keyup/Enter',
        keys: 'Enter',
        config: { eventType: 'keyup' },
        event: {
            key: 'Enter',
            type: 'keyup'
        }
    });
    testHook({
        name: 'keydown/Enter',
        keys: 'Enter',
        config: { eventType: 'keydown' },
        event: {
            key: 'Enter',
            type: 'keydown'
        }
    });    
});

function testHook({ name, keys, config, event, hookTimeOut = 1000 }) {
    return test(name, async () => {
        const e = await new Promise(async (resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Hook Timeout!')), hookTimeOut);
            const callback = e => {
                clearTimeout(timer);
                resolve(e);
            };
            const success = () => {
                setImmediate(() => {
                    const { type, ...init} = event;
                    document.dispatchEvent(new KeyboardEvent(type, init));
                });
            };
            const renderHook = () => {
                useKey(keys, callback, config);
                useEffect(success);
                return <div id={name}>{name}</div>;
            };
            await renderAsync(renderHook);
        });
        expect(e.key).toBe(keys);
    });
}

function root() {
    let root = document.getElementById('root') || document.createElement('div');
    root.id = 'root';
    if (document.contains(root)) document.body.removeChild(root);
    document.body.appendChild(root);
    return root;
}

function renderAsync(Component) {
    const Wrapper = ({ Component, callback }) => {
        useEffect(callback);
        return <Component />;
    };
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Render Timeout!')), 1000);
        ReactDOM.render(
            <Wrapper
                Component={Component}
                callback={() => {
                    clearTimeout(timer);
                    resolve();
                }}
            />,
            root()
        );
    });
}
