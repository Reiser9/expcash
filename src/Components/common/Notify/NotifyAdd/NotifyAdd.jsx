import React, {useState} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './NotifyAdd.css';

import {addNotifyAC} from '../../../../redux/notify-reducer.js';
import {user} from '../../../../redux/auth-reducer.js';

const NotifyAdd = ({buttonText, notifyFor, addNotifyAC, notifyFrom, setNotifyMode}) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [type, setType] = useState('warn');
	const [icon, setIcon] = useState('fa-question');
	const [time, setTime] = useState(5000);
	const [onlyClick, setOnlyClick] = useState(false);

	const addNotify = (userId) => {
		addNotifyAC(title, text, type, icon, userId, time, onlyClick);
		if(notifyFrom === 'userItem'){
			addNotifyAC('Успешно', 'Уведомление успешно отправлено', 'succes', 'fa-check', user.uid, 1500);
			setNotifyMode(false);
		}
	}

	const handleChange = ({target: {value, id}}) => {
		let onlyClickBool;
		if(id === 'onlyClick'){
			onlyClickBool = $("#onlyClick").prop("checked");
		}
		switch(id){
			case 'notify__title':
				setTitle(value);
				break;
			case 'notify__text':
				setText(value);
				break;
			case 'notify__time':
				setTime(value);
				break;
			case 'onlyClick':
				setOnlyClick(onlyClickBool);
				break;
			default:
				break;
		}
	}

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
		<>
			<input id="notify__title" className="input notify__input" value={title} onChange={handleChange} placeholder="Заголовок"/>

			<input id='notify__text' className="input notify__input" value={text} onChange={handleChange} placeholder="Текст"/>

			<select className="notify__select" onChange={changeType}>
				<option value="warn">Предупреждение</option>
				<option value="info">Информация</option>
				<option value="error">Ошибка</option>
				<option value="succes">Успех</option>
			</select>

			<input id='notify__time' className="input notify__input" value={time} onChange={handleChange} type="number" placeholder="Таймер(ms)"/>

			<input checked={onlyClick} type="checkbox" className="modalw__checkbox" id="onlyClick" onChange={handleChange}/>
			<label htmlFor="onlyClick" className="modalw__label">
			    Выключать только по клику
			</label>

			<button className="button users__button" onClick={() => addNotify(notifyFor)}>{buttonText}</button>
		</>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {addNotifyAC})(NotifyAdd);