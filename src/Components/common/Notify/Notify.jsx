import React from 'react';
import {connect} from 'react-redux';

import {user} from '../../../redux/auth-reducer.js';
import {removeNotifyAC} from '../../../redux/notify-reducer.js';

import './Notify.css';

const Notify = ({title, text, icon, type, userId, time = 5000, onlyClick = false, index, removeNotifyAC}) => {
	const removeNotify = () => {
		removeNotifyAC(index, userId);
	}

	if(!onlyClick){
		setTimeout(removeNotify, time);
	}

	if(userId !== 'all' && userId !== user.uid){
		return '';
	}

	return(
		<div className="notify__content" onClick={removeNotify}>
		    <div className={`notify__icon--inner ${type}`}>
		        <i className={`fas ${icon}`}></i>
			</div>

			<div className="notify__text--inner">
			    <div className="notify__title en">
			        {title}
			    </div>

			    <div className="notify__text en">
			        {text}
			    </div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {removeNotifyAC})(Notify);