import chatbox_logo from './images/chat_logo.png';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from "react"

import { Chatbot } from 'react-chatbot-kit'
import config from './ChatbotConfig.js';
import MessageParser from './ChatbotMessageParser.js';
import ActionProvider from './ChatbotActionProvider.js';


const Chatbox = () => {

    const [chatbotModal, setChatbotModal] = useState(false)

    
    const handleChatbotModal = () => {
        setChatbotModal(!chatbotModal)
    }

    const chatbox_variants = {
        visible: { y: 0},
        hidden: { y: '200%'}
    }

    const [hidden, setHidden] = useState(false)

    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, scrollY.on('change', (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    }))
    

    return (
        <>
        <motion.div className='chatBox'
        variants = {chatbox_variants}
        animate = {hidden ? 'hidden' : 'visible'}
        transition={{duration: 0.35, ease: 'easeInOut'}}
        onClick={handleChatbotModal}>
            <img src={chatbox_logo} className="chatbox_logo" alt="chatbox_logo" />
        </motion.div>



        {chatbotModal &&
            <div className='logout-modal'>
            <div className="overlay"></div>
                <div className='chatbot-outer-container'>

                <Chatbot 
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}/>
                </div>
                <div className="buttons_spacing" style={{justifyContent: 'center'}}>

                </div>
            </div>

        }


        </>

    ) 
        
}
 
export default Chatbox;