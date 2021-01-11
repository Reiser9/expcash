import React from 'react';

import './LastWins.css';

const LastWins = () => {
	return(
		<>
			<div className="main__last--wins--title--box">
			    <div className="main__last--wins--title">
			        <span className="en">последние</span> <span className="blue en">выигрыши</span>
			    </div>
			</div>

			<div className="main__last--wins--inner">
			    <div className="main__last--wins--box">
			        <div className="main__last--wins--views">
			            <div className="main__last--wins--view game__view">
			                <span className="en">игра</span>
			            </div>

			            <div className="main__last--wins--view user__view">
			                <span className="en">игрок</span>
			            </div>

			            <div className="main__last--wins--view time__view">
			                <span className="en">время</span>
			            </div>

			            <div className="main__last--wins--view forecast__view">
			                <span className="en">ставка</span>
			            </div>

			            <div className="main__last--wins--view coef__view">
			                <span className="en">коэфф</span>
			            </div>

			            <div className="main__last--wins--view wins__view">
			                <span className="en">выигрыш</span>
			            </div>
			        </div>

			        <div className="main__last--wins--item">
			            <div className="main__last--wins--value game__view">
			                <a href="/test">baccarat</a>
			            </div>

			            <div className="main__last--wins--value user__view">
			                <a href="/test"><span className="blue">Владимир</span> К.</a>
			            </div>

			            <div className="main__last--wins--value time__view">
			                21:14
			            </div>

			            <div className="main__last--wins--value forecast__view">
			                <i className="fas fa-coins blue icon"></i>
			                500
			            </div>

			            <div className="main__last--wins--value coef__view">
			                1.33
			            </div>

			            <div className="main__last--wins--value wins__view">
			                <i className="fas fa-coins blue icon"></i>
			                665
			            </div>
			        </div>
			    </div>
			</div>
		</>
	)
}

export default LastWins;