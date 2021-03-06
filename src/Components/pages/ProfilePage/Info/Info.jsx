import React, {useState} from 'react';
import {connect} from 'react-redux';
import {user} from '../../../../redux/auth-reducer.js';

import './Info.css';

import {userIcon} from '../../../../redux/app-reducer.js';
import {requestNick, requestImg, requestBalance} from '../../../../redux/user-selectors.js';
import {quitAccount, deleteAccount, editUserImg} from '../../../../redux/auth-reducer.js';

const Info = ({quitAccount, deleteAccount, editUserImg, img, nick, balance}) => {
	const [avaProgress, setAvaProgress] = useState(false);

	const quit = () => {
		quitAccount('quit_account');
	}

	const del = () => {
		deleteAccount();
	}

	const uploadUserImg = () => {
		let value = document.getElementById("ava").files[0];
		editUserImg(value, setAvaProgress);
	}

	return(
		<div className="profile__info--inner">
			<div className="profile__info--img--inner">
				<img src={img ? img : userIcon} className="profile__info--img"/>

				{avaProgress 
				? <div className="avatar__load">
					Загрузка..
				</div> 
				: <div className="profile__info--edit--img--inner">
					<input type="file" id="ava" accept="image/jpeg,image/png" onChange={uploadUserImg}/>

					<label htmlFor="ava" className="profile__info--edit--img--label">
						<span className="profile__info--edit--img--label--inner">
							<svg width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							viewBox="0 0 480.24 480.24" xmlSpace="preserve">
							<g><g><g><path fill="white" d="M391.86,144.552c0.16-2.712,0.248-5.464,0.248-8.312c0.09-59.919-39.046-112.838-96.364-130.3
							c-71.85-21.89-147.842,18.61-169.732,90.46c-2.024-0.104-3.976-0.16-5.904-0.16c-66.274,0-120,53.726-120,120s53.726,120,120,120
							h72.088c4.418,0,8-3.582,8-8s-3.582-8-8-8h-72.088c-57.438,0-104-46.562-104-104s46.562-104,104-104
							c3.688,0.01,7.373,0.211,11.04,0.6c3.93,0.329,7.534-2.2,8.56-6.008c13.401-53.473,61.51-90.937,116.637-90.828
							c66.274,0.13,119.894,53.962,119.763,120.236c0.021,4.99-0.303,9.975-0.968,14.92c-0.049,0.358-0.073,0.72-0.073,1.081
							c0.001,4.418,3.583,7.999,8.001,7.999h1.04c44.183,0,80,35.817,80,80c0,44.183-35.817,80-80,80h-95.464c-4.418,0-8,3.582-8,8
							s3.582,8,8,8h95.464c50.028,0.01,91.677-38.401,95.707-88.267C484.086,195.127,444.707,148.823,391.86,144.552z"/>
							<polygon fill="white" points="336.276,245.088 240.108,148.928 143.94,245.088 155.26,256.408 232.108,179.552 232.108,480.24 248.108,480.24 
							248.108,179.552 324.956,256.408"/></g></g></g><g></g><g></g>
							<g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
						</span>
					</label>
				</div>}
			</div>

			<div className="profile__info--name">
				{nick}
			</div>

			<div className="profile__info--id">
				{user?.uid}
			</div>

			<div className="profile__info--balance">
				{balance} exp
			</div>

			<button className="button profile__button--quit" onClick={quit}>
				Выйти
			</button>

			<button className="button profile__button--delete" onClick={del}>
				Удалить аккаунт
			</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		img: requestImg(state),
		nick: requestNick(state),
		balance: requestBalance(state),
	}
}

export default connect(mapStateToProps, {quitAccount, deleteAccount, editUserImg})(Info);