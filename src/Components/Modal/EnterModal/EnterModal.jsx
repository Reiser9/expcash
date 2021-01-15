import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './EnterModal.css';

import {setDataAC} from '../../../redux/auth-reducer.js';
import {enterValid} from '../../common/validate/validate.js';
import {modalOnAndAllOff, modalOnOrOff} from '../modalCommon.js';
import {requestInProgress, requestEnterEmail, requestEnterPassword} from '../../../redux/user-selectors.js';

const EnterModal = ({modalOnAndAllOff, modalOnOrOff, setDataAC, enterValid, enterEmail, enterPassword, inProgress}) => {
    useEffect(() => {
        $("body").on("keydown", function(e){
            if(e.which === 27){
                modalOnOrOff('setEnterModalOn', false);
            }
        });
    });

    const enterModalOff = () => {
        modalOnOrOff('setEnterModalOn', false);
    }

    const returnModalOn = () => {
        modalOnAndAllOff('setRecoveryModalOn', true);
    }

    const registerModalOn = () => {
        modalOnAndAllOff('setRegisterModalOn', true);
    }

    const handleChange = ({target: {value, id}}) => {
        setDataAC(id, value);
    }

    const enterAccount = () => {
        enterValid(enterEmail, enterPassword);
    }

    return(
        <div className="modalw enter__modal">
            <div className="modalw__inner">
                <div className="modalw__content">
                    <div className="modalw__cross enter__cross" onClick={enterModalOff}>
                        <i className="fas fa-times"></i>
                    </div>

                    <div className="modalw__title en">
                        авторизация
                    </div>

                    <button className="button button__vk">
                        <i className="fab fa-vk icon"></i>
                        <span className="en">войти через вк</span>
                    </button>

                    <div className="enter__inputs enter__field">
                        <div className="modal__input--wrapper">
                            <input id="enterEmail" type="text" data-en="login" className="input modalw__input" 
                            placeholder="введите почту" value={enterEmail} onChange={handleChange}/>
                        </div>

                        <div className="modal__input--wrapper">
                            <input id="enterPassword" type="password" data-en="password" className="input modalw__input" 
                            placeholder="введите пароль" value={enterPassword} onChange={handleChange}/>
                        </div>
                    </div>
                    
                    {inProgress 
                    ? <button className="button modalw__button en disable">
                        загрузка..
                    </button>
                    : <button className="button modalw__button en" onClick={enterAccount}>
                        войти
                    </button>}

                    <div className="subbutton__links">
                        <button className="button subbutton__link en" onClick={registerModalOn}>
                            создать аккаунт?
                        </button>

                        <button className="button subbutton__link en" onClick={returnModalOn}>
                            забыли пароль?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        enterEmail: requestEnterEmail(state),
        enterPassword: requestEnterPassword(state),
        inProgress: requestInProgress(state)
    }
}

export default connect(mapStateToProps, {setDataAC, enterValid, modalOnAndAllOff, modalOnOrOff})(EnterModal);