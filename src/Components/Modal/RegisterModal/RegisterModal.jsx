import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './RegisterModal.css';

import {setDataAC} from '../../../redux/auth-reducer.js';
import {registerValid} from '../../common/validate/validate.js';
import {modalOnAndAllOff, modalOnOrOff} from '../modalCommon.js';
import {requestRegNick, requestRegPassword, requestRegConfirmPassword, requestRegEmail, requestRegisterAgree,
requestInProgress} from '../../../redux/user-selectors.js';

const RegisterModal = ({modalOnAndAllOff, modalOnOrOff, setDataAC, registerValid, regNick, regPassword, regConfirmPassword, regEmail, inProgress, registerAgree}) => {
    useEffect(() => {
        $("body").on("keydown", function(e){
            if(e.which === 27){
                modalOnOrOff('setRegisterModalOn', false);
            }
        });
    });

    const registerModalOff = () => {
        modalOnOrOff('setRegisterModalOn', false);
    }

    const enterModalOn = () => {
        modalOnAndAllOff('setEnterModalOn', true);
    }

    const handleChange = ({target: {value, id}}) => {
        if(id === 'registerAgree'){
            let check = $('#registerAgree').prop('checked');
            setDataAC(id, check);
        }   
        else{
            setDataAC(id, value);
        }
    }

    const createAccount = () => {
        registerValid(regNick, regPassword, regConfirmPassword, regEmail);
    }
    // Не забыть капчу
    return(
        <div className="modalw register__modal">
            <div className="modalw__inner">
                <div className="modalw__content register__field">
                    <div className="modalw__cross register__cross" onClick={registerModalOff} >
                        <i className="fas fa-times"></i>
                    </div>

                    <div className="modalw__title">
                        регистрация
                    </div>

                    <div className="modal__input--wrapper">
                        <input id="regNick" type="text" className="input modalw__input" 
                        placeholder="придумайте логин" value={regNick} onChange={handleChange}/>
                    </div>

                    <div className="modal__input--wrapper">
                        <input id="regPassword" type="password" className="input modalw__input" 
                        placeholder="придумайте пароль" value={regPassword} onChange={handleChange}/>
                    </div>

                    <div className="modal__input--wrapper">
                        <input id="regConfirmPassword" type="password" className="input modalw__input" 
                        placeholder="подтвердите пароль" value={regConfirmPassword} onChange={handleChange}/>
                    </div>
                    
                    <div className="modal__input--wrapper">
                        <input id="regEmail" type="text" className="input modalw__input" 
                        placeholder="электронная почта" value={regEmail} onChange={handleChange}/>
                    </div>

                    <div className="modal__input--wrapper">
                        
                    </div>

                    <div className="modal__input--wrapper">
                        <input checked={registerAgree} type="checkbox" className="modalw__checkbox" id="registerAgree" onChange={handleChange} />
                        <label htmlFor="registerAgree" className="modalw__label">
                            я принимаю условия и правила сайта
                        </label>
                    </div>

                    {registerAgree && !inProgress
                    ? <button className="button modalw__button" onClick={createAccount}>
                        зарегистрироваться
                    </button>
                    : <button className="button modalw__button disable">
                        {inProgress ? 'загрузка..' : 'зарегистрироваться'}
                    </button>}

                    <div className="subbutton__links">
                        <button className="button subbutton__link" onClick={enterModalOn}>
                            уже есть аккаунт?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        regNick: requestRegNick(state),
        regPassword: requestRegPassword(state),
        regConfirmPassword: requestRegConfirmPassword(state),
        regEmail: requestRegEmail(state),
        registerAgree: requestRegisterAgree(state),
        inProgress: requestInProgress(state)
    }
}

export default connect(mapStateToProps, {setDataAC, registerValid, modalOnAndAllOff, modalOnOrOff})(RegisterModal);