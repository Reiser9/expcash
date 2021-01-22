import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './ChatContent.css';

import ChatMessage from './ChatMessage/ChatMessage.jsx';
import Preloader from '../../../Components/common/Preloader/Preloader-mini.jsx';
import {getAllMessages} from '../../../redux/chat-reducer.js';
import {requestMessages, requestInitChat} from '../../../redux/user-selectors.js';

const ChatContent = ({getAllMessages, messages, initChat}) => {
	useEffect(() => {
		getAllMessages();
	}, [getAllMessages]);

	useEffect(() => {
		var block = document.querySelector(".chat__inner");
		block.scrollTop = block.scrollHeight;

		$(window).resize(function(){
			block.scrollTop = block.scrollHeight;
		});
	}, [initChat])

	return(
		<div className="chat__inner">
			<div className="chat__scroll">
				{messages.map((m, id) => <ChatMessage key={`${id}_${m}`} uid={m.uid} nick={m.nick} message={m.message} img={m.img} role={m.role} time={m.time} />)}

				{!initChat && <Preloader />}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		messages: requestMessages(state),
		initChat: requestInitChat(state)
	}
}

export default connect(mapStateToProps, {getAllMessages})(ChatContent)