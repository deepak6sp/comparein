export default function(state = [], action) {
    switch (action.type) {
        case 'GENERATE_AGE_API_WINS':
            return [...state, action.payload];
            break;
        case 'GET_AGE_WINS':
            return [...state, action.payload];
            break;
        default:
            return state;
    }

    return state;
}
