import React from 'react';

const ChatbotMCQWidget = () => {

    const options = [
        {
          id: 1,
          text: "Rent Vehicles",
          handler: () => {
            // Handler function for Option 1
            console.log("Option 1 clicked");
          },
        },
        {
          id: 2,
          text: "Rent Equipment",
          handler: () => {
            // Handler function for Option 2
            console.log("Option 2 clicked");
          },
        },

        {
            id: 3,
            text: "View Destinations",
            handler: () => {
              // Handler function for Option 2
              console.log("Option 2 clicked");
            },
          },
        // Add more options as needed
      ];  


  return (
    <div>
        <div className='spacing_container' style={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap'}}>
      {options.map((option) => (
        
        <button className='default' style={{margin: '5px', width: '9em'}}
        key={option.id} onClick={option.handler}>
          {option.text}
        </button>
      ))}
    </div>
    </div>
  );
};  

export default ChatbotMCQWidget;