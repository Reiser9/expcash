import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

import {user} from './auth-reducer.js';

const SET_ONLINE = 'SET_ONLINE';
const SET_MESSAGE = 'SET_MESSAGE';
const ADD_MESSAGE = 'ADD_MESSAGE';
const SET_INIT_CHAT = 'SET_INIT_CHAT';

const initialState = {
	online: 0,
	message: '',
	messages: [],
	initChat: false
}

const chatReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_ONLINE:
			return{
				...state,
				online: action.value
			}
		case SET_MESSAGE:
			return{
				...state,
				message: action.value
			}
		case ADD_MESSAGE:
			return{
				...state,
				messages: action.value
			}
		case SET_INIT_CHAT:
			return{
				...state,
				initChat: action.value
			}
		default:
			return state
	}
}

export const setOnline = (value) => {
	return{
		type: SET_ONLINE,
		value
	}
}

export const setMessage = (value) => {
	return{
		type: SET_MESSAGE,
		value
	}
}

export const addMessage = (value) => {
	return{
		type: ADD_MESSAGE,
		value
	}
}

export const setInitChat = (value) => {
	return{
		type: SET_INIT_CHAT,
		value
	}
}

export const setOnlineAC = (value) => (dispatch) => {
	dispatch(setOnline(value));
}

export const setMessageAC = (value) => (dispatch) => {
	dispatch(setMessage(value));
}

export const addMessageAC = (value) => (dispatch) => {
	dispatch(addMessage(value));
}

export const setInitChatAC = (value) => (dispatch) => {
	dispatch(setInitChat(value));
}

// Получить все сообщения
export const getAllMessages = () => (dispatch) => {
	firebase.database().ref('chat').limitToLast(75).on('value', snapshot => {
		let tempMessages = [];
		for(var i in snapshot.val()){
			tempMessages.push(snapshot.val()[i]);
		}
		dispatch(addMessageAC(tempMessages));
		dispatch(setInitChatAC(true));
	});
}

// Получить дату, для образования id сообщения
export const getDate = () => {
	let TimezoneOffset = 3;
	let localTime = new Date(); 
	let ms = localTime.getTime() + (localTime.getTimezoneOffset() * 60000) + TimezoneOffset * 3600000;
	let date = new Date(ms);

	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let miliseconds = date.getMilliseconds();

	if(hours < 10){
		hours = '0' + hours;
	}
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	if(seconds < 10){
		seconds = '0' + seconds;
	}

	return date.getDate() + "" + (date.getMonth() + 1) + "" 
	+ date.getFullYear() + "" + hours + "" + minutes + "" + seconds + "" + miliseconds;
}

// Отправить сообщение
export const sendMessage = (message) => (dispatch) => {
	let fullDate = getDate();
	
	let nick, img, role;
	firebase.database().ref('users/' + user.uid).on('value', snapshot => {
		nick = snapshot.val().nick;
		img = snapshot.val().img;
		role = snapshot.val().role;
	});

	let mes = {
		img: img,
		message: message,
		nick: nick,
		uid: user.uid,
		role: role,
		time: fullDate
	}

	firebase.database().ref('chat/' + fullDate + nick).set(mes);
	dispatch(setMessage(''));
}

// Удалить все сообщения из чата
export const clearChatAdmin = () => {
	firebase.database().ref('chat/').set({});
}

// Удалить сообщение из чата, передав время и ник
export const chatDeleteMessage = (time, nick) => {
	firebase.database().ref('chat/' + time + nick).set({});
}

export default chatReducer;