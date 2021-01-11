import {modalOpenAC, modalAllOff} from '../../redux/modal-reducer.js';

export const modalOnAndAllOff = (modal, onOrOff) => (dispatch) => {
	dispatch(modalAllOff());
    dispatch(modalOpenAC(modal, onOrOff));
}

export const modalOnOrOff = (modal, onOrOff) => (dispatch) => {
	dispatch(modalOpenAC(modal, onOrOff));
}

export const modalOnAndAllOffAndModalOff = (modalOn) => (dispatch) => {
	dispatch(modalAllOff());
    dispatch(modalOpenAC(modalOn, true));
    dispatch(modalOpenAC('setModalMenuOn', false));
}

export const modalOnAndModalOff = (modalOn) => (dispatch) => {
    dispatch(modalOpenAC(modalOn, true));
    dispatch(modalOpenAC('setModalMenuOn', false));
}