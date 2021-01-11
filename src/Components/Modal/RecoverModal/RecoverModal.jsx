import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './RecoverModal.css';

import {setDataAC} from '../../../redux/authReducer.js';
import {recoverValid} from '../../common/validate/validate.js';
import {modalOnAndAllOff, modalOnOrOff} from '../modalCommon.js';
import {requestRecoveryEmail, requestInProgress} from '../../../redux/user-selectors.js';

const RecoverModal = ({modalOnOrOff, modalOnAndAllOff, setDataAC, recoveryEmail, recoverValid, inProgress}) => {
    useEffect(() => {
        $("body").on("keydown", function(e){
            if(e.which === 27){
                modalOnOrOff('setRecoveryModalOn', false);
            }
        });
    });

    const recoverModalOff = () => {
        modalOnOrOff('setRecoveryModalOn', false);
    }

    const enterModalOn = () => {
        modalOnAndAllOff('setEnterModalOn', true);
    }

    const registerModalOn = () => {
        modalOnAndAllOff('setRegisterModalOn', true);
    }

    const handleChange = ({target: {value, id}}) => {
        setDataAC(id, value);
    }

    const recovery = () => {
        recoverValid(recoveryEmail);
    }

    return(
        <div className="modalw return__modal">
            <div className="modalw__inner">
                <div className="modalw__content recover__field">
                    <div className="modalw__cross return__cross" onClick={recoverModalOff}>
                        <i className="fas fa-times"></i>
                    </div>

                    <div className="modalw__title en">
                        восстановить пароль
                    </div>

                    <div className="modal__input--wrapper">
                        <input id="recoveryEmail" type="text" data-en="your email" className="input modalw__input" 
                        placeholder="введите свой email" value={recoveryEmail} onChange={handleChange}/>
                    </div>

                    {inProgress 
                    ? <button className="button modalw__button en disable">
                        загрузка..
                    </button>
                    : <button className="button modalw__button en" onClick={recovery}>
                        восстановить
                    </button>}

                    <div className="subbutton__links">
                        <button className="button subbutton__link en" onClick={registerModalOn}>
                            создать аккаунт?
                        </button>

                        <button className="button subbutton__link en" onClick={enterModalOn}>
                            вспомнили пароль?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        recoveryEmail: requestRecoveryEmail(state),
        inProgress: requestInProgress(state)
    }
}

export default connect(mapStateToProps, {setDataAC, recoverValid, modalOnAndAllOff, modalOnOrOff})(RecoverModal);