import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Input from '../form/input'
import styles from '../../components/form/form.module.css'
import {Context} from '../../context/UserContext'

function Login() {

    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault()
        login(user)
    }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

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

    
        <input type="submit" value="Entrar"></input>
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  )
}

export default Login
