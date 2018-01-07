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
        case 'GET_PREMIUM_WINS':
            return [...state, action.payload];
            break;
        default:
            return state;
    }

    return state;
}
