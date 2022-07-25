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

    let delete_user;
    var deleteUser;

    const delete_record = event.Records[0];

    delete_user = delete_record.dynamodb.OldImage.userName;
    JSON.stringify(delete_user);
    deleteUser = delete_user.S;

    const delUser = await db
      .collection("User")
      .doc(deleteUser)
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

  var getUser, getEmail, getStatus;

  let records_user;
  let records_email;
  let records_status;

  const record = event.Records[0];
  console.log("DynamoDB Record: %j", record.dynamodb);

  records_user = record.dynamodb.NewImage.userName;
  records_email = record.dynamodb.NewImage.email;
  records_status = record.dynamodb.NewImage.status;
  JSON.stringify(records_user);
  JSON.stringify(records_email);
  JSON.stringify(records_status);

  getUser = records_user.S;
  getEmail = records_email.S;
  getStatus = records_status.S;

  try {
    const docRef = await db.collection("User").doc(getUser).set({
      userName: getUser,
      email: getEmail,
      status: getStatus,
    });
    console.log("One record inserted");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return true;
};
