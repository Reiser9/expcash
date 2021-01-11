import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './FavoriteGamesModal.css';

import FavoriteGamesItem from './FavoriteGamesItem/FavoriteGamesItem.jsx';

import {modalOnOrOff} from '../modalCommon.js';
import {requestFavoriteGames, requestFavoriteGamesCount, requestFavoriteGamesCarousel} from '../../../redux/user-selectors.js';
import {setFavoriteGamesAC, setFavoriteGamesCarouselAC, setCountFavoriteGamesAC} from '../../../redux/favorite-reducer.js';

const FavoriteGamesModal = ({modalOnOrOff, favoriteGames, setFavoriteGamesAC, 
setFavoriteGamesCarouselAC, setCountFavoriteGamesAC, count, favoriteGamesCarousel}) => {
	useEffect(() => {
		$("body").on("keydown", function(e){
			if(e.which === 27){
				modalOnOrOff('setFavoriteGamesModalOn', false);
			}
		});
	})

	const favoriteGamesModalOff = () => {
		modalOnOrOff('setFavoriteGamesModalOn', false);
	}

	const allGames = Object.keys(favoriteGames).map((key) => {
	    return favoriteGames[key].name;
	});

	const addOrDelFav = (id, name, favorite) => {
		const obj = {id, name, favorite};
		setFavoriteGamesAC(obj);
		if(!favorite){
			setCountFavoriteGamesAC(count, 1);
			setFavoriteGamesCarouselAC(name, favorite, (count + 1));
		}
		else{
			setCountFavoriteGamesAC(count, -1);
			setFavoriteGamesCarouselAC(name, favorite, favoriteGamesCarousel);
		}
	}

	return(
		<div className="add__like--game modal">
		    <div className="add__like__content modal__content">
		        <div className="add__like--cross modal__cross" onClick={favoriteGamesModalOff}>
		            <i className="fas fa-times"></i>
		        </div>

		        <div className="add__like--title modal__title">
		            <span className="blue en">любимые</span> <span className="en">игры</span>
		        </div>

		        <div className="add__like--inner modal__box">
		        	{allGames.map((name, id) => <FavoriteGamesItem key={`${id}_${name}`} gameName={name}
		            favorite={favoriteGames[id].favorite} addOrDelFav={() => addOrDelFav(id, name, favoriteGames[id].favorite)} />)}
		        </div>

		        <div className="add__like--text modal__text">
		            <span className="en">здесь вы можете выбрать ваши любимые игры и не искать, а увидеть их сразу же на главной 
		            странице! Все просто, выбирайте игры и они окажутся у вас в удобном месте</span>
		        </div>
		    </div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		favoriteGames: requestFavoriteGames(state),
		count: requestFavoriteGamesCount(state),
		favoriteGamesCarousel: requestFavoriteGamesCarousel(state)
	}
}

export default connect(mapStateToProps, {modalOnOrOff, setFavoriteGamesAC, setFavoriteGamesCarouselAC, setCountFavoriteGamesAC})(FavoriteGamesModal);