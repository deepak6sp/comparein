import {combineReducers} from 'redux';
import MarketSummaryReducer from './marketSummary';
import BrandSpecificReducer from './brandSpecific';
import SimulatedResultsReducer from './simulation';

const MainReducer = combineReducers({
    newSummary: MarketSummaryReducer,
    brandSpecificDetails: BrandSpecificReducer,
    simulatedResults: SimulatedResultsReducer

});

export default MainReducer;
