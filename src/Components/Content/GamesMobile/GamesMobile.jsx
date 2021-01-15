import React from 'react';
import {connect} from 'react-redux';

import './GamesMobile.css';

import GameMobileItem from './GameMobileItem/GameMobileItem.jsx';
import Preloader from '../../common/Preloader/Preloader-page.jsx';

import {requestGames, requestGamesProgress} from '../../../redux/user-selectors.js';

const GamesMobile = ({games, gamesProgress}) => {
	const allGames = Object.keys(games).map((key) => {
	    return games[key];
	});

	return(
		<div className="games__mobile">
		    <div className="games__title">
		        <span className="blue en">игры</span> <span className="en">на сайте</span>
		    </div>

		    <div className="game__box--inner--mobile">
		    	{gamesProgress ? <Preloader />
		    	: allGames.map((name, id) => <GameMobileItem key={`${id}_${name}`} gameName={name} />)}
		    </div>

		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		games: requestGames(state),
		gamesProgress: requestGamesProgress(state)
	}
}

export default connect(mapStateToProps, {})(GamesMobile);