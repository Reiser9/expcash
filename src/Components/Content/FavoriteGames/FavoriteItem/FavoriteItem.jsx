import React from 'react';
import {NavLink} from 'react-router-dom';

import './FavoriteItem.css';

const FavoriteItem = ({gameName, editMode, count, id, swapRight, swapLeft, favoriteGamesCarousel}) => {
	if(!gameName){
		return '';
	}

	return(
		<div className={`main__like--games--item like__game ${(editMode && count > 1) && 'active__edit'}`}>
		    <NavLink to={`/${gameName}`} className="game__inner--mask">
		        <span className="games__mask--text--inner">{gameName}</span>
		    </NavLink>

		    {editMode
		    && <div className="edit__mask">
		        <div className="edit__arrows">
		        {id !== 0 && <i className="fas fa-chevron-circle-left edit__arrow edit__arrow--prev" onClick={() => swapLeft(id, gameName, favoriteGamesCarousel)}></i>}
		        {id !== (count - 1) && <i className="fas fa-chevron-circle-right edit__arrow edit__arrow--next" onClick={() => swapRight(id, gameName, favoriteGamesCarousel)}></i>}
		        </div>
		    </div>}
		</div>
	)
}

export default FavoriteItem;