import React, {useState} from 'react';
import {connect} from 'react-redux';

import './FaqAdd.css';

import {addFaq} from '../../../../../redux/faq-reducer.js';
import {patternNotify} from '../../../../../redux/notify-reducer.js';
import {user} from '../../../../../redux/auth-reducer.js';

const FaqAdd = ({addFaq, patternNotify, length}) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const handleChange = ({target: {id, value}}) => {
		switch(id){
			case 'faq__title':
				setTitle(value);
				break
			case 'faq__text':
				setText(value);
				break
			default:
				break
		}
	}

	const faqAdd = () => {
		if(!title || !text){
			patternNotify('request_area');
		}
		else{
			addFaq(title, text, length);
			patternNotify('add_faq_succes');
			setTitle('');
			setText('');
		}
	}

	return(
		<div className="admin__faq--add">
			<input value={title} id="faq__title" className="input admin__faq--input" placeholder="Заголовок" onChange={handleChange}/>

			<textarea value={text} id="faq__text" className="input admin__faq--input admin__faq--textarea" placeholder="Текст" onChange={handleChange}></textarea>

			<button className="button admin__faq--add--button" onClick={faqAdd}>Добавить</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {addFaq, patternNotify})(FaqAdd);