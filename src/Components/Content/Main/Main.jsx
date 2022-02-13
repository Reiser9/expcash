import React from 'react';
import {NavLink} from 'react-router-dom';

import ReCAPTCHA from "react-google-recaptcha";

import './Main.css';

const Main = () => {
	return(
		<div className="main__title--inner">
		    <div className="main__title">
		        <div className="site__logo">
		            <i className="fas fa-coins blue icon"></i>
		            <span className="blue">Exp</span><span className="en">cash - сайт с честными играми</span>
		        </div>
		    </div>

		    <div className="main__subtitle">
		        <span className="en">зарабатывайте с</span> <span className="expcash"><span
		                className="blue">Exp</span>cash</span> <span className="en">на самых честных играх, не упусти свой
		            шанс на удачу!</span>
		    </div>

		    <div className="main__play--button">
		        <NavLink to="/games" className="button main__play">
		            <span className="en">начать играть</span>
		        </NavLink>
		    </div>
		</div>
	)
}

export default Main;