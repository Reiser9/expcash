import React from 'react';

import './FaqItem.css';

const FaqItem = ({title, text}) => {
	return(
		<div className="faq__inner--box">
		    <div className="faq__inner--arrow">
		        <i className="fas fa-chevron-down"></i>
		    </div>

		    <div className="faq__inner--title en">
		        {title}
		    </div>

		    <div className="faq__inner--answer en">
		        {text}
		    </div>
		</div>
	)
}

export default FaqItem;