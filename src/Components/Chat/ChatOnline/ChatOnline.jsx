import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import './ChatOnline.css';

import socket from '../../../socket/socket.js';
import {setOnline} from '../../../redux/chat-reducer.js';
import {requestOnline} from '../../../redux/user-selectors.js';

const ChatOnline = ({setOnline, online}) => {
	useEffect(() => {
		socket.emit('getOnline');
		socket.on('online', (online) => {
			setOnline(online);
		});
	});

	return(
		<div className="chat__top--inner">
		    <div className="chat__online--inner">
		        <span className="en">онлайн:</span> <span className="online">{online}</span>
		    </div>

		    <div className="chat__mobile--cross mobile__off">
		        <span className="chat__cross">
		            <i className="fas fa-times"></i>
		        </span>
		    </div>

		    <div className="chat__title">
		        <span className="en">чат онлайн</span>
		        <svg className="chat__title--icon" viewBox="-21 -47 682.66669 682"
		            xmlns="http://www.w3.org/2000/svg">
		            <path
		                d="m552.011719-1.332031h-464.023438c-48.515625 0-87.988281 
		                39.464843-87.988281 87.988281v283.972656c0 48.414063 39.300781 87.816406 87.675781 
		                87.988282v128.863281l185.191407-128.863281h279.144531c48.515625 0 87.988281-39.472657 
		                87.988281-87.988282v-283.972656c0-48.523438-39.472656-87.988281-87.988281-87.988281zm50.488281 
		                371.960937c0 27.835938-22.648438 50.488282-50.488281 50.488282h-290.910157l-135.925781 
		                94.585937v-94.585937h-37.1875c-27.839843 0-50.488281-22.652344-50.488281-50.488282v-283.972656c0-27.84375 
		                22.648438-50.488281 50.488281-50.488281h464.023438c27.839843 0 50.488281 22.644531 50.488281 50.488281zm0 0" />
		            <path d="m171.292969 131.171875h297.414062v37.5h-297.414062zm0 0" />
		            <path d="m171.292969 211.171875h297.414062v37.5h-297.414062zm0 0" />
		            <path d="m171.292969 291.171875h297.414062v37.5h-297.414062zm0 0" /></svg>
		    </div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		online: requestOnline(state)
	}
}

export default connect(mapStateToProps, {setOnline})(ChatOnline);