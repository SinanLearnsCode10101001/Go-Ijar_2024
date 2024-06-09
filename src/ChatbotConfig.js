import { createChatBotMessage } from 'react-chatbot-kit';
import ChatbotMCQWidget from './ChatbotMCQWidget';

const ChatbotConfig = {
  botName: 'Go-Ijar Assistant',
  initialMessages: [createChatBotMessage("Hello! How can I help you today? Type 'help' to get started.")],
  widgets: [
    {
      widgetName: "mcqWidget",
      widgetFunc: (props) => <ChatbotMCQWidget {...props} />,
    },
  ],
};

export default ChatbotConfig;