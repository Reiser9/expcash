import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

import {user} from './auth-reducer.js';

const INIT_NOTIFY = 'INIT_NOTIFY';
const ADD_NOTIFY = 'ADD_NOTIFY';
const REMOVE_NOTIFY = 'REMOVE_NOTIFY';
const SET_NOTIFY_EMPTY = 'SET_NOTIFY_EMPTY';

const initialState = {
	notify: {},
	notifyEmpty: true
}

const notifyReducer = (state = initialState, action) => {
	switch(action.type){
		case INIT_NOTIFY:
			return{
				...state,
				notify: {
					...state.notify,
					...action.value
				}
			}
		case ADD_NOTIFY:
			return{
				...state,
				notify: {
					...state.notify,
					...action.value
				}
			}
		case REMOVE_NOTIFY:
			let removedObj = {
				...state.notify
			}
			delete removedObj[action.value];
			return{
				...state,
				notify: removedObj
			}
		case SET_NOTIFY_EMPTY:
			return{
				...state,
				notifyEmpty: action.value
			}
		default:
			return state
	}
}

export const initNotify = (value) => {
	return{
		type: INIT_NOTIFY,
		value
	}
}

export const addNotify = (value) => {
	return{
		type: ADD_NOTIFY,
		value
	}
}

export const removeNotify = (value) => {
	return{
		type: REMOVE_NOTIFY,
		value
	}
}

export const setNotifyEmpty = (value) => {
	return{
		type: SET_NOTIFY_EMPTY,
		value
	}
}

export const initNotifyAC = (user = false) => (dispatch) => {
	let tempNotifyObj;
	if(user){
		firebase.database().ref('users/' + user.uid + '/notify').on('value', snapshot => {
			if(snapshot.val() !== null){
				tempNotifyObj = {
					...snapshot.val()
				};
				dispatch(initNotify(tempNotifyObj));
				dispatch(setNotifyEmpty(false));
			}
		});
	}
	firebase.database().ref('notify').on('value', snapshot => {
		if(snapshot.val() !== null){
			tempNotifyObj = {
				...snapshot.val()
			};
			dispatch(initNotify(tempNotifyObj));
			dispatch(setNotifyEmpty(false));
		}
	});
}

export const addNotifyAC = (title, text, type, icon, time = 5000, userId = user.uid, onlyClick = false) => (dispatch) => {
	let notifyData = {
		title,
		text,
		icon,
		type,
		userId,
		time,
		onlyClick

	}
	let notifySnapshot;
	firebase.database().ref('notify').on('value', snapshot => {
		notifySnapshot = {
			...notifySnapshot,
			...snapshot.val()
		}
	});

	firebase.database().ref('users/' + user.uid + '/notify').on('value', snapshot => {
		notifySnapshot = {
			...notifySnapshot,
			...snapshot.val()
		}
	});

	if(Object.keys(notifySnapshot).length !== 0){
		let ind;
		for(let i in notifySnapshot){
			ind = i;
		}
		notifyData = {
			[parseInt(ind) + 1]: {
				...notifyData,
				id: parseInt(ind) + 1
			}
		}
	}
	else{
		notifyData = {
			0: {
				...notifyData,
				id: 0
			}
		};
	}

	userId === 'all' ? firebase.database().ref('notify').update(notifyData) : firebase.database().ref('users/' + userId + '/notify').update(notifyData);
	dispatch(addNotify(notifyData));
	dispatch(setNotifyEmpty(false));
}

export const removeNotifyAC = (index, userId) => (dispatch) => {
	if(userId === 'all'){
		firebase.database().ref('notify/' + index).set({});
	}
	else{
		firebase.database().ref('users/' + userId + '/notify/' + index).set({});
	}
	dispatch(removeNotify(index));
	dispatch(setNotifyEmpty(true));
}

export default notifyReducer;