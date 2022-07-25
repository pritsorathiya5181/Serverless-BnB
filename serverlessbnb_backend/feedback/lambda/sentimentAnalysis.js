/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
// const language = require('@google-cloud/language');
// const client = new language.LanguageServiceClient();
const language = require('@google-cloud/language');
const projectId ='dev-exchanger-340821';
const keyFilename = 'shining-weft-343703-0baf5b46d038.json';
const client = new language.LanguageServiceClient({projectId,keyFilename});
exports.helloWorld = (req, res) => {
  const text = req.body.description;
  console.log(text);
  // Format for Cloud Natural Language API
  const document = {
    type: 'PLAIN_TEXT',
    content: text,
  };
   
   (async () => {
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;   
    var sentimentValue="neutral";
      if(sentiment.score<0){
        sentimentValue="negative";
      }
      else if(sentiment.score>0){
        sentimentValue="postive";
      }
      else{
        sentimentValue="neutral";
      }
     const jsonData = {
        "text": text,
        "sentimentScore":sentiment.score,
        "sentimentMagnitude":sentiment.magnitude,
        "sentimentValue":sentimentValue
      }
    res.status(200).send(jsonData);
    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  })();
};
