import React from 'react';

const GameMobileItem = ({gameName}) => {
	return(
		<a href={`/${gameName}`} className="game__box--mobile">
            {gameName}
        </a>
	)
}

export default GameMobileItem;