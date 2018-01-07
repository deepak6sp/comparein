import {combineReducers} from 'redux';
import MarketSummaryReducer from './marketSummary';
import BrandSpecificReducer from './brandSpecific';

const MainReducer = combineReducers({
    newSummary: MarketSummaryReducer,
    brandSpecificDetails: BrandSpecificReducer

});

export default MainReducer;
