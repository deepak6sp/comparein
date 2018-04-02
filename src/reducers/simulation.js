/**
 * This is a pure function which takes current state and action as arguments
 * and returns a new state. This is be always immutable array
 * @param  {Array}  state initialized with empty array
 * @param  {Object} action     The action disptached from store
 *                             which carries type and payload
 * @return {Array}             a new state
 */
export default function(state = [], action) {
    
    switch (action.type) {
        case 'CLEAR_REDUX_STORE':
            state = [];
            break;
        case 'GET_SIMULATED_PREMIUM_WINS':
            return [state, {marketSummary: action.payload}];
            break;
        case 'GET_SIMULATED_AGE_QTES_WINS':
            return [state, {ageQtes: action.payload}];
            break;
        case 'GET_SIMULATED_SI_QTES_WINS':
            return [state, {siQtes: action.payload}];
            break;
        case 'GET_EDIT_SIMULATED_AGE_QTES_WINS':
            return [...state, {ageQtes: action.payload}];
            break;
        case 'GET_EDIT_SIMULATED_SI_QTES_WINS':
            return [...state, {siQtes: action.payload}];
            break;
        default:
            return state;
    }

    return state;
}