import React, {useState} from 'react';
import {connect} from 'react-redux';

import './Password.css';

import {editPassword} from '../../../../redux/auth-reducer.js';

const Password = ({editPassword}) => {
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordAgain, setNewPasswordAgain] = useState('');

	const editUserPassword = () => {
		editPassword(newPassword, newPasswordAgain, setNewPassword, setNewPasswordAgain);
	}

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'newPassword':
				setNewPassword(value);
				break;
			case 'newPasswordAgain':
				setNewPasswordAgain(value);
				break;
			default:
				break;
		}
	}

	return(
		<div className="profile__edit--item">
			<div className="profile__edit--title">
				Пароль
			</div>

			<input type="password" id="newPassword" value={newPassword} placeholder="Новый пароль" className="input profile__edit--input" onChange={handleChange}/>

			<input type="password" id="newPasswordAgain" value={newPasswordAgain} placeholder="Повторите новый пароль" className="input profile__edit--input" onChange={handleChange}/>

			<button className="button profile__edit--button" onClick={editUserPassword}>
				Сменить пароль
			</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {editPassword})(Password);