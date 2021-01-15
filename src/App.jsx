import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './assets/css/fontawesome/all.min.css';
import './assets/css/media.css';

import Sidebar from './Components/Sidebar/Sidebar';
import Content from './Components/Content/Content';
import Chat from './Components/Chat/Chat';
import ColorPickerModal from './Components/Modal/ColorPickerModal/ColorPickerModal.jsx';
import RegisterModal from './Components/Modal/RegisterModal/RegisterModal.jsx';
import EnterModal from './Components/Modal/EnterModal/EnterModal.jsx';
import RecoverModal from './Components/Modal/RecoverModal/RecoverModal.jsx';
import HistoryModal from './Components/Modal/HistoryModal/HistoryModal.jsx';
import FaqModal from './Components/Modal/FaqModal/FaqModal.jsx';
import AgreeModal from './Components/Modal/AgreeModal/AgreeModal.jsx';
import MobileMenu from './Components/Modal/MobileMenu/MobileMenu.jsx';
import Preloader from './Components/common/Preloader/Preloader.jsx';
import FavoriteGamesModal from './Components/Modal/FavoriteGamesModal/FavoriteGamesModal.jsx';
import Notify from './Components/common/Notify/Notify.jsx';

import {initializedApp} from './redux/app-reducer.js';
import {requestInitApp, requestSiteColor, requestUserSiteColor, requestHistoryModal, requestEnterModal, requestRegisterModal,
requestRecoveryModal, requestColorPickerModal, requestFaqModal, requestAgreeModal, requestModalMenu, requestFavoriteGamesModal, requestNotify} from './redux/user-selectors.js';

const App = ({colorPickerModal, registerModal, enterModal, recoveryModal, historyModal, faqModal, 
    agreeModal, modalMenu, initializedApp, initApp, favoriteGamesModal, notify}) => {
    useEffect(() => {
       initializedApp();
    }, []);

    const notifyArr = Object.keys(notify).map((key) => {
        return notify[key]
    });

    if(!initApp){
        return <Preloader />;
    }
    
    return(
        <BrowserRouter>
            {notifyArr.length > 0
            && <div className="notify">
                <div className="notify__inner">
                    {notifyArr.map((n, id) => <Notify index={n.id} key={`${id}_${n}`} title={n.title} text={n.text}
                    icon={n.icon} type={n.type} userId={n.userId} time={n.time} onlyClick={n.onlyClick}/>)}
                </div>
            </div>}

            <Sidebar />
            <Content />
            <Chat />
            {colorPickerModal && <ColorPickerModal />}
            {registerModal && <RegisterModal />}
            {enterModal && <EnterModal />}
            {recoveryModal && <RecoverModal />}
            {historyModal && <HistoryModal />}
            {faqModal && <FaqModal />}
            {agreeModal && <AgreeModal />}
            {modalMenu && <MobileMenu />}
            {favoriteGamesModal && <FavoriteGamesModal />}
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return{
        initApp: requestInitApp(state),
        siteColor: requestSiteColor(state),
        userSiteColor: requestUserSiteColor(state),
        historyModal: requestHistoryModal(state),
        enterModal: requestEnterModal(state),
        registerModal: requestRegisterModal(state),
        recoveryModal: requestRecoveryModal(state),
        colorPickerModal: requestColorPickerModal(state),
        faqModal: requestFaqModal(state),
        agreeModal: requestAgreeModal(state),
        modalMenu: requestModalMenu(state),
        favoriteGamesModal: requestFavoriteGamesModal(state),
        notify: requestNotify(state)
    }
}

export default connect(mapStateToProps, {initializedApp})(App);