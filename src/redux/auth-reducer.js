import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

import {errorWrapper} from '../Components/common/validate/validate.js';
import {modalAllOff} from '../redux/modal-reducer.js';
import {initSiteColorPromise} from './siteColor-reducer.js';
import {setInitApp} from './app-reducer.js';
import {initFavoriteGames, initFavoriteGamesCarousel, initFavoriteGamesCount} from './favorite-reducer.js';
import {initNotifyAC, initNotify, patternNotify} from './notify-reducer.js';

const SET_AUTH = 'SET_AUTH';
const SET_REG_NICK = 'SET_REG_NICK';
const SET_REG_PASSWORD = 'SET_REG_PASSWORD';
const SET_REG_CONFIRM_PASSWORD = 'SET_REG_CONFIRM_PASSWORD';
const SET_REG_EMAIL = 'SET_REG_EMAIL';
const SET_REGISTER_AGREE = 'SET_REGISTER_AGREE';
const SET_IN_PROGRESS = 'SET_IN_PROGRESS';
const SET_ENTER_EMAIL = 'SET_ENTER_EMAIL';
const SET_ENTER_PASSWORD = 'SET_ENTER_PASSWORD';
const SET_NICK = 'SET_NICK';
const SET_EMAIL = 'SET_EMAIL';
const SET_BALANCE = 'SET_BALANCE';
const SET_IMG = 'SET_IMG';
const SET_RECOREVY_EMAIL = 'SET_RECOREVY_EMAIL';
const SET_ROLE = 'SET_ROLE';
const SET_USERS = 'SET_USERS';
const SET_ROLES = 'SET_ROLES';
const CHANGE_NICK_PRICE = 'CHANGE_NICK_PRICE';
const SET_VERIFICATE_EMAIL = 'SET_VERIFICATE_EMAIL';
export let user;

const initialState = {
	isAuth: false,
	regNick: '',
	regPassword: '',
	regConfirmPassword: '',
	regEmail: '',
	registerAgree: true,
	enterEmail: '',
	enterPassword: '',
	inProgress: false,
	nick: '',
	email: '',
	balance: 0,
	img: '',
	recoveryEmail: '',
	role: '',
	changeNickPrice: '',
	verificateEmail: false,
	users: {},
	roles: {}
}

const authReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_AUTH:
			return{
				...state,
				isAuth: action.value
			}
		case SET_REG_NICK:
			return{
				...state,
				regNick: action.value
			}
		case SET_REG_PASSWORD:
			return{
				...state,
				regPassword: action.value
			}
		case SET_REG_CONFIRM_PASSWORD:
			return{
				...state,
				regConfirmPassword: action.value
			}
		case SET_REG_EMAIL:
			return{
				...state,
				regEmail: action.value
			}
		case SET_REGISTER_AGREE:
			return{
				...state,
				registerAgree: action.value
			}
		case SET_IN_PROGRESS:
			return{
				...state,
				inProgress: action.value
			}
		case SET_ENTER_EMAIL:
			return{
				...state,
				enterEmail: action.value
			}
		case SET_ENTER_PASSWORD:
			return{
				...state,
				enterPassword: action.value
			}
		case SET_NICK:
			return{
				...state,
				nick: action.value
			}
		case SET_EMAIL:
			return{
				...state,
				email: action.value
			}
		case SET_BALANCE:
			return{
				...state,
				balance: action.value
			}
		case SET_IMG:
			return{
				...state,
				img: action.value
			}
		case SET_RECOREVY_EMAIL:
			return{
				...state,
				recoveryEmail: action.value
			}
		case SET_ROLE:
			return{
				...state,
				role: action.value
			}
		case SET_USERS:
			return{
				...state,
				users: action.value
			}
		case SET_ROLES:
			return{
				...state,
				roles: action.value
			}
		case CHANGE_NICK_PRICE:
			return{
				...state,
				changeNickPrice: action.value
			}
		case SET_VERIFICATE_EMAIL:
			return{
				...state,
				verificateEmail: action.value
			}
        default:
            return state;
    }
}

export const setAuth = (value) => {
	return{
		type: SET_AUTH,
		value
	}
}

export const setRegNick = (value) => {
	return{
		type: SET_REG_NICK,
		value
	}
}

export const setRegPassword = (value) => {
	return{
		type: SET_REG_PASSWORD,
		value
	}
}

export const setRegConfirmPassword = (value) => {
	return{
		type: SET_REG_CONFIRM_PASSWORD,
		value
	}
}

export const setRegEmail = (value) => {
	return{
		type: SET_REG_EMAIL,
		value
	}
}

export const setRegisterAgree = (value) => {
	return{
		type: SET_REGISTER_AGREE,
		value
	}
}

export const setInProgress = (value) => {
	return{
		type: SET_IN_PROGRESS,
		value
	}
}

export const setEnterEmail = (value) => {
	return{
		type: SET_ENTER_EMAIL,
		value
	}
}

export const setEnterPassword = (value) => {
	return{
		type: SET_ENTER_PASSWORD,
		value
	}
}

export const setNick = (value) => {
	return{
		type: SET_NICK,
		value
	}
}

export const setEmail = (value) => {
	return{
		type: SET_EMAIL,
		value
	}
}

export const setBalance = (value) => {
	return{
		type: SET_BALANCE,
		value
	}
}

export const setImg = (value) => {
	return{
		type: SET_IMG,
		value
	}
}

export const setRecoveryEmail = (value) => {
	return{
		type: SET_RECOREVY_EMAIL,
		value
	}
}

export const setRole = (value) => {
	return{
		type: SET_ROLE,
		value
	}
}

export const setUsers = (value) => {
	return{
		type: SET_USERS,
		value
	}
}

export const setRoles = (value) => {
	return{
		type: SET_ROLES,
		value
	}
}

export const setChangeNickPrice = (value) => {
	return{
		type: CHANGE_NICK_PRICE,
		value
	}
}

export const setVerificateEmail = (value) => {
	return{
		type: SET_VERIFICATE_EMAIL,
		value
	}
}

export const setDataAC = (id, value) => (dispatch) => {
	switch(id){
		case 'regNick':
			dispatch(setRegNick(value));
			break;
		case 'regPassword':
			dispatch(setRegPassword(value));
			break;
		case 'regConfirmPassword':
			dispatch(setRegConfirmPassword(value));
			break;
		case 'regEmail':
			dispatch(setRegEmail(value));
			break;
		case 'registerAgree':
			dispatch(setRegisterAgree(value));
			break;
		case 'enterEmail':
			dispatch(setEnterEmail(value));
			break;
		case 'enterPassword':
			dispatch(setEnterPassword(value));
			break;
		case 'recoveryEmail':
			dispatch(setRecoveryEmail(value));
			break;
		case 'nick':
			dispatch(setNick(value));
			break;
		case 'balance':
			dispatch(setBalance(value));
			break;
		case 'role':
			dispatch(setRole(value));
			break;
		default:
			break;
	}
}

// Записываем верификацию email в бд
export const verificateEmailSucces = () => {
	let verEmail = user.emailVerified;
	firebase.database().ref('users/' + user.uid).update({
		verificateEmail: verEmail
	});
}

// Получаем прочие данные
export const getDataSite = () => async (dispatch) => {
	await firebase.database().ref('data').on('value', snapshot => {
		dispatch(setChangeNickPrice(snapshot.val().changeNickPrice));
	});
}

// Получить все роли на сайте(user, admin, moder и т.д)
export const getRoles = (value) => async (dispatch) => {
	await firebase.database().ref('roles').on('value', snapshot => {
		dispatch(setRoles(snapshot.val()));
	});
}

// Очистить redux после выхода с аккаунта
export const clearRedux = () => (dispatch) => {
	dispatch(setEmail(''));
	dispatch(setNick(''));
	dispatch(setBalance(0));
	dispatch(setImg(''));
	dispatch(setRole(''));
	dispatch(initNotify({}));
}

// Получить все игры сайта(expDuel, expBattler и прочее)
export const getAllGames =  () => {
	let allGames = {};
	firebase.database().ref('games').on('value', snapshot => {
		let counter = 0;
		for(let i in snapshot.val()){
			allGames[counter] = {
				favorite: false,
				name: snapshot.val()[i]
			}
			counter++;
		}
	});
	return allGames;
}

// Изменить какое-то поле пользователя, передаем название поля, к примеру nick, значение и uid пользователя, которому нужно что-то поменять
export const updateDataUser = (id, value, userId) => (dispatch) => {
	firebase.database().ref('users/' + userId).update({
		[id]: value
	});
}

// Подтвердить почту
export const sendVerificateEmail = () => async (dispatch) => {
	await user.sendEmailVerification().then(function() {
		dispatch(patternNotify('send_mail_verification_succes'));
	}).catch(() => {
		dispatch(patternNotify('send_mail_verification_error'));
	});
}

// Изменить почту
export const editEmail = (editEmail) => async (dispatch) => {
	await user.updateEmail(editEmail).then(function(){
		dispatch(updateDataUser('email', editEmail, user.uid));
		dispatch(patternNotify('edit_email_succes'));
	}).catch(() => {
		dispatch(patternNotify('invalid_email'));
	});
}

// Регистрация аккаунта, передаем email, пароль, ник
export const createAccount = (regEmail, regPassword, regNick) => async (dispatch) => {
	dispatch(setInProgress(true));
	await firebase.auth().createUserWithEmailAndPassword(regEmail, regPassword).then(user => {
		dispatch(setInitApp(false));

	    firebase.database().ref('users/' + user.user.uid).set({
	    	email: regEmail,
	        nick: regNick,
	        balance: 0,
	        uid: user.user.uid,
	        role: 'user',
	        img: '',
	        favoriteGames: getAllGames(),
	        verificateEmail: false,
	        favoriteGamesCount: {
	        	count: 0
	        },
	        userSiteColor: {
	        	userSiteColor: 'rgb(81, 127, 241)',
	        	userNameColor: 'blue'
	        }
	    });
	    dispatch(patternNotify('create_account'));
	    dispatch(modalAllOff());
	    inputEmpty(['regNick', 'regPassword', 'regConfirmPassword', 'regEmail'], dispatch);
	    
	    dispatch(setInProgress(false));
	    dispatch(setAuth(true));
	    dispatch(setInitApp(true));
	}).catch(error => {
		errorCatch(error.code, 'auth/email-already-in-use', 'regEmail', 'Адрес электронной почты занят');
		dispatch(setInProgress(false));
	});
}

// Вход в аккаунт, передаем email и пароль для входа
export const enterAccount = (enterEmail, enterPassword) => async (dispatch) => {
	dispatch(setInProgress(true));
	await firebase.auth().signInWithEmailAndPassword(enterEmail, enterPassword).then(user => {
		dispatch(setInitApp(false));

		dispatch(patternNotify('enter_account'));
		dispatch(modalAllOff());
		inputEmpty(['enterEmail', 'enterPassword'], dispatch);

		dispatch(setAuth(true));
		dispatch(setInProgress(false));
		dispatch(setInitApp(true));
	}).catch(error => {
		errorCatch(error.code, 'auth/user-not-found', 'enterEmail', 'Неверный адрес электронной почты или пароль');
		errorCatch(error.code, 'auth/wrong-password', 'enterEmail', 'Неверный адрес электронной почты или пароль');
		dispatch(setInProgress(false));
	});
}

// Восстановление пароля, передаем email, на который нужно выслать письмо
export const recoveryPassword = (recoverEmail) => async (dispatch) => {
	dispatch(setInProgress(true));
	await firebase.auth().sendPasswordResetEmail(recoverEmail).then(function(){
		dispatch(setInitApp(false));
		dispatch(patternNotify('recovery_password'));
		dispatch(modalAllOff());
		inputEmpty(['recoveryEmail'], dispatch);
		dispatch(setInProgress(false));

		dispatch(setInitApp(true));
	}).catch(function(error) {
		errorCatch(error.code, 'auth/user-not-found', 'recoveryEmail', 'Пользователь не найден');
		dispatch(setInProgress(false));
	});
}

// Херня, которая следит за авторизованностью пользователя
export const authStateListener = () => async (dispatch) => {
  	await firebase.auth().onAuthStateChanged(user => {
  		userData();
  		dispatch(getUsers());
  		dispatch(getRoles());
  		dispatch(getDataSite());
  		if(user){
	  		dispatch(initSiteColorPromise(user));
	  		dispatch(getDataUser());
	 		dispatch(initNotifyAC(user));
	 		dispatch(setAuth(true));
	 		dispatch(verificateEmailSucces());
	   	}else{
	    	dispatch(initSiteColorPromise());
	   		dispatch(initNotifyAC());
	   		dispatch(setAuth(false));
	    }
  	});
}

// Получаем данные пользователя
export const getDataUser = () => async (dispatch) => {
	await firebase.database().ref('users/' + user.uid).on('value', snapshot => {
		// Проверяем, если пользователь авторизован, тогда получаем данные о нем
		if(user){
			// Если данных нет, либо аккаунт пользователя удалили, тогда выходим с аккаунта с пометкой "Аккаунт удален"
			if(snapshot.val() == null){
				dispatch(quitAccount('quit_account_delete'));
			}
			// Иначе записываем данные пользователя в redux
			else{
				dispatch(setNick(snapshot.val().nick));
				dispatch(setEmail(snapshot.val().email));
				dispatch(setBalance(snapshot.val().balance));
				dispatch(setImg(snapshot.val().img));
				dispatch(setRole(snapshot.val().role));
				dispatch(initFavoriteGames(snapshot.val().favoriteGames));
				dispatch(initFavoriteGamesCarousel(snapshot.val().favoriteGamesCarousel));
				dispatch(initFavoriteGamesCount(snapshot.val().favoriteGamesCount.count));
				dispatch(setVerificateEmail(snapshot.val().verificateEmail));
			}
		}
	});
}

// Сменить пароль
export const editPassword = (password) => (dispatch) => {
	user.updatePassword(password).then(function() {
		dispatch(patternNotify('edit_password_succes'));
	});
}

// Получаем всех пользователей, для работы с ними
export const getUsers = () => async (dispatch) => {
	await firebase.database().ref('users').on('value', snapshot => {
		dispatch(setUsers(snapshot.val()));
	});
}

// Выходим с аккаунта, передать можно пометку почему мы вышли с него(добровольно, либо аккаунт удалили)
export const quitAccount = (leave) => async (dispatch) => {
	dispatch(setInitApp(false));
	await firebase.auth().signOut().then(function() {
	    dispatch(patternNotify(leave));
	    // Чистим redux, что бы не было багов, якобы мы авторизованы
	    dispatch(clearRedux());
	    dispatch(setInitApp(true));
	});
}

export const deleteAccount = () => async (dispatch) => {
	dispatch(setInitApp(false));
	await user.delete().then(function(){
		firebase.database().ref('users/' + user.uid).set({});
		dispatch(setInitApp(true));
	});
}

// Функция обертки полей с ошибками, передаем ошибку, код ошибки, id поля и текст, который хотим увидеть на ошибке(поля авторизации, регистрации)
const errorCatch = (error, errorCode, id, text) => {
	if(error === errorCode){errorWrapper(id, text)}
}

// После удачного входа, обнуляем значения полей
const inputEmpty = (arr, dispatch) => {
	for(let i = 0; i < arr.length; i++){
		dispatch(setDataAC(arr[i], ''));
	}
}

// Храним в переменной user данные об авторизованном пользователе, что бы в любой момент обратиться к ней
export const userData = () => {
	user = firebase.auth().currentUser;
}

export default authReducer;