import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const INIT_SITE_COLOR = 'INIT_SITE_COLOR';

const initialState = {
	userSiteColor: '',
	userNameColor: ''
}

const siteColorReducer = (state = initialState, action) => {
	switch(action.type){
		case INIT_SITE_COLOR:
			return{
				...state,
				userSiteColor: action.color,
				userNameColor: action.nameColor
			}
        default:
            return state;
    }
}

export const initSiteColor = (color, nameColor) => {
	return{
		type: INIT_SITE_COLOR,
		color,
		nameColor
	}
}

export const initSiteColorAC = (color, nameColor) => (dispatch) => {
	dispatch(initSiteColor(color, nameColor));
}

export const initSiteColorPromise = (user = false) => async (dispatch) => {
	let firebaseRef, auth;
	if(user){
		auth = true;
		firebaseRef = firebase.database().ref("users/" + user.uid + '/userSiteColor');
	}
	else{
		auth = false;
		firebaseRef = firebase.database().ref("siteColor/");
	}
	await firebaseRef.once('value').then(dataSnapshot => {
		let color, nameColor;
		if(auth){
			color = dataSnapshot.val().userSiteColor;
			nameColor = dataSnapshot.val().userNameColor;
		}
		else{
			color = dataSnapshot.val().color;
			nameColor = dataSnapshot.val().nameColor;
		}
		document.documentElement.style.setProperty("--blueC", color);
	    dispatch(initSiteColor(color, nameColor));
	});
}

export default siteColorReducer;