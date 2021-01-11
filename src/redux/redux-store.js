import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer.js';
import siteColorReducer from './siteColor-reducer.js';
import authReducer from './authReducer.js';
import modalReducer from './modal-reducer.js';
import chatReducer from './chat-reducer.js';
import notifyReducer from './notify-reducer.js';
import favoriteReducer from './favorite-reducer.js';
import {compose} from 'redux';

const redusers = combineReducers({
	app: appReducer,
	siteColor: siteColorReducer,
	auth: authReducer,
	modal: modalReducer,
	chat: chatReducer,
	favorite: favoriteReducer,
	notify: notifyReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;