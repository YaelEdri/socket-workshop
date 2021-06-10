import React from 'react'
import '../styles/connectCard.scss'

const ConnectCard = ({ isMe, ip, action }) => {
    return (
        <div className='connect-card-container'>
            <div className="connect-card">{isMe ? `את/ה ${action === 'connect' ? 'התחברת' : 'התנתקת'}` : `${ip} ${action === 'connect' ? ' התחבר/ה' : 'התנתק/ה'}`}</div>
        </div>
    )
}

export default ConnectCard;