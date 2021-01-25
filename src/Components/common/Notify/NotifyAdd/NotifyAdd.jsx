import React, {useState} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './NotifyAdd.css';

import {addNotifyAC, patternNotify} from '../../../../redux/notify-reducer.js';
import {user} from '../../../../redux/auth-reducer.js';

const NotifyAdd = ({buttonText, notifyFor, id, patternNotify, addNotifyAC, notifyFrom, setNotifyMode}) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [type, setType] = useState('warn');
	const [icon, setIcon] = useState('fa-question');
	const [time, setTime] = useState(5000);
	const [onlyClick, setOnlyClick] = useState(false);

	const addNotify = (userId) => {
		addNotifyAC(title, text, type, icon, time, userId, onlyClick);
		if(notifyFrom === 'userItem'){
			patternNotify('notify_send_succes');
			setNotifyMode(false);
		}
	}

	const handleChange = ({target: {value, id}}) => {
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

	const onlyClickChange = () => {
		setOnlyClick(!onlyClick);
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

			<button className={`button only__click ${onlyClick && 'active'}`} onClick={onlyClickChange}>
				Выключать только по клику
			</button>

			<button className="button users__button" onClick={() => addNotify(notifyFor)}>{buttonText}</button>
		</>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {addNotifyAC, patternNotify})(NotifyAdd);