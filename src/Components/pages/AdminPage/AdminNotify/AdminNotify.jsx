import React, {useState} from 'react';
import {connect} from 'react-redux';

import './AdminNotify.css';

import NotifyAdd from '../../../common/Notify/NotifyAdd/NotifyAdd.jsx';

import {user} from '../../../../redux/auth-reducer.js';

const AdminNotify = ({}) => {
	return(
		<div className="admin__notify">
			<div className="admin__notify--add--inner">
				<NotifyAdd notifyFor={'all'} buttonText={'Уведомление для всех'} />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {})(AdminNotify);