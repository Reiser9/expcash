import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './ChatSend.css';

import {requestIsAuth, requestMessage, requestInitChat} from '../../../redux/user-selectors.js';
import {setMessageAC, sendMessage} from '../../../redux/chat-reducer.js';

const ChatSend = ({isAuth, message, setMessageAC, sendMessage, initChat, setMessageCount, messageCount, chatDown}) => {
	const handleChange = (e) => {
		let text = e.target.value;
		setMessageAC(text);
	}

	const sendMessageButton = (e) => {
		e.preventDefault();
		if(message.trim() === ''){
			alert("Нельзя отправить пустое сообщение!");
		}
		else if(message.trim().length > 100){
			alert("Длина сообщения не может превышать 100 символов!");
		}
		else{
			sendMessage(message);
			setMessageCount(messageCount + 1);
			if(!chatDown){
				$(".chat__inner").animate({scrollTop: 9999},{duration: 350});
            	return false;
			}
		}
	}

	if(!initChat){
		return(
			<div className="chat__send--inner">
				<div className="chat__send--box">
			        <input type="text" className="input chat__send--input pointn"
			            placeholder="Загрузка.." />

			        <div className="chat__send--buttons">
			            <button className="button chat__send--button pointn">
			                <i className="fas fa-arrow-right send__icon"></i>
			            </button>
			        </div>
			    </div>
			</div>
		)
	}
	return(
		<div className="chat__send--inner">
		    {isAuth 
		    ? <form onSubmit={sendMessageButton} className="chat__send--box chat__submit">
		        <input onChange={handleChange} value={message} type="text" className="input chat__send--input"
		            placeholder="Введите сообщение" />

		        <div className="chat__send--buttons">
		            <button type="submit" className="button chat__send--button">
		                <i className="fas fa-arrow-right send__icon"></i>
		            </button>
		        </div>
		    </form>
			: <div className="chat__send--box noregister__chat">
		        <input type="text" className="input chat__send--input"
		            placeholder="Авторизуйтесь" />

		        <div className="chat__send--buttons">
		            <button className="button chat__send--button">
		                <i className="fas fa-arrow-right send__icon"></i>
		            </button>
		        </div>
		    </div>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: requestIsAuth(state),
		message: requestMessage(state),
		initChat: requestInitChat(state)
	}
}

export default connect(mapStateToProps, {sendMessage, setMessageAC})(ChatSend);