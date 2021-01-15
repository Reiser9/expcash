import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import {user} from './auth-reducer.js';

const ADD_FAVORITE_GAMES = 'ADD_FAVORITE_GAMES';
const REMOVE_FAVORITE_GAMES = 'REMOVE_FAVORITE_GAMES';
const SET_FAVORITE_GAMES = 'SET_FAVORITE_GAMES';
const SET_FAVORITE_GAMES_CAROUSEL = 'SET_FAVORITE_GAMES_CAROUSEL';
const SET_COUNT_FAVORITE_GAMES = 'SET_COUNT_FAVORITE_GAMES';
const SWAP = 'SWAP';
let newFavoriteGamesCarousel;

const initialState = {
	favoriteGames: {},
	favoriteGamesCarousel: {},
	favoriteGamesCounter: 0
}

const favoriteReducer = (state = initialState, action) => {
	switch(action.type){
		case ADD_FAVORITE_GAMES:
			return{
				...state,
				favoriteGames: {
					...state.favoriteGames,
					[action.value.id]: {
						name: action.value.name,
						favorite: !action.value.favorite
					}
				}
			}
		case REMOVE_FAVORITE_GAMES:
			return{
				...state,
				favoriteGames: {
					...state.favoriteGames,
					[action.value.id]: {
						...state.favoriteGames[action.value.id],
						favorite: !action.value.favorite
					}
				}
			}
		case SET_FAVORITE_GAMES:
			return{
				...state,
				favoriteGames: action.value
			}
		case SET_FAVORITE_GAMES_CAROUSEL:
			return{
				...state,
				favoriteGamesCarousel: action.value ? action.value : {}
			}
		case SET_COUNT_FAVORITE_GAMES:
			return{
				...state,
				favoriteGamesCounter: action.value
			}
		case SWAP:
			return{
				...state,
				favoriteGamesCarousel: action.value
			}
        default:
            return state;
    }
}

export const addFavoriteGames = (value) => {
	return{
		type: ADD_FAVORITE_GAMES,
		value
	}
}

export const removeFavoriteGames = (value) => {
	return{
		type: REMOVE_FAVORITE_GAMES,
		value
	}
}

export const setFavoriteGames = (value) => {
	return{
		type: SET_FAVORITE_GAMES,
		value
	}
}

export const setFavoriteGamesCarousel = (value) => {
	return{
		type: SET_FAVORITE_GAMES_CAROUSEL,
		value
	}
}

export const setCountFavoriteGames = (value) => {
	return{
		type: SET_COUNT_FAVORITE_GAMES,
		value
	}
}

export const swap = (value) => {
	return{
		type: SWAP,
		value
	}
}

export const initFavoriteGames = (favorite) => (dispatch) => {
	dispatch(setFavoriteGames(favorite));
}

export const initFavoriteGamesCount = (value) => (dispatch) => {
	dispatch(setCountFavoriteGames(value));
}

export const setFavoriteGamesAC = (value) => (dispatch) => {
	firebase.database().ref('users/' + user.uid + '/favoriteGames/' + value.id).set({
		favorite: !value.favorite,
		name: value.name
	});
	!value.favorite ? dispatch(addFavoriteGames(value)) : dispatch(removeFavoriteGames(value));
}

export const setFavoriteGamesCarouselAC = (name, favorite, count) => (dispatch) => {
	if(!favorite){
		firebase.database().ref('users/' + user.uid + '/favoriteGamesCarousel').update({
			[count - 1]: name
		});
	}
	else{
		firebase.database().ref('users/' + user.uid + '/favoriteGamesCarousel/' + getKeyByValue(count, name)).set({});
		firebase.database().ref('users/' + user.uid + '/favoriteGamesCarousel/').once('value', snapshot => {
			let j = 0;
			firebase.database().ref('users/' + user.uid + '/favoriteGamesCarousel/').set({});
			for(let i in snapshot.val()){
				firebase.database().ref('users/' + user.uid + '/favoriteGamesCarousel/').update({
					[j]: snapshot.val()[i]
				});
				j++;
			}
		})
	}
}

const getKeyByValue = (object, value) => {
	return Object.keys(object).find(key => object[key] === value);
}

export const initFavoriteGamesCarousel = (value) => (dispatch) => {
	dispatch(setFavoriteGamesCarousel(value));
}

export const setCountFavoriteGamesAC = (prevCount, count) => (dispatch) => {
	let c = parseInt(prevCount) + count;
	firebase.database().ref('users/' + user.uid + '/favoriteGamesCount/').set({
	 	count: c
	});
	dispatch(setCountFavoriteGames(c));
}

export const swapRightAC = (id, name, favoriteGamesCarousel) => (dispatch) => {
	newFavoriteGamesCarousel = {
		...favoriteGamesCarousel,
		[id]: favoriteGamesCarousel[id + 1],
		[id + 1]: name
	}
	firebase.database().ref('users/' + user.uid + '/favoriteGamesCarousel/').set(newFavoriteGamesCarousel);
	dispatch(swap(newFavoriteGamesCarousel));
}

export const swapLeftAC = (id, name, favoriteGamesCarousel) => (dispatch) => {
	newFavoriteGamesCarousel = {
		...favoriteGamesCarousel,
		[id]: favoriteGamesCarousel[id - 1],
		[id - 1]: name
	}
	firebase.database().ref('users/' + user.uid + '/favoriteGamesCarousel/').set(newFavoriteGamesCarousel);
	dispatch(swap(newFavoriteGamesCarousel));
}

export default favoriteReducer;