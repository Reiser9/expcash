import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './HistoryModal.css';

import {modalOnOrOff} from '../modalCommon.js';

const HistoryModal = ({modalOnOrOff}) => {
	useEffect(() => {
        $("body").on("keydown", function(e){
        	if(e.which === 27){
        		modalOnOrOff('setHistoryModalOn', false);
        	}
        });
	});

	const historyModalOff = () => {
		modalOnOrOff('setHistoryModalOn', false);
	}

	return(
		<div className="modalw history__modal">
		    <div className="modalw__inner">
		        <div className="modalw__content history__content">
		            <div className="modalw__cross history__cross" onClick={historyModalOff}>
		                <i className="fas fa-times"></i>
		            </div>

		            <div className="modalw__title en">
		                история игр
		            </div>

		            <div className="history__games--inner">
		            	<button className="button history__games--link expbattler__history history__games--link--active">
		            		expduel
		            	</button>

		            	<button className="button history__games--link expbattler__history">
		            		expduel
		            	</button>
		            </div>

		            <div className="history__games--result--inner">
		                <div className="history__games--result">
		                    <div className="history__games--result--views">
		                        <div className="history__games--result--views--text en">
		                            ставка
		                        </div>

		                        <div className="history__games--result--views--text blue en">
		                            коэфф
		                        </div>

		                        <div className="history__games--result--views--text blue en">
		                            время
		                        </div>

		                        <div className="history__games--result--views--text en">
		                            исход
		                        </div>
		                    </div>

		                    <div className="history__games--result--item">

		                        <div className="histori__games--mobile en">
		                            ставка
		                        </div>

		                        <div className="history__games--result--item--text en">
		                            100 exp
		                        </div>

		                        <div className="histori__games--mobile en">
		                            коэфф
		                        </div>

		                        <div className="history__games--result--item--text en">
		                            1.5x
		                        </div>

		                        <div className="histori__games--mobile en">
		                            время
		                        </div>

		                        <div className="history__games--result--item--text en">
		                            21:15
		                        </div>

		                        <div className="histori__games--mobile en">
		                            исход
		                        </div>

		                        <div className="history__games--result--item--text en win">
		                            150 exp
		                        </div>
		                    </div>

		                    <div className="history__games--result--item">

		                        <div className="histori__games--mobile en">
		                            ставка
		                        </div>

		                        <div className="history__games--result--item--text en">
		                            100 exp
		                        </div>

		                        <div className="histori__games--mobile en">
		                            коэфф
		                        </div>

		                        <div className="history__games--result--item--text en">
		                            1.5x
		                        </div>

		                        <div className="histori__games--mobile en">
		                            время
		                        </div>

		                        <div className="history__games--result--item--text en">
		                            21:15
		                        </div>

		                        <div className="histori__games--mobile en">
		                            исход
		                        </div>

		                        <div className="history__games--result--item--text en lose">
		                            0 exp
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

export default connect(mapStateToProps, {modalOnOrOff})(HistoryModal);