import React, {useState} from 'react';
import {connect} from 'react-redux';
import {user} from '../../../redux/auth-reducer.js';

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import './ProfilePage.css';

import {quitAccount, deleteAccount, updateDataUser, editPassword, sendVerificateEmail, editEmail, uploadImg} from '../../../redux/auth-reducer.js';
import {requestNick, requestImg, requestEmail, requestUid, requestBalance, requestChangeNickPrice, requestVerificateEmail} from '../../../redux/user-selectors.js';
import {userIcon} from '../../../redux/app-reducer.js';
import {patternNotify} from '../../../redux/notify-reducer.js';
import {getDate} from '../../../redux/chat-reducer.js';

import PrivatePageWrapper from '../PrivatePageWrapper.jsx';

const ProfilePage = ({uploadImg, quitAccount, deleteAccount, patternNotify, updateDataUser, changeNickPrice, editPassword, editEmail, sendVerificateEmail, nick, img, email, balance, verificateEmail}) => {
	const [userNick, setUserNick] = useState(nick);
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordAgain, setNewPasswordAgain] = useState('');
	const [changeEmail, setChangeEmail] = useState(email);
	const [avaProgress, setAvaProgress] = useState(false);

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
				editPassword(newPassword, setNewPassword, setNewPasswordAgain);
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

	const uploadUserImg = () => {
		let value = document.getElementById("ava").files[0];
		// uploadImg(value, setProgress);
		let time = getDate();
		let storageRef = firebase.storage().ref('avatars/' + time).put(value);

		storageRef.on('state_changed', 
			snapshot => {
				setAvaProgress(true);
			},
			error => {},
			() => {
				firebase.storage().ref('avatars').child(time).getDownloadURL().then(url => {
					firebase.database().ref('users/' + user.uid).update({
						img: url,
						imgId: time
					});
					setAvaProgress(false);
					patternNotify('avatar_succes');
				});
			}
		);
	}

	return(
		<PrivatePageWrapper>
			<div className="profile__inner">
				<div className="profile__info--inner">
					<div className="profile__info--img--inner">
						<img src={img ? img : userIcon} className="profile__info--img"/>

						{avaProgress 
						? <div className="avatar__load">
							Загрузка..
						</div> 
						: <div className="profile__info--edit--img--inner">
							<input type="file" id="ava" accept="image/jpeg,image/png" onChange={uploadUserImg}/>

							<label for="ava" className="profile__info--edit--img--label">
								<span className="profile__info--edit--img--label--inner">
									<svg width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
									viewBox="0 0 480.24 480.24" xmlSpace="preserve">
									<g><g><g><path fill="white" d="M391.86,144.552c0.16-2.712,0.248-5.464,0.248-8.312c0.09-59.919-39.046-112.838-96.364-130.3
									c-71.85-21.89-147.842,18.61-169.732,90.46c-2.024-0.104-3.976-0.16-5.904-0.16c-66.274,0-120,53.726-120,120s53.726,120,120,120
									h72.088c4.418,0,8-3.582,8-8s-3.582-8-8-8h-72.088c-57.438,0-104-46.562-104-104s46.562-104,104-104
									c3.688,0.01,7.373,0.211,11.04,0.6c3.93,0.329,7.534-2.2,8.56-6.008c13.401-53.473,61.51-90.937,116.637-90.828
									c66.274,0.13,119.894,53.962,119.763,120.236c0.021,4.99-0.303,9.975-0.968,14.92c-0.049,0.358-0.073,0.72-0.073,1.081
									c0.001,4.418,3.583,7.999,8.001,7.999h1.04c44.183,0,80,35.817,80,80c0,44.183-35.817,80-80,80h-95.464c-4.418,0-8,3.582-8,8
									s3.582,8,8,8h95.464c50.028,0.01,91.677-38.401,95.707-88.267C484.086,195.127,444.707,148.823,391.86,144.552z"/>
									<polygon fill="white" points="336.276,245.088 240.108,148.928 143.94,245.088 155.26,256.408 232.108,179.552 232.108,480.24 248.108,480.24 
									248.108,179.552 324.956,256.408"/></g></g></g><g></g><g></g>
									<g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
								</span>
							</label>
						</div>}
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

					<div className="profile__edit--item">
						<div className="profile__edit--title">
							Данные
						</div>

						<input type="text" id="editNick" value={userNick} className="input profile__edit--input" onChange={handleChange}/>

						<button className="button profile__edit--button" onClick={editUserNick}>
							{changeNickPrice === '0' ? 'Сменить ник бесплатно' : `Сменить ник за ${changeNickPrice} exp`}
						</button>
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

export default connect(mapStateToProps, {uploadImg, quitAccount, deleteAccount, patternNotify, updateDataUser, editPassword, sendVerificateEmail, editEmail})(ProfilePage);