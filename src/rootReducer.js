import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import crudReducer from './base/pages/CRUD.reducer';

const rootReducer = combineReducers({
    form: form,
    crudReducer
});

export default rootReducer;