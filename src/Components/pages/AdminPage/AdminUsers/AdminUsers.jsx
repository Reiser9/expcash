import React from 'react';
import {connect} from 'react-redux';

import './AdminUsers.css';

import UsersItem from './UsersItem/UsersItem.jsx';
import {userIcon} from '../../../../redux/app-reducer.js';
import {requestUsers} from '../../../../redux/user-selectors.js';

const AdminUsers = ({users}) => {
	const allUsers = Object.keys(users).map((key) => {
		return users[key]
	})

	return(
		<div className="admin__users">
			<div className="admin__users--count">
				Всего пользователей: {allUsers.length}
			</div>

			<div className="admin__users--content">
				{allUsers.length === 0 && <div className="users__not--found">Пользователи не найдены</div>}
				{allUsers.map((u, id) => <UsersItem key={`${id}_${u}`} id={id} img={u.img} nick={u.nick} email={u.email} role={u.role} uid={u.uid} balance={u.balance}/>)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		users: requestUsers(state)
	}
}

export default connect(mapStateToProps, {})(AdminUsers);