import React, {useState} from 'react';
import {connect} from 'react-redux';

import './AdminNotify.css';

import NotifyAdd from '../../../common/Notify/NotifyAdd/NotifyAdd.jsx';

const AdminNotify = ({}) => {
	return(
		<div className="admin__notify">
			<div className="admin__notify--add--inner">
				<NotifyAdd id={'notify__all'} notifyFor={'all'} buttonText={'Уведомление для всех'} />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {})(AdminNotify);