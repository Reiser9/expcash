import React from 'react';
import {NavLink} from 'react-router-dom';

import './GameItem.css';

const GameItem = ({gameName}) => {
    return(
        <NavLink to={`/${gameName}`} className="game__box">
            {gameName}
        </NavLink>
    )
}

export default GameItem;