import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

import {user} from './authReducer.js';

const INIT_NOTIFY = 'INIT_NOTIFY';
const ADD_NOTIFY = 'ADD_NOTIFY';
const REMOVE_NOTIFY = 'REMOVE_NOTIFY';
let newNotifyUser;

const initialState = {
	notify: {}
}

const notifyReducer = (state = initialState, action) => {
	switch(action.type){
		case INIT_NOTIFY:
			return{
				...state,
				notify: action.value
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
			return{
				...state
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

export const initNotifyAC = (user = false) => (dispatch) => {
	let tempNotifyObj;
	if(user){
		firebase.database().ref('users/' + user.uid + '/notify').on('value', snapshot => {
			if(snapshot.val() !== null){
				tempNotifyObj = {
					...tempNotifyObj,
					...snapshot.val()
				};
				dispatch(initNotify(tempNotifyObj));
			}
		});
	}
	firebase.database().ref('notify').on('value', snapshot => {
		if(snapshot.val() !== null){
			tempNotifyObj = {
				...tempNotifyObj,
				...snapshot.val()
			};
			dispatch(initNotify(tempNotifyObj));
		}
	});
}

export const addNotifyAC = (title, text, type, icon) => (dispatch) => {
	let notifyData = {
		title,
		text,
		icon,
		type,
	}
	let notifySnapshot;
	firebase.database().ref('notify').on('value', snapshot => {
		notifySnapshot = snapshot.val();
	});

	if(notifySnapshot !== null){
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
	firebase.database().ref('notify').update(notifyData);
	dispatch(addNotify(notifyData));
}

export const addNotifyForUserAC = (title, text, type, icon) => (dispatch) => {

}

export const removeNotifyAC = () => (dispatch) => {

}

export default notifyReducer;