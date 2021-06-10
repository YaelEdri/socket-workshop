import React from 'react'
import '../styles/messageCard.scss'

const MessageCard = ({ isMe, ip, content, sender, date }) => {
    return (
        <div className={'message-card-container' + (isMe ? ' me' : '')}>
            <div className={"message-card" + (isMe ? ' me' : '')}>
                <div className="message-card--header"><strong>{`${ip}, ${sender}`}</strong></div>
                <div className="message-card--body">
                    <div className="message-card--body--text">{content}</div>
                    <div className="message-card--body--ts">{date}</div>
                </div>
            </div>
        </div>
    )
}

export default MessageCard;