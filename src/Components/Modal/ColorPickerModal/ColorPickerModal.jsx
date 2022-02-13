import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './ColorPickerModal.css';

import firebase from 'firebase/app';
import "firebase/database";
	
import {user} from '../../../redux/auth-reducer.js';
import {modalOnOrOff} from '../modalCommon.js';
import {initSiteColorAC} from '../../../redux/siteColor-reducer.js';
import {requestUserNameColor} from '../../../redux/user-selectors.js';

const ColorPickerModal = ({modalOnOrOff, userNameColor, initSiteColorAC}) => {
	useEffect(() => {
		$("#"+userNameColor).addClass("choose__color--active");
		const color = $(".choise__color--circle");
		const chooseBtn = $(".choise__color--circle");

		color.on("click", function(){
		    if(!$(this).hasClass("choose__color--active")){
		        color.removeClass("choose__color--active");
		        $(this).addClass("choose__color--active");
		    }
		});

		chooseBtn.on("click", function(){
		    const colorVar = $(this).css("color");
		    const nameColor = $(this).attr('id');
		    document.documentElement.style.setProperty("--blueC", colorVar);
		    firebase.database().ref('users/' + user.uid + '/userSiteColor').set({
		        userSiteColor: colorVar,
		        userNameColor: nameColor
		    });
		    initSiteColorAC(colorVar, nameColor);
		});

        $("body").on("keydown", function(e){
            if(e.which === 27){
                modalOnOrOff('setColorPickerModalOn', false)
            }
        });
	});

	const colorPickerOff = () => {
		modalOnOrOff('setColorPickerModalOn', false)
	}

	return(
		<div className="choose__color--inner modal">
		    <div className="choose__color--content modal__content">
		        <div className="choose__color--cross modal__cross" onClick={colorPickerOff}>
		            <i className="fas fa-times"></i>
		        </div>

		        <div className="choose__color--title modal__title">
		            <span className="blue en">цветовая</span> <span className="en">гамма</span>
		        </div>

		        <div className="choose__color--box modal__box">
		            <div className="choose__color-item">
		                <div id="green" className="choise__color--circle green__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="red" className="choise__color--circle red__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="blue" className="choise__color--circle blue__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="orange" className="choise__color--circle orange__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="purple" className="choise__color--circle purple__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="grey" className="choise__color--circle grey__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="lightblue" className="choise__color--circle lightblue__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="pink" className="choise__color--circle pink__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="darkorange" className="choise__color--circle darkorange__circle">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>

		            <div className="choose__color-item">
		                <div id="lightgrey" className="choise__color--circle lightgrey__color">
		                    <div className="choise__color--check">
		                        <i className="fas fa-check"></i>
		                    </div>
		                </div>
		            </div>
		        </div>

		        <div className="choose__color--text modal__text">
		            <span className="en">если вам надоел облик</span> <span className="expcash"><span className="blue">EXP</span>CASH</span>
		            <span className="en"> вы всегда можете обновить цветовую палитру сайта здесь. Выбирайте цвет на ваш вкус</span>
		        </div>
		    </div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		userNameColor: requestUserNameColor(state),
	}
}

export default connect(mapStateToProps, {modalOnOrOff, initSiteColorAC})(ColorPickerModal);