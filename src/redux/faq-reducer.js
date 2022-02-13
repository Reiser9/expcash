import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const INIT_FAQ = 'INIT_FAQ';
const SET_FAQ_PROGRESS = 'SET_FAQ_PROGRESS';

const initialState = {
	faq: {},
	faqProgress: true
}

const faqReducer = (state = initialState, action) => {
	switch(action.type){
		case INIT_FAQ:
			return{
				...state,
				faq: action.value
			}
		case SET_FAQ_PROGRESS:
			return{
				...state,
				faqProgress: action.value
			}
		default:
			return state
	}
}

export const initFaq = (value) => {
	return{
		type: INIT_FAQ,
		value
	}
}

export const setFaqProgress = (value) => {
	return{
		type: SET_FAQ_PROGRESS,
		value
	}
}

// Инициализировать частые вопросы
export const initFaqAC = (value) => (dispatch) => {
	firebase.database().ref('faq').on('value', snapshot => {
		dispatch(initFaq(snapshot.val()));
		dispatch(setFaqProgress(false));
	});
}

// Удалить частый вопрос, передав id
export const deleteFaqItem = (id) => (dispatch) => {
	firebase.database().ref('faq/' + id).set({});
	firebase.database().ref('faq/').once('value', snapshot => {
		let j = 0;
		firebase.database().ref('faq/').set({});
		for(let i in snapshot.val()){
			firebase.database().ref('faq/').update({
				[j]: snapshot.val()[i]
			});
			j++;
		}
	});
}

// Добавить частый вопрос, передав заголовок, текст и id
export const addFaq = (title, text, length) => (dispatch) => {
	firebase.database().ref('faq/' + length).set({
		title,
		text
	});
}

export default faqReducer;