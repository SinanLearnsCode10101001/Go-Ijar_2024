import React from 'react';

const ChatbotActionProvider = ({ createChatBotMessage, setState, children }) => {

 
  
  
    const handleMCQ = (options) => {



    const message = createChatBotMessage("Please choose one of the following options:", {
      widget: "mcqWidget",
      withAvatar: true, 
      loading: true,
      terminateLoading: true,
      delay: 500,
      widgetData: options,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleOptionSelection = (selectedOption) => {
    let message;
    let url;

    switch (selectedOption) {
      case 'vehicles':
        message = createChatBotMessage("Redirecting to Vehicles...");
        url = './Book-Now/Vehicles';
        break;
      case 'equipment':
        message = createChatBotMessage("Redirecting to Equipment...");
        url = './Book-Now/Equipment';
        break;
      case 'destinations':
        message = createChatBotMessage("Redirecting to Destinations...");
        url = './Destinations';
        break;
      default:
        message = createChatBotMessage("Invalid option selected.");
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    if (url) {
      window.location.href = url;
    }
  };


  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleMCQ,
            handleOptionSelection,
          },
        });
      })}
    </div>
  );
};

export default ChatbotActionProvider;