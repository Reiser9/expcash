import React from 'react';
import {connect} from 'react-redux';

import './AdminFaq.css';

import {requestFaq} from '../../../../redux/user-selectors.js';

import FaqItem from './FaqItem/FaqItem.jsx';

const AdminFaq = ({faq}) => {
	const allFaq = Object.keys(faq).map((key) => {
		return faq[key]
	});

	return(
		<div className="admin__faq">
			<div className="admin__faq--title">Добавить частый вопрос</div>

			<div className="admin__faq--title">Текущие частые вопросы</div>

			<div className="admin__faq--content">
				{allFaq.map((f, id) => <FaqItem key={`${id}_${f}`} id={id} title={f.title} text={f.text} />)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		faq: requestFaq(state)
	}
}

export default connect(mapStateToProps, {})(AdminFaq);