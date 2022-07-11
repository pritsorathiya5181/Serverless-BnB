const router = require('express').Router()
const Strings = require('../utils/String')
const { getFirestore } = require('firebase-admin/firestore')

router.post('/addAnswers', async (req, res) => {
  const db = getFirestore()
  const { customerId, questions, answers } = req.body

  try {
    const docRef = db.collection(Strings.COLLECTION_NAME).doc(customerId)

    const userData = {
      questions: questions,
      answers: answers,
    }
    await docRef.set(userData)
    res
      .status(200)
      .send({ success: true, message: 'Successfully added answers' })
  } catch (error) {
    console.log('adding answer error==', error)
    res
      .status(400)
      .send({ success: false, message: 'Error adding answers to the database' })
  }
})

router.post('/getQuestions', async (req, res) => {
  const db = getFirestore()
  const { customerId } = req.body

  try {
    const snapshot = await db
      .collection(Strings.COLLECTION_NAME)
      .doc(customerId)
      .get()

    if (snapshot.exists) {
      const data = snapshot.data()
      const { questions: dbQuestions } = data

      if (dbQuestions.length > 0) {
        res.status(200).send({
          success: true,
          message: 'Successfully fetched question',
          question: dbQuestions,
        })
      } else {
        res
          .status(400)
          .send({ success: false, message: 'Error fetching questions' })
      }
    } else {
      res.status(400).send({ success: false, message: 'User does not exist' })
    }
  } catch (error) {
    console.log('fetching question error==', error)
    res
      .status(400)
      .send({ success: false, message: 'Error fetching questions' })
  }
})

router.post('/verifyAnswers', async (req, res) => {
  const db = getFirestore()
  const { customerId, questions, answers } = req.body

  try {
    const snapshot = await db
      .collection(Strings.COLLECTION_NAME)
      .doc(customerId)
      .get()

    if (snapshot.exists) {
      const data = snapshot.data()
      const { questions: dbQuestions, answers: dbAnswers } = data
      const getQuestionIndex = dbQuestions.findIndex(
        (question) => question === questions[0]
      )
      const getAnswerIndex = dbAnswers.findIndex(
        (answer) => answer === answers[0]
      )

      if (
        getQuestionIndex > -1 &&
        getAnswerIndex > -1 &&
        getQuestionIndex === getAnswerIndex
      ) {
        res
          .status(200)
          .send({ success: true, message: 'Successfully verified answers' })
      } else {
        res
          .status(400)
          .send({ success: false, message: 'Error verifying answers' })
      }
    } else {
      res.status(400).send({ success: false, message: 'User does not exist' })
    }
  } catch (error) {
    console.log('verify answer error==', error)
    res.status(400).send({ success: false, message: 'Error verifying answers' })
  }
})

module.exports = router
