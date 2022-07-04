import React, { Component } from "react";
import { AmplifyChatbot } from "@aws-amplify/ui-react/legacy";
import Amplify from "aws-amplify"


Amplify.configure({
    aws_project_region: 'us-east-1',
    Auth: {
      identityPoolId: "us-east-1:f2220f75-da92-4f98-8126-fa44b8d42f3b",
      region: 'us-east-1'
    },
    bots: {
      "BookTrip_dev": {
        "name": "BookTrip_dev",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  
  });

class Chatbot extends Component {
  state = {};

  render() {
    return (
      <AmplifyChatbot
        title="ServerlessBB"
        botName="BookTrip_dev"
        welcomeMessage="How can I help you?"
      />
    );
  }
}

export default Chatbot;