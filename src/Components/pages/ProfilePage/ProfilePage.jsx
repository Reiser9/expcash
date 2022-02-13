import React from 'react';

import './ProfilePage.css';

import PrivatePageWrapper from '../PrivatePageWrapper.jsx';
import Info from './Info/Info.jsx';
import Password from './Password/Password.jsx';
import Email from './Email/Email.jsx';
import Data from './Data/Data.jsx';

const ProfilePage = () => {
	return(
		<PrivatePageWrapper>
			<div className="profile__inner">
				<Info />

				<div className="profile__edit--inner">
					<Password />

					<Email />

					<Data />
				</div>
			</div>
		</PrivatePageWrapper>
	)
}

export default ProfilePage;