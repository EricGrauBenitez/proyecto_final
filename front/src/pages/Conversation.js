import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../css/ChatLayout.css';

const ConversationPage = () => {
    const { chatId } = useParams()
    const userId = localStorage.getItem('userId');

    const currentChat = useSelector(state => state.chat.currentChat)
    const conversation = useSelector(state => state.chat.conversation)

    return (
        <section className="chat-wrapper">
            <div className="chat-messages">
                {/* Mostrar todas las conversaciones en chatMessages */}
                <div className="chat-message">
                    {conversation && conversation.map(({ question, answer }, i) => (
                        <div key={i} className="message-bubble">
                            <div className="question message-wrapper">
                                <p>Human</p>
                                <p>{question}</p>
                            </div>
                            {answer && (
                                <div className="answer message-wrapper">
                                    <p> &#8704 :</p>
                                    <p>{answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ConversationPage;