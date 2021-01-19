import React from 'react';
import {connect} from 'react-redux';

import './UserBanned.css';

import {quitAccount} from '../../../redux/auth-reducer.js';

const UserBanned = ({quitAccount}) => {
	const quitBanAccount = () => {
		quitAccount();
	}

	return(
		<div className="user__ban">
		    <div className="user__ban--title">
		    	Ваша учетная записать заблокирована!
		    </div>

		    <div className="user__ban--subtitle">
		    	Если вы не знаете причину, по которой вас заблокировали, или не согласны с решением, то вы можете написать 
		    	<a href="mailto:expcash.sup@gmail.com" className="user__ban--mail">нам на почту</a>
		    </div>

		    <button className="button user__ban--button" onClick={quitBanAccount}>
		    	Выйти с аккаунта
		    </button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {quitAccount})(UserBanned);