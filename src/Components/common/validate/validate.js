import $ from 'jquery';
import {createAccount, enterAccount, recoveryPassword} from '../../../redux/auth-reducer.js';

export const registerValid = (regNick, regPassword, regConfirmPassword, regEmail) => (dispatch) => {
	let regErrors = {};
	errorDelete("register__field");
	if(regNick.length < 3 || regNick.length >= 24){regErrors.regNick = 'Ник должен содержать минимум 3 и максимум 24 символа'}
	if(regPassword.length < 8){regErrors.regPassword = 'Пароль должен содержать минимум 8 символов'}
	if(regPassword !== regConfirmPassword){regErrors.regConfirmPassword = 'Пароли не совпадают'}
	if(!validMail(regEmail)){regErrors.regEmail = 'Некорректный адрес электронной почты'}

	if(Object.keys(regErrors).length !== 0){
		errorFlux(regErrors);
	}
	else{
		dispatch(createAccount(regEmail, regPassword, regNick));
	}
}

export const enterValid = (enterEmail, enterPassword) => (dispatch) => {
	let enterErrors = {};
	errorDelete("enter__field");
	if(!validMail(enterEmail)){enterErrors.enterEmail = 'Некорректный адрес электронной почты'}
	if(enterPassword.length < 1){enterErrors.enterPassword = 'Пароль не может быть пустым'}

	if(Object.keys(enterErrors).length !== 0){
		errorFlux(enterErrors);
	}
	else{
		dispatch(enterAccount(enterEmail, enterPassword));
	}
}

export const recoverValid = (recoveryEmail) => (dispatch) => {
	let recoverErrors = {};
	errorDelete("recover__field");
	if(!validMail(recoveryEmail)){recoverErrors.recoveryEmail = 'Некорректный адрес электронной почты'}

	if(Object.keys(recoverErrors).length !== 0){
		errorFlux(recoverErrors);
	}
	else{
		dispatch(recoveryPassword(recoveryEmail));
	}
}

const validMail = (email) => {
	return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
}

export const errorWrapper = (id, error) => {
	$("#"+id).parent(".modal__input--wrapper").append("<div class='input__error'>"+error+"</div>");
}

const errorFlux = (errors) => {
	let keys = Object.keys(errors);
	for(let i = 0; i < keys.length; i++){
		let id = keys[i];
		let error = errors[keys[i]];
		errorWrapper(id, error);
	}
	errors = {};
}

const errorDelete = (field) => {
	$("."+field).children(".modal__input--wrapper").children(".input__error").remove();
}