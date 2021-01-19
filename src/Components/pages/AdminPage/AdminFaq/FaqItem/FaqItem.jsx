import React from 'react';
import {connect} from 'react-redux';

import './FaqItem.css';

import {deleteFaqItem} from '../../../../../redux/faq-reducer.js';

const FaqItem = ({title, text, id, deleteFaqItem}) => {
	const deleteFaq = (id) => {
		deleteFaqItem(id);
	}

	return(
		<div className="admin__faq--item">
			<div className="admin__faq--item--title">
				{title}
			</div>

			<div className="admin__faq--item--text">
				{text}
			</div>

			<button onClick={() => deleteFaq(id)} className="button admin__faq--item--delete">
				Удалить
			</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {deleteFaqItem})(FaqItem);