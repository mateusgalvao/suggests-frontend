import { Link } from 'react-router-dom'
import React, { useContext } from 'react'

import styles from './Navbar.module.css'

import { Context } from '../context/UserContext'

function Navbar() {
  const { authenticated, logout } = useContext(Context)

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img/>
        <h2>MTZIN</h2>
      </div>
      <ul>     
        {
          authenticated ? (
          <>

          <li>
              <Link to="/AddSuggests">Adicionar</Link>
          </li>
          
          <li>
          <Link to="/suggests"> Sugestoes</Link>
          </li>

          <li>
          <Link onClick={logout}>Sair</Link>
          </li>
          </>):( 
          <>
          <li>
          <Link to="/login">Entrar</Link>
          </li>
          </>
          )
        }
         
      </ul>
    </nav>
  )
}

export default Navbar
