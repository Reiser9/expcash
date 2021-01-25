import React from 'react';
import {connect} from 'react-redux';

import './ProfilePage.css';

import {quitAccount} from '../../../redux/auth-reducer.js';

import PrivatePageWrapper from '../PrivatePageWrapper.jsx';

const ProfilePage = ({quitAccount}) => {
	const quit = () => {
		quitAccount('quit_account');
	}

	return(
		<PrivatePageWrapper>
			<div className="profile__inner">
				<button className="button" onClick={quit}>Выйти</button>
			</div>
		</PrivatePageWrapper>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {quitAccount})(ProfilePage);