import React, {useState} from 'react';
import {connect} from 'react-redux';
import {user} from '../../../redux/auth-reducer.js';

import './ProfilePage.css';

import {quitAccount, deleteAccount, updateDataUser, editPassword, sendVerificateEmail, editEmail} from '../../../redux/auth-reducer.js';
import {requestNick, requestImg, requestEmail, requestUid, requestBalance, requestChangeNickPrice, requestVerificateEmail} from '../../../redux/user-selectors.js';
import {userIcon} from '../../../redux/app-reducer.js';
import {patternNotify} from '../../../redux/notify-reducer.js';

import PrivatePageWrapper from '../PrivatePageWrapper.jsx';

const ProfilePage = ({quitAccount, deleteAccount, patternNotify, updateDataUser, changeNickPrice, editPassword, editEmail, sendVerificateEmail, nick, img, email, balance, verificateEmail}) => {
	const [userNick, setUserNick] = useState(nick);
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordAgain, setNewPasswordAgain] = useState('');
	const [changeEmail, setChangeEmail] = useState(email);

	const quit = () => {
		quitAccount('quit_account');
	}

	const del = () => {
		deleteAccount();
	}

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'editNick':
				setUserNick(value);
				break;
			case 'newPassword':
				setNewPassword(value);
				break;
			case 'newPasswordAgain':
				setNewPasswordAgain(value);
				break;
			case 'changeEmail':
				setChangeEmail(value);
			default:
				break;
		}
	}

	const editUserNick = () => {
		if(nick !== userNick){
			if(balance >= changeNickPrice){
				updateDataUser('nick', userNick, user.uid);
				updateDataUser('balance', balance - changeNickPrice, user.uid);
				patternNotify('nick_changed');
			}
			else{
				patternNotify('not_money');
			}
		}
		else{
			patternNotify('same_nick');
		}
	}

	const editUserPassword = () => {
		if(newPassword === newPasswordAgain){
			if(newPassword.length < 8){
				patternNotify('short_password');
			}
			else{
				editPassword(newPassword);
				setNewPassword('');
				setNewPasswordAgain('');
			}
		}
		else{
			patternNotify('dont_same_password');
		}
	}

	const verificateUserEmail = () => {
		sendVerificateEmail();
	}

	const editUserEmail = () => {
		if(email !== changeEmail){
			editEmail(changeEmail);
		}
		else{
			patternNotify('same_email');
		}
	}

	return(
		<PrivatePageWrapper>
			<div className="profile__inner">
				<div className="profile__info--inner">
					<div className="profile__info--img--inner">
						<img src={img ? img : userIcon} className="profile__info--img"/>
					</div>

					<div className="profile__info--name">
						{nick}
					</div>

					<div className="profile__info--id">
						{user?.uid}
					</div>

					<div className="profile__info--balance">
						{balance} exp
					</div>

					<button className="button profile__button--quit" onClick={quit}>
						Выйти
					</button>

					<button className="button profile__button--quit" onClick={del}>
						Удалить аккаунт
					</button>
				</div>

				<div className="profile__edit--inner">
					<div className="profile__edit--item">
						<div className="profile__edit--title">
							Данные
						</div>

						<input type="text" id="editNick" value={userNick} className="input profile__edit--input" onChange={handleChange}/>

						<button className="button profile__edit--button" onClick={editUserNick}>
							Сменить ник за {changeNickPrice} exp
						</button>
					</div>

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

					<div className="profile__edit--item">
						<div className="profile__edit--title">
							Электронная почта
						</div>

						<input type="text" id="changeEmail" value={changeEmail} className="input profile__edit--input" onChange={handleChange}/>

						<button class="button profile__edit--button" onClick={editUserEmail}>
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
				</div>
			</div>
		</PrivatePageWrapper>
	)
}

const mapStateToProps = (state) => {
	return{
		nick: requestNick(state),
		img: requestImg(state),
		email: requestEmail(state),
		balance: requestBalance(state),
		changeNickPrice: requestChangeNickPrice(state),
		verificateEmail: requestVerificateEmail(state)
	}
}

export default connect(mapStateToProps, {quitAccount, deleteAccount, patternNotify, updateDataUser, editPassword, sendVerificateEmail, editEmail})(ProfilePage);