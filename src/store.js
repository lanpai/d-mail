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
    ]
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CLIENT':
            state.client = { ...state.client, ...action.payload };
            break;
    }
    return state;
}

const store = createStore(reducer);

export default store;
