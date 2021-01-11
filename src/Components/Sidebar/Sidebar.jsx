import React from 'react';
import {connect} from 'react-redux';

import './Sidebar.css';

import {requestGames} from '../../redux/user-selectors.js';
import GameItem from './GameItem/GameItem.jsx';

const Sidebar = ({games}) => {
    const allGames = Object.keys(games).map((key) => {
        return games[key];
    });
    
    return(
        <div className="main__games--content">
            <div className="games">
                <div className="games__title">
                    <span className="blue en">игры</span> <span className="en">на сайте</span>
                </div>

                <div className="game__box--inner">
                    {allGames.map((name, id) => <GameItem key={`${id}_${name}`} gameName={name} />)}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        games: requestGames(state)
    }
}

export default connect(mapStateToProps, {})(Sidebar);