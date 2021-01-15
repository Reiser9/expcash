import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './FaqModal.css';

import {modalOnOrOff} from '../modalCommon.js';
import {requestFaq, requestFaqProgress} from '../../../redux/user-selectors.js';

import FaqItem from './FaqItem/FaqItem.jsx';
import Preloader from '../../../Components/common/Preloader/Preloader-mini.jsx';

const FaqModal = ({modalOnOrOff, faq, faqProgress}) => {
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

    const faqArr = Object.keys(faq).map((key) => {
        return faq[key]
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
                        {faqProgress ? <Preloader /> 
                        : <div className="faq__inner--content">
                            {faqArr.map((d, id) => <FaqItem key={`${id}_${d}`} title={d.title} text={d.text}/>)}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        faq: requestFaq(state),
        faqProgress: requestFaqProgress(state)
    }
}

export default connect(mapStateToProps, {modalOnOrOff})(FaqModal);