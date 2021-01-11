import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import './Header.css';

import Auth from './Auth/Auth.jsx';

import {modalOnOrOff} from '../../Modal/modalCommon.js';
import {requestIsAuth, requestRole, requestModalMenuOn} from '../../../redux/user-selectors.js';

const Header = ({modalOnOrOff, modalMenuOn, isAuth, role}) => {
	const colorPickerOn = () => {
		modalOnOrOff('setColorPickerModalOn', true);
	}

	const historyOn = () => {
		modalOnOrOff('setHistoryModalOn', true);
	}

	const faqOn = () => {
		modalOnOrOff('setFaqModalOn', true);
	}

	const mobileMenuOn = () => {
		modalOnOrOff('setModalMenuOn', !modalMenuOn);
	}

	return(
		<header className="header">
		    <div className="header__top--inner">
		        <div className="header__top--left--inner">
		        	{!isAuth && modalOnOrOff('setColorPickerModalOn', false)}
		        	{!isAuth && modalOnOrOff('setHistoryModalOn', false)}
		        	{!isAuth && modalOnOrOff('setFaqModalOn', false)}
		        	
		        	{isAuth &&
		            <div className="header__top--choose--color" onClick={colorPickerOn}>
		                <span className="en">цветовая гамма</span>
		                <div className="choose__color"></div>
		            </div>}

		            <div className="header__top--description">
		                <span className="en">сайт с</span> <span className="blue en">честными</span> <span
		                    className="en">играми</span>
		            </div>
		        </div>

		        <NavLink to="/" className="site__logo">
		            <i className="fas fa-coins blue icon"></i>
		            <span className="blue">Exp</span>cash
		        </NavLink>

		        <div className="header__top--profile--inner">
		            {/*<div className="header__top--language--inner">
		                <div data-lang="ru" className="header__top--language--flag rus__language">
		                    <img src="./assets/img/russia.svg" alt="Россия" className="language__flag icon"/>
		                    ru
		                </div>

		                <div data-lang="en" className="header__top--language--flag eng__language">
		                    <img src="./assets/img/united-states-of-america.svg" alt="Сша" className="language__flag icon"/>
		                    en
		                </div>
		            </div>*/}

		            <Auth />
		        </div>

		        <div className="menu__mobile--tools">
		            <div className="menu__mobile--icon" onClick={mobileMenuOn}>
		                <i className="fas fa-bars"></i>
		            </div>

		            <div className="menu__mobile--chat mobile__off">
		                <i className="fas fa-comments"></i>
		            </div>
		        </div>

		    </div>

		    <div className="header__bottom--inner">
		        <div className="header__bottom--content">
		            <div className="header__bottom--page en">
		                главная
		            </div>

		            <div className="header__bottom--links">
		            	{role === 'admin' && isAuth && 
		            	<NavLink to="/admin" className="header__bottom--link">
		            	    <i className="fas fa-user icon"></i>
		            	    <span className="en">админка</span>
		            	</NavLink>}

		                <NavLink to="/games" className="header__bottom--link">
		                    <i className="fas fa-gamepad icon"></i>
		                    <span className="en">игры</span>
		                </NavLink>

		                {isAuth &&
		                <button className="button header__bottom--link history__link" onClick={historyOn}>
		                    <i className="fas fa-history icon"></i>
		                    <span className="en">история игр</span>
		                </button>}

		                <button className="button header__bottom--link faq__link" onClick={faqOn}>
		                    <i className="far fa-question-circle icon"></i>
		                    FAQ
		                </button>

		                <a href="https://vk.com/expcash" className="header__bottom--link" target="_blank" rel="noreferrer">
		                    <i className="fab fa-vk icon"></i>
		                    <span className="en">группа vk</span>
		                </a>

		                {isAuth && 
		                <NavLink to="/payment" className="header__bottom--link">
			                <i className="fas fa-wallet icon"></i>
			                <span className="en">кошелек</span>
		                </NavLink>}
		            </div>
		        </div>
		    </div>
		</header>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: requestIsAuth(state),
		role: requestRole(state),
		modalMenuOn: requestModalMenuOn(state)
	}
}

export default connect(mapStateToProps, {modalOnOrOff})(Header);