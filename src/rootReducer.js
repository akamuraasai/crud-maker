import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import FormularioReducer from './base/pages/Formulario.reducer';

const rootReducer = combineReducers({
    form: form,
    main_form: FormularioReducer
});

export default rootReducer;