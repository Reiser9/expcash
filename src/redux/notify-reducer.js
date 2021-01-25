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

export const initNotifyAC = (userId = false) => (dispatch) => {
	let tempNotifyObj;
	if(userId){
		firebase.database().ref('users/' + userId.uid + '/notify').on('value', snapshot => {
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

export const patternNotify = (number, userId) => (dispatch) => {
	switch(number){
		case 'notify_send_succes':
			dispatch(addNotifyAC('Успешно', 'Уведомление отправлено', 'succes', 'fa-check', 1500));
			break;
		case 'remove_message':
			dispatch(addNotifyAC('Успешно!', 'Сообщение удалено!', 'succes', 'fa-check', 1000));
			break;
		case 'data_save':
			dispatch(addNotifyAC('Успешно!', 'Данные сохранены', 'succes', 'fa-check', 1000));
			break;
		case 'empty_message':
			dispatch(addNotifyAC('Ошибка!', 'Нельзя отправить пустое сообщение!', 'error', 'fa-times', 2000));
			break;
		case 'long_message':
			dispatch(addNotifyAC('Ошибка!', 'Длина сообщения не может превышать 100 символов!', 'error', 'fa-times', 2000));
			break;
		case 'limit_message':
			dispatch(addNotifyAC('Ошибка!', 'Можно отправлять сообщение раз в 5 секунд!', 'error', 'fa-times', 2000));
			break;
		case 'delete_faq':
			dispatch(addNotifyAC('Успешно!', 'Частый вопрос удален!', 'succes', 'fa-check', 1500));
			break;
		case 'request_area':
			dispatch(addNotifyAC('Ошибка!', 'Все поля должны быть заполнены!', 'error', 'fa-times', 2000));
			break;
		case 'add_faq_succes':
			dispatch(addNotifyAC('Успешно!', 'Частый вопрос добавлен', 'succes', 'fa-check', 1500));
			break;
		case 'delete_all_messages':
			dispatch(addNotifyAC('Успешно!', 'Все сообщения в чате удалены!', 'succes', 'fa-check', 1500));
			break;
		case 'messages_empty':
			dispatch(addNotifyAC('Ошибка!', 'Сообщений в чате не найдено!', 'error', 'fa-times', 1500));
			break;
		case 'enter_account':
			dispatch(addNotifyAC('Успешно!', 'Вы вошли в аккаунт!', 'succes', 'fa-check', 5500, userId));
			break;
		default:
			break;
	}
}

export const addNotifyAC = (title, text, type, icon, time = 5000, userId = user.uid, onlyClick = false) => (dispatch) => {
	let notifyData = {
		title,
		text,
		icon,
		type,
		time,
		userId,
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