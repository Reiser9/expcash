import React, {useState} from 'react';
import {connect} from 'react-redux';

import './Data.css';

import {updateNick} from '../../../../redux/auth-reducer.js';
import {requestChangeNickPrice, requestNick, requestBalance} from '../../../../redux/user-selectors.js';

const Data = ({updateNick, changeNickPrice, nick, balance}) => {
	const [userNick, setUserNick] = useState(nick);

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'editNick':
				setUserNick(value);
				break;
			default:
				break;
		}
	}

	const editUserNick = () => {
		updateNick(userNick, nick, balance, changeNickPrice);
	}

	return(
		<div className="profile__edit--item">
			<div className="profile__edit--title">
				Данные
			</div>

			<input type="text" id="editNick" value={userNick} className="input profile__edit--input" onChange={handleChange}/>

			<button className="button profile__edit--button" onClick={editUserNick}>
				{changeNickPrice === '0' ? 'Сменить ник бесплатно' : `Сменить ник за ${changeNickPrice} exp`}
			</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		changeNickPrice: requestChangeNickPrice(state),
		nick: requestNick(state),
		balance: requestBalance(state),
	}
}

export default connect(mapStateToProps, {updateNick})(Data);