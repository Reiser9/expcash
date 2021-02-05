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

export const getTimeId = () => {
	let time = new Date();
	return time.getTime();
}

// Инициализация уведомлений, принимает true/false, авторизован ли пользователь
export const initNotifyAC = (userId = false) => (dispatch) => {
	let tempNotifyObj;
	// Если авторизован, тогда берем уведомления, если есть, с аккаунта пользователя
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
	// Берем в любом случае уведомления, если есть, у всех
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

// Заголовок, текст, тип(ошибка, успех, инфо), иконка уведомления, время после которого уведомление удалится, удалять только по нажатию,
// добавить уведомление только в редакс(нужно для уведомлений анонимного характера: при выходе с аккаунта, заходе, регистрации, сбросе)
export const addNotifyAC = (title, text, type, icon, time = 5000, userId = user.uid, onlyClick = false, onlyRedux = false) => (dispatch) => {
	// Формируем объект уведомления, взяв за id время в ms, что бы оно никак не повторялось
	let notifyData = {
		[getTimeId()]: {
			title,
			text,
			icon,
			type,
			time,
			userId,
			onlyClick,
			id: getTimeId()
		}
	}

	// Уведомления могут быть анонимные, без использования базы данных, только для redux
	if(!onlyRedux){
		userId === 'all' ? firebase.database().ref('notify').update(notifyData) : firebase.database().ref('users/' + userId + '/notify').update(notifyData);
	}

	// Добавляем уведомление и делаем уведомления не пустыми
	dispatch(addNotify(notifyData));
	dispatch(setNotifyEmpty(false));
}

// Принимаем id уведомления, uid пользователя, либо иное(all, redux), и кол-во уведомлений всего
export const removeNotifyAC = (index, userId, number) => (dispatch) => {
	// Если уведомление для всех
	if(userId === 'all'){
		firebase.database().ref('notify/' + index).set({});
	}
	// Если уведомления анонимные, из redux
	else if(userId !== 'redux'){
		firebase.database().ref('users/' + userId + '/notify/' + index).set({});
	}
	// Удаляем уведомление
	dispatch(removeNotify(index));
	number - 1 === 0 && dispatch(setNotifyEmpty(true));
}

// Шаблон уведомления, принимает тип уведомления
// Заголовок, текст, тип, иконка, время(необязательно, дефолт 5000 = 5с), uid, либо (all, redux), необязательно, дефолт user.uid,
// Удалять только по клику(необязательно, дефолт false), только для redux(необязательно, дефолт false)
export const patternNotify = (number) => (dispatch) => {
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
			dispatch(addNotifyAC('Успешно!', 'Вы вошли в аккаунт!', 'succes', 'fa-check', 2000, 'redux', false, true));
			break;
		case 'create_account':
			dispatch(addNotifyAC('Успешно!', 'Вы создали аккаунт!', 'succes', 'fa-check', 2000, 'redux', false, true));
			break;
		case 'recovery_password':
			dispatch(addNotifyAC('Пароль сброшен!', 'В скором времени вам поступит письмо на почту с подробной информацией!', 'succes', 'fa-check', 5000, 'redux', false, true));
			break;
		case 'quit_account':
			dispatch(addNotifyAC('Успешно!', 'Вы вышли с аккаунта!', 'succes', 'fa-check', 2000, 'redux', false, true));
			break;
		case 'quit_account_delete':
			dispatch(addNotifyAC('Внимание!', 'Аккаунт был удален!', 'info', 'fa-exclamation', 3000, 'redux', false, true));
			break;
		case 'not_money':
			dispatch(addNotifyAC('Ошибка!', 'Недостаточно средств для смены ника!', 'error', 'fa-times', 2000));
			break;
		case 'nick_changed':
			dispatch(addNotifyAC('Успешно!', 'Ник изменен!', 'succes', 'fa-check', 2000));
			break;
		case 'same_nick':
			dispatch(addNotifyAC('Ошибка!', 'Ник не изменен!', 'error', 'fa-times', 2000));
			break;
		case 'dont_same_password':
			dispatch(addNotifyAC('Ошибка!', 'Пароли не совпадают!', 'error', 'fa-times', 2000));
			break;
		case 'short_password':
			dispatch(addNotifyAC('Ошибка!', 'Пароли не может быть менее 8 символов!', 'error', 'fa-times', 2000));
			break;
		case 'edit_password_succes':
			dispatch(addNotifyAC('Успешно!', 'Пароль изменен!', 'succes', 'fa-check', 2000));
			break;
		case 'send_mail_verification_succes':
			dispatch(addNotifyAC('Успешно!', 'Письмо с подтверждением отправлено!', 'succes', 'fa-check', 2000));
			break;
		case 'send_mail_verification_error':
			dispatch(addNotifyAC('Ошибка!', 'Нельзя так часто, попробуйте позже!', 'error', 'fa-times', 2000));
			break;
		case 'same_email':
			dispatch(addNotifyAC('Ошибка!', 'Почта не изменена!', 'error', 'fa-times', 2000));
			break;
		case 'edit_email_succes':
			dispatch(addNotifyAC('Успешно!', 'Почта изменена!', 'succes', 'fa-check', 2000));
			break;
		case 'invalid_email':
			dispatch(addNotifyAC('Ошибка!', 'Почта введена некорректно!', 'error', 'fa-times', 2000));
			break;
		default:
			break;
	}
}

export default notifyReducer;