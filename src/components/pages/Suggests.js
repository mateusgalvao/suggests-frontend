import api from '../../utils/api'
import { useEffect, useState } from "react";
import { FaThumbsUp, FaArrowAltCircleRight,FaEnvelope } from "react-icons/fa";
import styles from './Suggests.module.css'
import useMessage from '../../hooks/useMessage';
import { Link } from 'react-router-dom'

//format data
function Suggests() {
  const [suggests, setSuggests] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const [userId] = useState(localStorage.getItem('userId') || '')

  const {setMessage} = useMessage()

  useEffect(() => {
    api.get('/sugestoes').then((response) => {
      setSuggests(response.data.suggests)
    })
  }, [])
  

  async function likou(id) {

    if(!userId){
        let message = "Por favor realize o login para curtir!"
        let msgType = 'error'

        setMessage(message, msgType)
        console.log(message)
      }else{
        let msgType = 'success'

        const data = await api
        .patch(`/sugestoes/curtir/${id}`,{userId:userId},{
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }).then((response) =>{
          return response.data
        }).catch((err)=>{
          console.log(err)
          msgType = 'error'
          return err.response.data
        })
    
        setTimeout(() => {
          window.location.reload();
    
        }, 3000)

        setMessage(data.message, msgType)
    }
  }

  function formatDate( date ){
    if( typeof date === "number" ) date = date.toString();
    const strNum = date.replace(/[^\d]/g, '/')

    return `${strNum.substr(0, 10 )}`;
  }
  
  return (
    <section>
      <div>
        {suggests.length > 0 &&
          suggests.map((s) => (
            <div className={styles.conteiner} key={s._id}>
               {s.likes ? ( 
                 <button className={styles.divBtn}onClick={() => {likou(s._id)}}>
                    <span>{s.likes.length}</span>
                    <FaThumbsUp></FaThumbsUp>
                 </button>               
              ) : <span>!</span>}
                  <div className={styles.tituDesc}>
                    <div className={styles.titulo}>{s.titulo}</div>
                    <div className={styles.description}>{s.description}</div>
                  </div>
                  <div className={styles.date}>Data: {formatDate(s.date)}</div>
                    
                      <Link className={styles.divBtnEs} to={`/OnlySuggest/${s._id}`}>
                      <FaArrowAltCircleRight></FaArrowAltCircleRight>
                      </Link>
                     
            </div> ))}
        {suggests.length === 0 && (<p>Não há no momento!</p>)}
      </div>
    </section>
  )
}
export default Suggests
