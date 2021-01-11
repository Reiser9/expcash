const SET_ENTER_MODAL_ON = 'SET_ENTER_MODAL_ON';
const SET_REGISTER_MODAL_ON = 'SET_REGISTER_MODAL_ON';
const SET_RECOVERY_MODAL_ON = 'SET_RECOVERY_MODAL_ON';
const SET_COLOR_PICKER_MODAL_ON = 'SET_COLOR_PICKER_MODAL_ON';
const SET_HISTORY_MODAL_ON = 'SET_HISTORY_MODAL_ON';
const SET_FAQ_MODAL_ON = 'SET_FAQ_MODAL_ON';
const SET_AGREE_MODAL_ON = 'SET_AGREE_MODAL_ON';
const SET_MODAL_MENU_ON = 'SET_MODAL_MENU_ON';
const SET_FAVORITE_GAMES_MODAL_ON = 'SET_FAVORITE_GAMES_MODAL_ON';

const initialState = {
	enterModalOn: false,
	registerModalOn: false,
	recoveryModalOn: false,
	colorPickerModalOn: false,
	historyModalOn: false,
	faqModalOn: false,
	agreeModalOn: false,
	modalMenuOn: false,
	favoriteGamesModalOn: false
}

const modalReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_ENTER_MODAL_ON:
			return{
				...state,
				enterModalOn: action.value
			}
		case SET_REGISTER_MODAL_ON:
			return{
				...state,
				registerModalOn: action.value
			}
		case SET_RECOVERY_MODAL_ON:
			return{
				...state,
				recoveryModalOn: action.value
			}
		case SET_COLOR_PICKER_MODAL_ON:
			return{
				...state,
				colorPickerModalOn: action.value
			}
		case SET_HISTORY_MODAL_ON:
			return{
				...state,
				historyModalOn: action.value
			}
		case SET_FAQ_MODAL_ON:
			return{
				...state,
				faqModalOn: action.value
			}
		case SET_AGREE_MODAL_ON:
			return{
				...state,
				agreeModalOn: action.value
			}
		case SET_MODAL_MENU_ON:
			return{
				...state,
				modalMenuOn: action.value
			}
		case SET_FAVORITE_GAMES_MODAL_ON:
			return{
				...state,
				favoriteGamesModalOn: action.value
			}
		default:
			return state
	}
}

export const setEnterModalOn = (value) => {
	return{
		type: SET_ENTER_MODAL_ON,
		value
	}
}

export const setRegisterModalOn = (value) => {
	return{
		type: SET_REGISTER_MODAL_ON,
		value
	}
}

export const setRecoveryModalOn = (value) => {
	return{
		type: SET_RECOVERY_MODAL_ON,
		value
	}
}

export const setColorPickerModalOn = (value) => {
	return{
		type: SET_COLOR_PICKER_MODAL_ON,
		value
	}
}

export const setHistoryModalOn = (value) => {
	return{
		type: SET_HISTORY_MODAL_ON,
		value
	}
}

export const setFaqModalOn = (value) => {
	return{
		type: SET_FAQ_MODAL_ON,
		value
	}
}

export const setAgreeModalOn = (value) => {
	return{
		type: SET_AGREE_MODAL_ON,
		value
	}
}

export const setModalMenuOn = (value) => {
	return{
		type: SET_MODAL_MENU_ON,
		value
	}
}

export const setFavoriteGamesModalOn = (value) => {
	return{
		type: SET_FAVORITE_GAMES_MODAL_ON,
		value
	}
}

export const modalOpenAC = (id, value) => (dispatch) => {
	switch(id){
		case 'setEnterModalOn':
			dispatch(setEnterModalOn(value));
			break;
		case 'setRegisterModalOn':
			dispatch(setRegisterModalOn(value));
			break;
		case 'setRecoveryModalOn':
			dispatch(setRecoveryModalOn(value));
			break;
		case 'setColorPickerModalOn':
			dispatch(setColorPickerModalOn(value));
			break;
		case 'setHistoryModalOn':
			dispatch(setHistoryModalOn(value));
			break;
		case 'setFaqModalOn':
			dispatch(setFaqModalOn(value));
			break;
		case 'setAgreeModalOn':
			dispatch(setAgreeModalOn(value));
			break;
		case 'setModalMenuOn':
			dispatch(setModalMenuOn(value));
			break;
		case 'setFavoriteGamesModalOn':
			dispatch(setFavoriteGamesModalOn(value));
			break;
		default:
			break;
	}
}

export const modalAllOff = () => (dispatch) => {
	dispatch(setEnterModalOn(false));
	dispatch(setRegisterModalOn(false));
	dispatch(setRecoveryModalOn(false));
	dispatch(setColorPickerModalOn(false));
	dispatch(setHistoryModalOn(false));
	dispatch(setFaqModalOn(false));
	dispatch(setAgreeModalOn(false));
	dispatch(setModalMenuOn(false));
	dispatch(setFavoriteGamesModalOn(false));
}

export default modalReducer;