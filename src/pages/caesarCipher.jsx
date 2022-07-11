import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

const CaesarCipher = () => {
  let navigate = useNavigate()
  const [text, setText] = React.useState('Hello World!')
  const [key, setKey] = React.useState('3')

  const validationSchema = Yup.object().shape({
    decryptText: Yup.string().required('Provide a valid decryption text'),
  })
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  })

  function makeid(length) {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  React.useEffect(() => {
    setKey(makeid(5))
  }, [])

  const { errors } = formState
  async function onSubmit({ decryptText }) {
    // write code to perform caesar cipher
    console.log(decryptText)
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <Helmet>
        <title>B&B | 3MFA</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-2 w-full lg:w-96'>
          <p className='text-2xl text-center mb-5 text-black font-bold'>
            Caser Cipher
          </p>

          <p className='text-2xl text-center text-black font-bold'>
            Plain Text: {text}
          </p>

          <p className='text-2xl text-center mb-5 text-black font-bold'>
            Encryption Key: 3
          </p>

          <label htmlFor='decryptText' className='text-black font-bold text-xl'>
            Enter decrypted text: {key}
          </label>
          <input
            className='bg-gray-50 outline-none p-2 rounded-lg border-2 border-gray-600'
            type='decrypt text'
            name='decryptText'
            id='decryptText'
            placeholder='Decrypt text'
            {...register('decryptText')}
          />
          <p className='text-red-600'>{errors.decryptText?.message}</p>
          <button
            className='border-gray-600 text-black border-2 rounded-md font-bold text-xl hover:bg-gray-600 hover:text-white p-2 mt-4'
            type='submit'
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  )
}

export default CaesarCipher
