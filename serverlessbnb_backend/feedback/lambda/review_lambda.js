var req = require('request')
const AWS = require('aws-sdk')

exports.handler = async (event, context,callback) => {
  try{
     var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })
     var description = event.currentIntent.slots.description;
  var room = event.currentIntent.slots.room;
  var userName = event.currentIntent.slots.userName.toString();
  var rating = event.currentIntent.slots.rating.toString();
  
  console.log(room+" "+ userName+" "+rating);
  const response = {
    statusCode: 200,
    body: {
      description,
      room,
      rating,
      
    },
  };
  
 
  
const getSentimentAnalysis = async (description, room) => {
  
  return new Promise((resolve, reject) => {
    var data = JSON.stringify({
      description : description
    })

    const params = {
      url: 'https://us-central1-dev-exchanger-340821.cloudfunctions.net/feedback_analysis',
      headers: {
        'Content-Type': 'application/json',
      },
      json: JSON.parse(data),
    }
    
    console.log(params)
    req.post(params, function (err, res, body) {
      if (err) {
        console.log('------error------', err)
      } else {
        console.log('------success--------', body.sentimentValue)
        const resultData = {
          "userName": userName,
          "roomNumber": room,
          "rating": rating,
          "description":body.description,
          "sentimentValue":body.sentimentValue,
        }
        
        console.log(resultData);
         var getParams = {
         TableName: 'feedback',
         Item: {
         userName: { S: resultData.userName },
         roomNumber: { S: resultData.roomNumber },
         rating: { S: resultData.rating},
         description: { S: description},
         sentimentValue: { S: resultData.sentimentValue }
    },
  }

 ddb.putItem(getParams)
      .promise()
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('Error', error)
      })
        resolve(body)
      }
    })
    
  })
}
var result = await getSentimentAnalysis(description,room);

callback(null, {
    dialogAction: {
      type: 'Close',
      fulfillmentState: 'Fulfilled',
      message: {
        contentType: 'PlainText',
        content: result.length > 0 ? result : 'Thank you for submitting the feedback',
      },
    },
  })
console.log(result);
  }
catch(e){
  
}


}