import { combineReducers } from 'redux';

import empReducer from './emp/emp.reducer';

export default combineReducers({
  emp: empReducer,
});
