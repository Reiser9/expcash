import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

import {authStateListener} from './authReducer.js';
import {initNotifyAC} from './notify-reducer.js';

const SET_INIT_APP = 'SET_INIT_APP';
const INIT_GAMES = 'INIT_GAMES';

const initialState = {
	initApp: false,
	games: []
}

const appReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_INIT_APP:
			return{
				...state,
				initApp: action.value
			}
		case INIT_GAMES:
			return{
				...state,
				games: action.value
			}
        default:
            return state;
    }
}

export const setInitApp = (value) => {
	return{
		type: SET_INIT_APP,
		value
	}
}

export const initGames = (value) => {
	return{
		type: INIT_GAMES,
		value
	}
}

export const initGamesAC = () => (dispatch) => {
	firebase.database().ref('games').on('value', snapshot => {
		let tempArr = [];
		for(let i in snapshot.val()){
			tempArr.push(snapshot.val()[i]);
		}
		dispatch(initGames(tempArr));
	});
}

export const initializedApp = () => (dispatch) => {
	let auth = dispatch(authStateListener());
	let games = dispatch(initGamesAC());
	let notify = dispatch(initNotifyAC());

    Promise.all([auth, games, notify]).then(() => {
        dispatch(setInitApp(true));
    });
}

export default appReducer;