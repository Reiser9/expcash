import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

import {authStateListener} from './auth-reducer.js';
import {initNotifyAC} from './notify-reducer.js';
import {initFaqAC} from './faq-reducer.js';

const SET_INIT_APP = 'SET_INIT_APP';
const INIT_GAMES = 'INIT_GAMES';
const SET_GAMES_PROGRESS = 'SET_GAMES_PROGRESS';
export const userIcon = 'https://www.clipartmax.com/png/full/247-2470496_what-do-people-think-round-icon-user-png.png';

const initialState = {
	initApp: false,
	games: [],
	gamesProgress: true
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
		case SET_GAMES_PROGRESS:
			return{
				...state,
				gamesProgress: action.value
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

export const setGamesProgress = (value) => {
	return{
		type: SET_GAMES_PROGRESS,
		value
	}
}

// Инициализация игр сайта
export const initGamesAC = () => (dispatch) => {
	firebase.database().ref('games').on('value', snapshot => {
		let tempArr = [];
		for(let i in snapshot.val()){
			tempArr.push(snapshot.val()[i]);
		}
		dispatch(initGames(tempArr));
		dispatch(setGamesProgress(false))
	});
}

// Инициализация приложения
export const initializedApp = () => (dispatch) => {
	let auth = dispatch(authStateListener());
	let games = dispatch(initGamesAC());
	let notify = dispatch(initNotifyAC());
	let faq = dispatch(initFaqAC());

    Promise.all([auth, games, notify, faq]).then(() => {
        dispatch(setInitApp(true));
    });
}

export default appReducer;