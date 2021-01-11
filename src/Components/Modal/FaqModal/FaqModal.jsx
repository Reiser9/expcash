import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './FaqModal.css';

import {modalOnOrOff} from '../modalCommon.js';

const FaqModal = ({modalOnOrOff}) => {
    useEffect(() => {
        $("body").on("keydown", function(e){
            if(e.which === 27){
                modalOnOrOff('setFaqModalOn', false);
            }
        });

        $(".faq__inner--box").on("click", function(){
            if(!$(this).children(".faq__inner--arrow").hasClass("faq__arrow--transform")){
                $(".faq__inner--arrow").removeClass("faq__arrow--transform");
                $(".faq__inner--answer").slideUp(100);

                $(this).children(".faq__inner--arrow").addClass("faq__arrow--transform");
                $(this).children(".faq__inner--answer").slideDown(100);
            }
            else{
                $(this).children(".faq__inner--arrow").removeClass("faq__arrow--transform");
                $(this).children(".faq__inner--answer").slideUp(100);
            }
        });
    });

    const faqModalOff = () => {
        modalOnOrOff('setFaqModalOn', false);
    }

    return(
        <div className="modalw faq__modal">
            <div className="modalw__inner">
                <div className="modalw__content faq__content">
                    <div className="modalw__cross faq__cross" onClick={faqModalOff}>
                        <i className="fas fa-times"></i>
                    </div>

                    <div className="modalw__title en">
                        FAQ
                    </div>

                    <div className="faq__inner">
                        <div className="faq__inner--content">

                            <div className="faq__inner--box">
                                <div className="faq__inner--arrow">
                                    <i className="fas fa-chevron-down"></i>
                                </div>

                                <div className="faq__inner--title en">
                                    какая минимальная сумма вывода?
                                </div>

                                <div className="faq__inner--answer en">
                                    минимальная сумма вывода: 150exp, мы сделали именно такую сумму на данный момент, во избежание перегрузок системы обработки платежей
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{

    }
}

export default connect(mapStateToProps, {modalOnOrOff})(FaqModal);