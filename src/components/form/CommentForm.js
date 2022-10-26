import { useState,useEffect } from 'react'
import formStyles from './Comments.module.css'
import AreaInput from './AreaInput'

function CommentForm({handleSubmit, btnText, sugestData}) {
  const [suggest, setComment] = useState([])


  const submit = (e) => {
    e.preventDefault()
    handleSubmit(suggest)
  }
 
  
   function handlechange(e) {
    console.log(e.target.name)
    console.log(e.target.value)

    setComment({...suggest , [e.target.name]: e.target.value})
   }

  return (
    <>
    <div className={formStyles.divConteiner}>

      <form onSubmit={submit} className={formStyles.form_container}>
      

      <AreaInput
      type="area"
      text="Escreva seu comentário"
      name="comment"
      placeholder="Descreva seu comentário"
      handleOnchange={handlechange}
      value={suggest.comment}
      />

      <input type="submit" value={btnText}/>

      </form>

    </div>
   </>
  )
}

export default CommentForm
