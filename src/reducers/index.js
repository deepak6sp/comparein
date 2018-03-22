import {combineReducers} from 'redux';
import MarketSummaryReducer from './marketSummary';
import BrandSpecificReducer from './brandSpecific';
import SimulationReducer from './simulation';

const MainReducer = combineReducers({
    newSummary: MarketSummaryReducer,
    brandSpecificDetails: BrandSpecificReducer,
    simulationDetails:SimulationReducer

});

export default MainReducer;
