import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import './Footer.css';

import {modalOnOrOff} from '../../Modal/modalCommon.js';

const Footer = ({modalOnOrOff}) => {
	const agreeOn = () => {
		modalOnOrOff('setAgreeModalOn', true);
	}

	return(
		<footer className="footer">
		    <div className="container">
		        <div className="footer__inner">
		            <a href="mailto:expcash.sup@gmail.com" className="footer__inner--link">
		                expcash.sup@gmail.com
		            </a>

		            <button className="button footer__inner--link user__agree" onClick={agreeOn}>
		                <span className="en">соглашение</span>
		            </button>

		            <NavLink to="/" className="site__logo footer__logo">
		                <i className="fas fa-coins blue icon"></i>
		                <span className="blue">Exp</span>cash
		            </NavLink>

		            <div className="footer__inner--link">
		                &copy; 2019 EXPCASH
		            </div>

		            <div className="footer__inner--link">
		                all rights reserved
		            </div>
		        </div>
		    </div>
		</footer>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {modalOnOrOff})(Footer);