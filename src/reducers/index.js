import {combineReducers} from 'redux';
import MarketSummaryReducer from './marketSummary';

const MainReducer = combineReducers({
    newSummary: MarketSummaryReducer
});

export default MainReducer;
