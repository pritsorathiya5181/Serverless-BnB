console.log("Loading function");
const admin = require("firebase-admin");
const serviceAccount = require("./csci-5410-serverless-bnb-firebase-adminsdk-7qz0s-7e91dc0453.json");

exports.handler = async (event, context) => {
  console.log(event);
  console.log("Event name:", event.Records[0].eventName);
  // Establish a connection to the database
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    admin.app();
  }
  const db = admin.firestore();
  console.log("Connected!");

  if (event.Records[0].eventName == "REMOVE") {
    console.log(event.Records[0].dynamodb);

    let delete_id;
    var deleteId;

    const delete_record = event.Records[0];

    delete_id = delete_record.dynamodb.OldImage.id;
    JSON.stringify(delete_id);
    deleteId = delete_id.S;

    const delUser = await db
      .collection("Room")
      .doc(deleteId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    console.log("Remove Detected");
    return;
  }

  var getId, getAvail, getCost, getNumber, getType, getUserId;

  let records_id;
  let records_avail;
  let records_cost;
  let records_number;
  let records_type;
  let records_userId;

  const record = event.Records[0];
  console.log("DynamoDB Record: %j", record.dynamodb);

  records_id = record.dynamodb.NewImage.id;
  records_avail = record.dynamodb.NewImage.available;
  records_cost = record.dynamodb.NewImage.cost;
  records_number = record.dynamodb.NewImage.number;
  records_type = record.dynamodb.NewImage.type;
  records_userId = record.dynamodb.NewImage.userId;

  JSON.stringify(records_id);
  JSON.stringify(records_avail);
  JSON.stringify(records_cost);
  JSON.stringify(records_number);
  JSON.stringify(records_type);
  JSON.stringify(records_userId);

  getId = records_id.S;
  getAvail = records_avail.S;
  getCost = records_cost.S;
  getNumber = records_number.S;
  getType = records_type.S;
  getUserId = records_userId.S;

  //Query
  try {
    const docRef = await db.collection("Room").doc(getId).set({
      id: getId,
      available: getAvail,
      cost: getCost,
      number: getNumber,
      type: getType,
      userId: getUserId,
    });
    console.log("One record inserted");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return true;
};
