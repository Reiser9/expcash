import React from 'react';

import './FavoriteGamesItem.css';

const FavoriteGamesItem = ({gameName, addOrDelFav, favorite, count}) => {
	return(
		<div className="add__like--item--box">
		    <div className={`main__like--games--item add__like--item ${favorite && "active__like--game"}`} onClick={addOrDelFav}>
    			<div className={`game__inner--mask ${gameName}`}>
		        	<span className="games__mask--text--inner">{gameName}</span>
		   		</div>

			    <div className="game__added--mask">
	    			<div className="game__added--text en">добавлено</div>
		        </div>

	    		<div className="add__like--check">
			        <i className="fas fa-check"></i>
			    </div>

			    <div className="add__like--plus">
	        		<div className="add__like--plus--inner">
			        	<i className="fas fa-plus icon__add"></i>
					</div>
	        	</div>
			</div>
        </div>
	)
}

export default FavoriteGamesItem;