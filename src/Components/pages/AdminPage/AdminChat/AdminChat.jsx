import React from 'react';
import {connect} from 'react-redux';

import './AdminChat.css';

import {clearChatAdmin} from '../../../../redux/chat-reducer.js';
import {patternNotify} from '../../../../redux/notify-reducer.js';
import {requestMessages} from '../../../../redux/user-selectors.js';

const AdminChat = ({messages, patternNotify}) => {
	const clearChat = () => {
		if(messages.length > 0){
			clearChatAdmin();
			patternNotify('delete_all_messages');
		}
		else{
			patternNotify('messages_empty');
		}
	}

	return(
		<div className="admin__chat">
			<button className="button header__bottom--link" onClick={clearChat}>Удалить все сообщения в чате</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		messages: requestMessages(state)
	}
}

export default connect(mapStateToProps, {patternNotify})(AdminChat);