import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './ChatMessage.css';

import {userIcon} from '../../../../redux/app-reducer.js';
import {chatDeleteMessage} from '../../../../redux/chat-reducer.js';
import {requestRole} from '../../../../redux/user-selectors.js';
import {addNotifyAC} from '../../../../redux/notify-reducer.js';

const ChatMessage = ({img, uid, nick, message, role = 'user', time, userRole, addNotifyAC}) => {
	const [editMessageMenu, setEditMessageMenu] = useState(false);

	const messageMenu = () => {
		setEditMessageMenu(true);
	}

	const deleteMessage = () => {
		chatDeleteMessage(time, nick);
		setEditMessageMenu(false);
		addNotifyAC('Успешно!', 'Сообщение удалено!', 'succes', 'fa-check', 1000);
	}

	useEffect(() => {
		$(".chat__message").on("mouseleave", function(){
			setEditMessageMenu(false);
		});
	}, []);

	return(
		<div className="chat__message">
		    <a href={'user/' + uid} className="site__profile--img borderr">
		        <img src={img ? img : userIcon} alt="Аватарка" className="user__img" />
		    </a>

		    <div className="chat__inner--text--inner">
		        <div className="chat__inner--text--box">
	                <div className="chat__inner--nick">
		                <a className={role} href={'user/' + uid}>{nick}</a>
		            </div>
	            </div>

	            <div className="chat__inner--text">
		            {message}
		        </div>
		    </div>

		    {userRole === 'admin' 
		    && <>
		    <div className="chat__message--menu" onClick={messageMenu}>
		    	<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		    		 viewBox="0 0 384 384" xmlSpace="preserve"><g>
		    		<g><circle cx="192" cy="42.667" r="42.667"/></g></g><g><g><circle cx="192" cy="192" r="42.667"/></g></g><g><g>
		    			<circle cx="192" cy="341.333" r="42.667"/></g>
		    	</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
		    </div>

		    {editMessageMenu
		    && <div className="chat__message--menu--content">
		    	<div className="chat__message--menu--item">
		    		Предупреждение
		    	</div>

		    	<div className="chat__message--menu--item">
		    		Заблокировать
		    	</div>

		    	<div className="chat__message--menu--item" onClick={deleteMessage}>
		    		Удалить
		    	</div>
		    </div>}
			</>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		userRole: requestRole(state)
	}
}

export default connect(mapStateToProps, {addNotifyAC})(ChatMessage);