import React, {useEffect, useState} from 'react';
import $ from 'jquery';

import './Chat.css';

import ChatOnline from './ChatOnline/ChatOnline.jsx';
import ChatSend from './ChatSend/ChatSend.jsx';
import ChatContent from './ChatContent/ChatContent.jsx';
import {chat} from '../../assets/js/chat.js';

const Chat = () => {
    const [messageCount, setMessageCount] = useState(0);
    const [chatDown, setChatDown] = useState(false);

    useEffect(() => {
        chat();
    }, []);

    useEffect(() => {
        var ch = $(".chat__inner"),
            div_sh = $(".chat__scroll")[0].scrollHeight,
            div_h = ch.height();

        $(".chat__scroll--bottom").on("click", function(){
            setMessageCount(0);
            setChatDown(false);
            ch.animate({scrollTop: div_sh},{duration: 350});
            return false;
        });

        ch.on("scroll", function(){
            div_sh = $(".chat__scroll")[0].scrollHeight;
            div_h = ch.height();
            if($(this).scrollTop() < div_sh - div_h){
                setChatDown(true);
            }
            else{
                setChatDown(false);
                setMessageCount(0);
            }
        });
    }, [chatDown]);

    return(
        <>
            <div className="main__chat--content">
                <div className="chat__content">
                    <div className="chat">
                        {chatDown 
                        && <div className="chat__scroll--bottom">
                            <i className="fas fa-arrow-down"></i>

                            {messageCount !== 0 && 
                            <div className="chat__scroll--index">
                                {messageCount}
                            </div>}
                        </div>}

                        <ChatOnline />

                        <ChatContent />
                    </div>

                    <ChatSend chatDown={chatDown} setMessageCount={setMessageCount} messageCount={messageCount} />
                </div>
            </div>

            <div className="chat__close--inner mobile__off">
                <svg className="arrow chat__close--icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175"
                    xmlSpace="preserve"><g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
                    " /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                </svg>
            </div>
        </>
    )
}

export default Chat;