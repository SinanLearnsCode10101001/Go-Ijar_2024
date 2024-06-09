import React from 'react';

const ChatbotMessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);

    if (message.includes('help')) {
      actions.handleMCQ([
        { text: "Vehicles", handler: () => actions.handleOptionSelection('vehicles'), id: 1 },
        { text: "Equipment", handler: () => actions.handleOptionSelection('equipment'), id: 2 },
        { text: "Destinations", handler: () => actions.handleOptionSelection('destinations'), id: 3 },
      ]);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: actions,
        });
      })}
    </div>
  );
};

export default ChatbotMessageParser;