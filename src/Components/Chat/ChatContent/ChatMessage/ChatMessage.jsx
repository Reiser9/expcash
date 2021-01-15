import React from 'react';

import './ChatMessage.css';

const ChatMessage = ({img, uid, nick, message, role = 'user'}) => {
	return(
		<div className="chat__message">
		    <a href={'user/' + uid} className="site__profile--img borderr">
		        <img src={img ? img : 'https://www.movingauthority.com/static/new_design/images/user.png'} alt="Аватарка" className="user__img" />
		    </a>

		    <div className="chat__inner--text--inner">
		        <div className="chat__inner--text--box">
	                <div className="chat__inner--nick">
		                <a className={role} href={'user/' + uid}>{nick}</a>
		            </div>
	            </div>

	            <div className="chat__inner--text">
		            {message}
		        </div>
		    </div>
		</div>
	)
}

export default ChatMessage;