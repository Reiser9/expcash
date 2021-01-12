import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {user} from '../../../redux/authReducer.js';
import {requestRole} from '../../../redux/user-selectors.js';
import {clearChatAdmin} from '../../../redux/chat-reducer.js';
import {addNotifyAC} from '../../../redux/notify-reducer.js';

const AdminPage = ({role, addNotifyAC}) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [type, setType] = useState('warn');
	const [icon, setIcon] = useState('fa-question');

	const clearChat = () => {
		clearChatAdmin();
	}

	const addNotify = (title, text, type, icon, userId) => {
		addNotifyAC(title, text, type, icon, userId);
	}

	const changeTitle = (e) => {
		setTitle(e.target.value);
	}

	const changeText = (e) => {
		setText(e.target.value);
	}
	// Создать общий handleChange

	const changeType = (e) => {
		setType(e.target.value);
		switch(e.target.value){
			case 'info':
				setIcon('fa-exclamation');
				break;
			case 'error':
				setIcon('fa-times');
				break;
			case 'succes':
				setIcon('fa-check');
				break;
			case 'warn':
				setIcon('fa-question');
				break;
			default:
				break;
		}
	}

	if(role !== 'admin'){
		return <Redirect to={'/'} />
	}
	// Для добавления уведа для пользователя передать в функцию uid пользователя

	return(
		<div>
			<button onClick={clearChat}>Удалить все сообщения в чате</button>
			<input onChange={changeTitle} placeholder="Заголовок" />
			<input onChange={changeText} placeholder="Текст" />
			<select onChange={changeType}>
				<option>warn</option>
				<option>info</option>
				<option>error</option>
				<option>succes</option>
			</select>
			<button onClick={() => addNotify(title, text, type, icon, 'all')}>Уведомление для всех</button>
			
			<button onClick={() => addNotify(title, text, type, icon, user.uid)}>Уведомление для юзера</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		role: requestRole(state)
	}
}

export default connect(mapStateToProps, {addNotifyAC})(AdminPage);