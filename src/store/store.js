import thunk from 'redux-thunk';
import { createStore,combineReducers, applyMiddleware, compose} from 'redux'
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { noteReducer } from '../reducers/notesReducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth :authReducer,
    ui : uiReducer,
    notes : noteReducer
})
export const   store = createStore(
    reducers,
    composeEnhancers( 
        applyMiddleware(thunk)
    )
);