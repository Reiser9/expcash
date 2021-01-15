import React from 'react';
import {connect} from 'react-redux';

import './AdminChat.css';

import {clearChatAdmin} from '../../../../redux/chat-reducer.js';

const AdminChat = () => {
	const clearChat = () => {
		clearChatAdmin();
	}

	return(
		<div className="admin__chat">
			<button className="button header__bottom--link" onClick={clearChat}>Удалить все сообщения в чате</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {})(AdminChat);