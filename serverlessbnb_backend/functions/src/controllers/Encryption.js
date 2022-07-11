const router = require('express').Router()
const Strings = require('../utils/String')

router.post('/doDecryption', async (req, res) => {
  const { cipherText, key, plainText } = req.body
  try {
    let lowerAlphas = Strings.ALPHABET.toLowerCase().split('')
    let upperAlphas = Strings.ALPHABET.toUpperCase().split('')

    const decryptedCipher = cipherText
      .split('')
      .map((char) => {
        if (!lowerAlphas.includes(char) && !upperAlphas.includes(char)) {
          res
            .status(400)
            .send({ success: false, message: 'Error decypting text' })
        }

        let lcDecryptIndex =
          (lowerAlphas.indexOf(char.toLowerCase()) - key) % 26
        lcDecryptIndex =
          lcDecryptIndex < 0 ? lcDecryptIndex + 26 : lcDecryptIndex
        const lcDecryptedChar = lowerAlphas[lcDecryptIndex]

        let ucDecryptIndex =
          (upperAlphas.indexOf(char.toUpperCase()) - key) % 26
        ucDecryptIndex =
          ucDecryptIndex < 0 ? ucDecryptIndex + 26 : ucDecryptIndex
        const ucDecryptedChar = upperAlphas[ucDecryptIndex]

        return lowerAlphas.indexOf(char) !== -1
          ? lcDecryptedChar
          : ucDecryptedChar
      })
      .join('')

    if (plainText === decryptedCipher) {
      res
        .status(200)
        .send({ success: true, message: 'Authentication successful' })
    } else {
      res.status(400).send({ success: false, message: 'Authentication failed' })
    }
  } catch (error) {
    console.log('ceaser cipher authentication error==', error)
    res.status(400).send({ success: false, message: 'Error in authentication' })
  }
})

module.exports = router
