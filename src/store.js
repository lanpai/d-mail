import { createStore } from 'redux';

const initialState = {
    client: {
        nick: 'KuriGohan',
        id: '23j6-19k5-13j5'
    },
    active: '@weirdodobird',
    recent: [
        'weirdodobird',
        'Minnowfeather',
        'Paelen',
        'Alanisahorse',
        'Officer-chan',
        'Underslash',
        'Blackdeath45678',
        'eugenius',
        'gaidancecounselor',
        'ENam',
        'prog_ju',
        'Runningsloths',
        'rip',
        'Mudamaid 6',
        'woojinguy208',
        'ManuFraxured'
    ],
    history: {
        'weirdodobird': [
            { author: 'weirdodobird', body: 'test' },
            { author: 'weirdodobird', body: '123' }
        ],
        'Minnowfeather': [
            { author: 'Minnowfeather', body: 'testing' },
            { author: 'Minnowfeather', body: 'body' },
            { author: 'KuriGohan', body: '123oiu' }
        ]
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SWITCH_ACTIVE':
            let recent = state.recent.concat();
            if (action.payload[0] === '@') {
                recent.splice(recent.indexOf(action.payload.substr(1)), 1);
            }
            recent.unshift(action.payload.substr(1));
            return Object.assign({}, state, {
                active: action.payload,
                recent: recent
            });
            break;
        case 'SET_CLIENT':
            return Object.assign({}, state, {
                client: { ...state.client, ...action.payload }
            });
            break;
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;
