import React, {useState} from 'react';
import {connect} from 'react-redux';

import './FavoriteGames.css';

import FavoriteCarousel from './FavoriteCarousel/FavoriteCarousel.jsx';

import {requestIsAuth, requestFavoriteGamesCarousel} from '../../../redux/user-selectors.js';
import {modalOnOrOff} from '../../Modal/modalCommon.js';
import {swapRightAC, swapLeftAC} from '../../../redux/favorite-reducer.js';

const FavoriteGames = ({isAuth, favoriteGamesCarousel, modalOnOrOff, swapRightAC, swapLeftAC}) => {
	const [editMode, setEditMode] = useState(false);

	const favoriteGamesModalOn = () => {
		modalOnOrOff('setFavoriteGamesModalOn', true);
		setEditMode(false);
	}

	const onEditMode = () => {
		setEditMode(!editMode);
	}

	return(
		<div className="main__like--games--inner">
		    <div className="main__like--games--title">
		        <span className="en">ваши</span> <span className="blue en">любимые</span> <span className="en">игры</span>
		    </div>
		    {isAuth
		    	? <><div className="main__like--games--slider">
		            <FavoriteCarousel editMode={editMode} setEditMode={setEditMode} favoriteGamesCarousel={favoriteGamesCarousel} 
		           	favoriteGamesModalOn={favoriteGamesModalOn} swapRight={swapRightAC} swapLeft={swapLeftAC} />
		        </div>

		        <div className="main__edit--game">
		            <button className="button main__button--edit en" onClick={onEditMode}>
		                {editMode ? 'готово' : 'редактировать'}
		            </button>
		        </div></>
		        : <div className="main__favorite--games--log">
		    		Для просмотра данного блока требуется авторизация
		    	</div>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: requestIsAuth(state),
		favoriteGamesCarousel: requestFavoriteGamesCarousel(state)
	}
}

export default connect(mapStateToProps, {modalOnOrOff, swapRightAC, swapLeftAC})(FavoriteGames);