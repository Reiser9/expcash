import React, {useState} from 'react';
import {connect} from 'react-redux';

import './UsersItem.css';

import NotifyAdd from '../../../../common/Notify/NotifyAdd/NotifyAdd.jsx';

import {userIcon} from '../../../../../redux/app-reducer.js';
import {addNotifyAC} from '../../../../../redux/notify-reducer.js';
import {user, setDataAC, updateDataUser} from '../../../../../redux/auth-reducer.js';
import {requestRoles} from '../../../../../redux/user-selectors.js';

const UsersItem = ({img, nick, email, role, uid, balance, addNotifyAC, setDataAC, updateDataUser, roles}) => {
	const [editMode, setEditMode] = useState(false);
	const [userNick, setUserNick] = useState(nick);
	const [userBalance, setUserBalance] = useState(balance);
	const [userRole, setUserRole] = useState(role);
	const [notifyMode, setNotifyMode] = useState(false);

	const editModeSet = () => {
		setEditMode(!editMode);
		if(editMode){
			if(userNick !== nick){
				setDataAC('nick', userNick);
				updateDataUser('nick', userNick, uid);
			}
			if(userBalance !== balance){
				setDataAC('balance', userBalance);
				updateDataUser('balance', userBalance, uid);
			}
			if(userRole !== role){
				setDataAC('role', userRole);
				updateDataUser('role', userRole, uid);
			}
			if(!(userNick === nick && userBalance === balance && userRole === role)){
				addNotifyAC('Успешно!', 'Данные сохранены', 'succes', 'fa-check', user.uid, 1000);
			}
		}
	}

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'admin__user--nick':
				setUserNick(value);
				break;
			case 'admin__user--balance':
				setUserBalance(value);
				break;
			case 'admin__user--role':
				setUserRole(value);
				break;
			default:
				break;
		}
	}

	const allRoles = Object.keys(roles).map((key) => {
		return roles[key]
	});

	const notifyModeTrue = () => {
		setNotifyMode(true);
		if(editMode){
			setEditMode(false);
		}
	}

	const notifyModeFalse = () => {
		setNotifyMode(false);
	}

	// Сделать рефакторинг

	return(
		<div className="admin__users--item">
			{notifyMode 
			? <>
				<NotifyAdd notifyFrom={'userItem'} setNotifyMode={setNotifyMode} notifyFor={uid} buttonText={'отправить'} />

				<button className="button users__button ban" onClick={notifyModeFalse}>
					отменить
				</button>
			</>
			: <>
				<div className="users__item--img--inner">
					<img src={img ? img : userIcon} className="users__item--img" />
				</div>
				
				{editMode ? <input onChange={handleChange} className="input input__edit" id="admin__user--nick" value={userNick}/>
				: <div className="users__item--data users__item--nick">
					{userNick}
				</div>}

				<div className="users__item--data users__item--email">
					{email}
				</div>

				{editMode ? <select className="role__select" id="admin__user--role" onChange={handleChange}>
					{allRoles.map((r, id) => <option selected={r === userRole}>{r}</option>)}
				</select>
				: <div className={`users__item--data users__item--role ${role}`}>
					{role}
				</div>}

				<div className="users__item--data users__item--uid">
					{uid}
				</div>

				{editMode ? <input onChange={handleChange} type="number" className="input input__edit" id="admin__user--balance" value={userBalance}/>
				: <div className="users__item--data users__item--balance blue">
					{userBalance} exp
				</div>}

				<button className="button users__button" onClick={notifyModeTrue}>
					уведомление
				</button>

				<button className="button users__button" onClick={editModeSet}>
					{editMode ? 'готово' : 'редактировать'}
				</button>
			</>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		roles: requestRoles(state)
	}
}

export default connect(mapStateToProps, {addNotifyAC, setDataAC, updateDataUser})(UsersItem);