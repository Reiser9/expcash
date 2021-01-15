import React, {useState} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './AdminNotify.css';

import {user} from '../../../../redux/auth-reducer.js';
import {addNotifyAC} from '../../../../redux/notify-reducer.js';

const AdminNotify = ({addNotifyAC}) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [type, setType] = useState('warn');
	const [icon, setIcon] = useState('fa-question');
	const [time, setTime] = useState(5000);
	const [onlyClick, setOnlyClick] = useState(false);

	const addNotify = (title, text, type, icon, userId, time, onlyClick) => {
		addNotifyAC(title, text, type, icon, userId, time, onlyClick);
	}

	const changeTitle = (e) => {
		setTitle(e.target.value);
	}

	const changeText = (e) => {
		setText(e.target.value);
	}

	const changeTime = (e) => {
		setTime(e.target.value);
	}

	const changeClick = (e) => {
		let onlyClickBool = $("#onlyClick").prop("checked");
		setOnlyClick(onlyClickBool);
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

	return(
		<div className="admin__notify">
			<div className="admin__notify--add--inner">
				<input className="input notify__input" value={title} onChange={changeTitle} placeholder="Заголовок"/>

				<input className="input notify__input" value={text} onChange={changeText} placeholder="Текст"/>

				<select className="notify__select" onChange={changeType}>
					<option value="warn">Предупреждение</option>
					<option value="info">Информация</option>
					<option value="error">Ошибка</option>
					<option value="succes">Успех</option>
				</select>

				<input className="input notify__input" value={time} onChange={changeTime} type="number" placeholder="Таймер(ms)"/>

				<input checked={onlyClick} type="checkbox" className="modalw__checkbox" id="onlyClick" onChange={changeClick}/>
				<label htmlFor="onlyClick" className="modalw__label">
				    Выключать только по клику
				</label>

				<button className="button notify__button" onClick={() => addNotify(title, text, type, icon, 'all', time, onlyClick)}>Уведомление для всех</button>
				
				<button className="button notify__button" onClick={() => addNotify(title, text, type, icon, user.uid, time, onlyClick)}>Уведомление для юзера</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {addNotifyAC})(AdminNotify);