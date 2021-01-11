import React from 'react';

import './FavoriteCarousel.css';

import FavoriteItem from '../FavoriteItem/FavoriteItem.jsx';

import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';

const FavoriteCarousel = ({favoriteGamesCarousel, favoriteGamesModalOn, editMode, swapRight, swapLeft}) => {
	const options = {
	    margin: 35,
	    nav: true,
	    navText: ['<div class="main__arrow--prev main__arrow"><svg class="arrow main__like--slider--arrow--prev--icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xmlSpace="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>', '<div class="main__arrow--next main__arrow"><svg class="arrow main__like--slider--arrow--next--icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xmlSpace="preserve"><g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z" /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>'],
	    responsive:{
	        0:{
	            items:1
	        },
	        800:{
	            items:2
	        },
	        1745:{
	            items:3
	        }
	    }
	}

	const favoriteGamesKey = Object.keys(favoriteGamesCarousel).map((key) => {
		return favoriteGamesCarousel[key];
	});

	return(
		<OwlCarousel options={options} className="main__like--games--carousel owl-carousel">
		   	{favoriteGamesKey.map((name, id) => <FavoriteItem favoriteGamesCarousel={favoriteGamesCarousel} swapRight={swapRight} swapLeft={swapLeft} count={favoriteGamesKey.length} id={id} editMode={editMode} key={`${id}_${name}`} 
		   	gameName={name}/>)}

		    <div className="main__like--games--item add__like--games" onClick={favoriteGamesModalOn}>
		        <div className="main__like--add--game">
		            <i className="fas fa-plus icon__add"></i>
		        </div>
		    </div>
		</OwlCarousel>
	)
}

export default FavoriteCarousel;