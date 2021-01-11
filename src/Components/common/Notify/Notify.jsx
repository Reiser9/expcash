import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import {user} from '../../../redux/authReducer.js';

import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import {removeNotifyAC} from '../../../redux/notify-reducer.js';

import './Notify.css';

const Notify = ({title, text, icon, type, id, index, cat, removeNotifyUserAC, removeNotifyAllAC}) => {
	const offNotify = () => {
		$("#"+id).children(".notify__progress").removeClass("notify__progress--start");
	}

	const removeNotify = () => {
		
	}

	setTimeout(offNotify, 100);
	setTimeout(removeNotify, 5100);

	return(
		<div id={id} className="notify__content">
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

			<div className="notify__progress notify__progress--start"></div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {removeNotifyAC})(Notify);