const router = require('express').Router()
const Strings = require('../utils/String')

router.post('/doDecryption', async (req, res) => {
  const { cipherText, key, plainText } = req.body
  try {
    let lowerAlphas = Strings.ALPHABET.toLowerCase().split('')
    let upperAlphas = Strings.ALPHABET.toUpperCase().split('')

    const encryptedCipher = cipherText
      .split('')
      .map((char) => {
        if (!lowerAlphas.includes(char) && !upperAlphas.includes(char)) {
          res
            .status(400)
            .send({ success: false, message: 'Error decypting text' })
        }

        let lcEncryptIndex =
          (lowerAlphas.indexOf(char.toLowerCase()) - key) % 26
        lcEncryptIndex =
          lcEncryptIndex < 0 ? lcEncryptIndex + 26 : lcEncryptIndex
        const lcEncryptedChar = lowerAlphas[lcEncryptIndex]

        let ucEncryptIndex =
          (upperAlphas.indexOf(char.toUpperCase()) - key) % 26
        ucEncryptIndex =
          ucEncryptIndex < 0 ? ucEncryptIndex + 26 : ucEncryptIndex
        const ucEncryptedChar = upperAlphas[ucEncryptIndex]

        return lowerAlphas.indexOf(char) !== -1
          ? lcEncryptedChar
          : ucEncryptedChar
      })
      .join('')

    if (plainText === encryptedCipher) {
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
