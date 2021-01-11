import React from 'react';

import Preloader from '../Components/common/Preloader/Preloader-page.jsx';

export const withSuspense = (Component) => {
    return(
        <React.Suspense fallback={<Preloader />}>
            <Component />
        </React.Suspense>
    );
}