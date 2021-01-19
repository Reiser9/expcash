import React from 'react';
import {connect} from 'react-redux';

import './Auth.css';

import {quitAccount} from '../../../../redux/auth-reducer.js';
import {modalOnOrOff} from '../../../Modal/modalCommon.js';
import {requestIsAuth, requestNick, requestImg, requestBalance} from '../../../../redux/user-selectors.js';
import {userIcon} from '../../../../redux/app-reducer.js';

const Auth = ({modalOnOrOff, isAuth, nick, img, quitAccount, balance}) => {
	const registerOn = () => {
		modalOnOrOff('setRegisterModalOn', true);
	}

	const enterOn = () => {
		modalOnOrOff('setEnterModalOn', true);
	}

	const quit = () => {
		quitAccount();
	}

	if(!isAuth){
		return(
			<div className="noregister__buttons">
				<button className="button noregister__button enter__button en" onClick={enterOn} >вход</button>
				<button className="button noregister__button register__button en" onClick={registerOn} >регистрация</button>
			</div>
		)
	}

	return(
		<>
		<div className="balance__inner">
		    <span className="en">
		        баланс:
		    </span>

		    <span className="blue">
		        <span className="balance">
		            {balance}
		        </span>
		        exp
		    </span>
		</div>

		<div onClick={quit} className="header__top--profile">
		    <span className="site__profile--img borderr">
		        <img src={img ? img : userIcon} alt="Аватарка" className="user__img" />
		    </span>

		    {nick}
		</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: requestIsAuth(state),
		nick: requestNick(state),
		img: requestImg(state),
		balance: requestBalance(state)
	}
}

export default connect(mapStateToProps, {quitAccount, modalOnOrOff})(Auth);