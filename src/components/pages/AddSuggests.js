import api from '../../utils/api'
import { useState } from 'react'
import SuggestForm from '../form/SuggestsForm'
import { useNavigate } from 'react-router-dom';

import useMessage from '../../hooks/useMessage'

function AddSuggests() {
    const {setMessage} = useMessage()
    const [token] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate();


    async function cadastroS(suggests){
      let msgType = "success"
      
      const data = await api.post('/sugestoes/create', suggests,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      })
      .then((response) => {
          return response.data
      }).catch((err)=>{
        console.log(err)
        msgType = 'error'
        return err.response.data
      })
      
      console.log(data.message, msgType)

      setMessage(data.message, msgType)

      navigate('/suggests')

      }

      return (
      <section>
        <SuggestForm handleSubmit={cadastroS} btnText="Cadastrar" />
      </section>
      )
}

export default AddSuggests