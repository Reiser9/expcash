import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';

import './MobileMenu.css';

import {modalOnAndAllOff, modalOnOrOff, modalOnAndAllOffAndModalOff, modalOnAndModalOff} from '../modalCommon.js';
import {requestIsAuth, requestRole, requestNick, requestImg, requestModalMenuOn, requestBalance} from '../../../redux/user-selectors.js';
import {userIcon} from '../../../redux/app-reducer.js';

const MobileMenu = ({modalOnAndAllOff, modalOnOrOff, modalOnAndAllOffAndModalOff, balance,
 modalOnAndModalOff, modalMenuOn, isAuth, nick, img, role}) => {
	useEffect(() => {
		$(window).resize(function(){
		  	if($(window).width() > 991){
				modalOnOrOff('setModalMenuOn', false);
		   	}
		});
	});

	const registerOn = () => {
		modalOnAndAllOffAndModalOff('setRegisterModalOn');
	}

	const enterOn = () => {
		modalOnAndAllOffAndModalOff('setEnterModalOn');
	}

	const historyOn = () => {
		modalOnAndAllOffAndModalOff('setHistoryModalOn');
	}

	const faqOn = () => {
		modalOnAndAllOffAndModalOff('setFaqModalOn');
	}

	const colorPickerOn = () => {
		modalOnAndModalOff('setColorPickerModalOn');
	}

	const mobileMenuOn = () => {
		if(modalMenuOn){
			modalOnOrOff('setModalMenuOn', false);
		}
		else{
			modalOnOrOff('setModalMenuOn', true);
		}
	}

	return(
		<div className={`mobile__menu--inner ${modalMenuOn ? 'mobile__on' : ''}`}>
		    <div className="mobile__menu--content">

		        <div className="menu__mobile--top--inner">
		            <div className="menu__mobile--icon" onClick={mobileMenuOn}>
		                <i className="fas fa-bars"></i>
		            </div>
		            {!isAuth &&
		            <div className="noregister__buttons">
		                <button className="button noregister__button enter__button en mobile__menu--off" onClick={enterOn}>вход</button>
		                <button className="button noregister__button register__button en mobile__menu--off" onClick={registerOn}>регистрация</button>
		            </div>}
		        </div>

		        {isAuth && <>
		        <NavLink to={'/profile'} className="header__top--profile" onClick={mobileMenuOn}>
		            <span className="site__profile--img">
		                <img src={img ? img : userIcon} alt="Аватарка" className="user__img" />
		            </span>

		            {nick}
		        </NavLink>

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

		        <NavLink to="/payment" className="header__bottom--link mobile__payment" onClick={mobileMenuOn}>
		            <i className="fas fa-wallet icon"></i>
		            <span className="en">кошелек</span>
		        </NavLink> </>}

		        <div className="header__bottom--page en">
		            главная
		        </div>

		        {role === 'admin' && isAuth && 
		        <NavLink to="/admin" className="header__bottom--link" onClick={mobileMenuOn}>
		            <i className="fas fa-user icon"></i>
		            <span className="en">админка</span>
		        </NavLink>}

		        <NavLink to="/games" className="header__bottom--link" onClick={mobileMenuOn}>
		            <i className="fas fa-gamepad icon"></i>
		            <span className="en">игры</span>
		        </NavLink>

		        {isAuth &&
		        <button className="button header__bottom--link" onClick={historyOn}>
		            <i className="fas fa-history icon"></i>
		            <span className="en">история игр</span>
		        </button>}

		        <button className="button header__bottom--link" onClick={faqOn}>
		            <i className="far fa-question-circle icon"></i>
		            FAQ
		        </button>

		        <a href="https://vk.com/expcash" className="header__bottom--link" target="_blank" rel="noreferrer" onClick={mobileMenuOn}>
		            <i className="fab fa-vk icon"></i>
		            <span className="en">группа vk</span>
		        </a>

		        <div className="menu__mobile--bottom--inner">
		            {/*<div className="header__top--language--inner">
		                <div data-lang="ru" className="header__top--language--flag rus__language">
		                    <img src="./assets/img/russia.svg" alt="Россия" className="language__flag icon" />
		                    ru
		                </div>

		                <div data-lang="en" className="header__top--language--flag eng__language">
		                    <img src="./assets/img/united-states-of-america.svg" alt="Сша" className="language__flag icon" />
		                    en
		                </div>
		            </div>*/}

		            {isAuth &&
		            <div className="header__top--choose--color" onClick={colorPickerOn}>
		                <span className="en">цветовая гамма</span>
		                <div className="choose__color"></div>
		            </div>}

		        </div>

		    </div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: requestIsAuth(state),
		role: requestRole(state),
		nick: requestNick(state),
		img: requestImg(state),
		modalMenuOn: requestModalMenuOn(state),
		balance: requestBalance(state)
	}
}

export default connect(mapStateToProps, {modalOnAndAllOff, modalOnOrOff, modalOnAndAllOffAndModalOff, modalOnAndModalOff})(MobileMenu);