import React, {useState} from 'react';
import {connect} from 'react-redux';

import './AdminMain.css';

import {requestChangeNickPrice} from '../../../../redux/user-selectors.js';
import {updateData} from '../../../../redux/auth-reducer.js';
import {patternNotify} from '../../../../redux/notify-reducer.js';

const AdminMain = ({updateData, patternNotify, changeNickPrice}) => {
	const [priceNick, setPriceNick] = useState(changeNickPrice);

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'nickPrice':
				setPriceNick(value);
				break;
			default:
				break;
		}
	}

	const savePrice = () => {
		if(priceNick !== changeNickPrice){
			updateData('changeNickPrice', priceNick);
		}
		else{
			patternNotify('same_price');
		}
	}

	return(
		<div className="admin__main">
			<div className="admin__main--item">
				<div className="admin__main--title">
					Цена смены ника
				</div>

				<input type="number" id="nickPrice" className="input admin__main--input" value={priceNick} onChange={handleChange}/>

				<button className="button admin__main--button" onClick={savePrice}>
					Сохранить
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		changeNickPrice: requestChangeNickPrice(state)
	}
}

export default connect(mapStateToProps, {updateData, patternNotify})(AdminMain);