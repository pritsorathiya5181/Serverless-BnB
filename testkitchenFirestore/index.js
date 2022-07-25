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
      .collection("Kitchen")
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

  var getId, getCost, getDish, getQuantity, getUserId;

  let records_id;
  let records_cost;
  let records_dish;
  let records_quantity;
  let records_userId;

  const record = event.Records[0];
  console.log("DynamoDB Record: %j", record.dynamodb);

  records_id = record.dynamodb.NewImage.id;
  records_cost = record.dynamodb.NewImage.cost;
  records_dish = record.dynamodb.NewImage.dish;
  records_quantity = record.dynamodb.NewImage.quantity;
  records_userId = record.dynamodb.NewImage.userId;

  JSON.stringify(records_id);
  JSON.stringify(records_cost);
  JSON.stringify(records_dish);
  JSON.stringify(records_quantity);
  JSON.stringify(records_userId);

  getId = records_id.S;
  getCost = records_cost.S;
  getDish = records_dish.S;
  getQuantity = records_quantity.S;
  getUserId = records_userId.S;

  //Query
  try {
    const docRef = await db.collection("Kitchen").doc(getId).set({
      id: getId,
      cost: getCost,
      dish: getDish,
      quantity: getQuantity,
      userId: getUserId,
    });
    console.log("One record inserted");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return true;
};
