import { useState, useContext } from 'react'


import Input from '../../components/form/input'
import styles from '../../components/form/form.module.css'

import {Context} from '../../context/UserContext'

function Register() {

    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault()
        register(user)
    }

  return (
    <section className={styles.form_container}>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <Input 
        text="Nome"
        type="text"
        name="name"
        placeholder="Digite o seu nome" 
        handleOnchange={handleChange}
        />

        <Input 
        text="E-mail"
        type="email"
        name="email"
        placeholder="Digite o seu email" 
        handleOnchange={handleChange}
        />

        <Input 
        text="Senha"
        type="password"
        name="password"
        placeholder="Digite o seu password" 
        handleOnchange={handleChange}
        />

        <Input 
        text="Confirmação de senha"
        type="password"
        name="confirmpassword"
        placeholder="confirme seu password" 
        handleOnchange={handleChange}
        />

        <input type="submit" value="cadastrar"></input>
      </form>
     
    </section>
  )
}

export default Register
