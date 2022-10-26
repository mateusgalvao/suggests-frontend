import { useState,useEffect } from 'react'
import formStyles from './form.module.css'
import Input from './input'
import AreaInput from './AreaInput'


function SuggestForm({handleSubmit, btnText, sugestData}) {
  const [suggests, setSuggests] = useState([])


  const submit = (e) => {
    e.preventDefault()
    console.log(suggests)
    handleSubmit(suggests)
  }
 
  
   function handlechange(e) {
    setSuggests({...suggests, [e.target.name]: e.target.value})
   }

  return (
    <>
    <div className={formStyles.divConteiner}>

      <form onSubmit={submit} className={formStyles.form_container}>

      <Input
      type="text"
      text="Titulo da sugestão"
      name="titulo"
      placeholder="digite o titulo"
      handleOnchange={handlechange}
      value={suggests.titulo}
      />

      <AreaInput
      type="area"
      text="Descreva sua sugestão"
      name="description"
      placeholder="Descreva sua sugestão"
      handleOnchange={handlechange}
      value={suggests.description}
      />

      <input type="submit" value={btnText}/>

      </form>
      <form className={formStyles.form_container}>
        <div className={formStyles.divAviso}>
          <h2>Nova ideia</h2>
          <h4>
          <p>
          Seu feedback contribui muito. Obrigado por ter dedicado um pouco do seu tempo para nos ajudar.”
          </p>
          <p>Obrigado!</p>

          </h4>
        </div>
      </form>

    </div>
   </>
  )
}

export default SuggestForm
