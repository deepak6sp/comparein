export default function(state = [], action) {
    switch (action.type) {
        case 'GENERATE_AGE_QTES_WINS_API':
            return [...state, action.payload];
            break;
        case 'GET_AGE_QTES_WINS':
            return [...state, action.payload];
            break;
        case 'GENERATE_AGE_BAND_REL_API':
            return [...state, action.payload];
            break;
        case 'GET_AGE_BAND_REL':
            return [...state, action.payload];
            break;
        case 'GENERATE_SI_QTES_WINS_API':
            return [...state, action.payload];
            break;
        case 'GET_SI_QTES_WINS':
            return [...state, action.payload];
            break;
        case 'GENERATE_SI_BAND_REL_API':
            return [...state, action.payload];
            break;
        case 'GET_SI_BAND_REL':
            return [...state, action.payload];
            break;

        default:
            return state;
    }

    return state;
}
