import React from 'react';

import Main from '../../Content/Main/Main.jsx';
import GamesMobile from '../../Content/GamesMobile/GamesMobile.jsx';
import FavoriteGames from '../../Content/FavoriteGames/FavoriteGames.jsx';
import LastWins from '../../Content/LastWins/LastWins.jsx';

const MainPage = () => {
	return(
		<>
		<Main />

		<GamesMobile />

		<FavoriteGames />

		<LastWins />
		</>
	)
}

export default MainPage;