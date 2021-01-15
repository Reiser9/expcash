import React from 'react';
import {connect} from 'react-redux';
import {Redirect, NavLink, Switch, Route} from 'react-router-dom';

import './AdminPage.css';

import {requestRole} from '../../../redux/user-selectors.js';
import {withSuspense} from '../../../hoc/withSuspense.js';

const AdminChat = React.lazy(() => import('./AdminChat/AdminChat.jsx'));
const AdminNotify = React.lazy(() => import('./AdminNotify/AdminNotify.jsx'));
const AdminUsers = React.lazy(() => import('./AdminUsers/AdminUsers.jsx'));
const AdminMain = React.lazy(() => import('./AdminMain/AdminMain.jsx'));
const AdminFaq = React.lazy(() => import('./AdminFaq/AdminFaq.jsx'));

const AdminPage = ({role}) => {
	if(role !== 'admin'){
		return <Redirect to={'/'} />
	}

	return(
		<div className="admin__content">
			<div className="admin__sidebar">
				<NavLink exact to={'/admin'} className="admin__sidebar--link">главная</NavLink>
				<NavLink to={'/admin/chat'} className="admin__sidebar--link">чат</NavLink>
				<NavLink to={'/admin/notify'} className="admin__sidebar--link">уведомления</NavLink>
				<NavLink to={'/admin/users'} className="admin__sidebar--link">пользователи</NavLink>
				<NavLink to={'/admin/faq'} className="admin__sidebar--link">faq</NavLink>
			</div>

			<div className="admin__inner">
				<Switch>
					<Route exact path='/admin' render={() => withSuspense(AdminMain)} />
					<Route exact path='/admin/chat' render={() => withSuspense(AdminChat)} />
					<Route exact path='/admin/notify' render={() => withSuspense(AdminNotify)} />
					<Route exact path='/admin/users' render={() => withSuspense(AdminUsers)} />
					<Route exact path='/admin/faq' render={() => withSuspense(AdminFaq)} />
				</Switch>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		role: requestRole(state)
	}
}

export default connect(mapStateToProps, {})(AdminPage);