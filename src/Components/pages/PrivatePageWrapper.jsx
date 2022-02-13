import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {requestIsAuth} from '../../redux/user-selectors.js';

// Не пускает на страницу не авторизованных, перебрасывая их на главную
const PrivatePageWrapper = ({isAuth, children}) => {
	if(!isAuth){
		return <Redirect to={'/'} />
	}

	return(
		children
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: requestIsAuth(state)
	}
}

export default connect(mapStateToProps, {})(PrivatePageWrapper);