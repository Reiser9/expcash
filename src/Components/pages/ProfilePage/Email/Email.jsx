import React, {useState} from 'react';
import {connect} from 'react-redux';

import './Email.css';

import {sendVerificateEmail, editEmail} from '../../../../redux/auth-reducer.js';
import {requestEmail, requestVerificateEmail} from '../../../../redux/user-selectors.js';

const Email = ({sendVerificateEmail, editEmail, email, verificateEmail}) => {
	const [changeEmail, setChangeEmail] = useState(email);

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'changeEmail':
				setChangeEmail(value);
			default:
				break;
		}
	}

	const verificateUserEmail = () => {
		sendVerificateEmail();
	}

	const editUserEmail = () => {
		editEmail(changeEmail, email);
	}

	return(
		<div className="profile__edit--item">
			<div className="profile__edit--title">
				Электронная почта
			</div>

			<input type="text" id="changeEmail" value={changeEmail} className="input profile__edit--input" onChange={handleChange}/>

			<button className="button profile__edit--button" onClick={editUserEmail}>
				Изменить почту
			</button>

			{verificateEmail
			? <div className="profile__varificate--email">
				Почта подтверждена
			</div>
			: <button className="button profile__edit--button" onClick={verificateUserEmail}>
				Подтвердить почту
			</button>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		email: requestEmail(state),
		verificateEmail: requestVerificateEmail(state)
	}
}

export default connect(mapStateToProps, {sendVerificateEmail, editEmail})(Email);