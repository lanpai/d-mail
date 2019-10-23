import store from './store';

function switchActive(value) {
    store.dispatch({
        type: 'SWITCH_ACTIVE',
        payload: value
    });
}

export { switchActive };
