import api from '../../utils/api'
import { useState, useEffect } from 'react'
import styles from './OnlySuggest.module.css'
import { useParams } from 'react-router-dom'
import {FaRegComments,FaTeamspeak , FaUserCircle, FaCalendarDay,FaRegThumbsUp,FaRegCheckSquare,FaArrowAltCircleLeft,FaRegCommentDots } from "react-icons/fa";
import { Link } from 'react-router-dom'
import CommentForm from '../form/CommentForm'
import useMessage from '../../hooks/useMessage';



function OnlySuggest() {
  const [suggest, setSuggests] = useState([])
  const { id } = useParams()
  const [token] = useState(localStorage.getItem('token') || '')
  const {setMessage} = useMessage()


  useEffect(() => {
    api.get(`/sugestoes/${id}`).then((response) => {
      setSuggests(response.data.suggest)
    })
  }, [id])

  async function AddComments(comment){
    let msgType = "success"
    console.log("OPa billll")
      
    const data = await api.patch(`/sugestoes/comentario/${id}`, comment,
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
    
    setTimeout(() => {
      window.location.reload();

    }, 1000)

    setMessage(data.message, msgType)
  }


  return (
    <>  
      { suggest && (
        <div className={styles.divConteiner}>
            <div  className={styles.form_container}>
            
                    <Link className={styles.btnEs} to="/suggests"> 
                    <FaArrowAltCircleLeft/>
                    </Link>
              
                  <div className={styles.divDescription}>
                    <h3>{suggest.titulo}</h3>
                    <h5>{suggest.description}</h5>
                  </div>
                  
                 <h4>Comentários</h4>
                  <div>
                  {suggest.comments ? (
                    <>
                      <p>{suggest.comments.comment}</p>
                      {suggest.comments.map((obj, index) => (<div key={index}>
                        <div className={styles.divListLogNome}>
                          <FaTeamspeak></FaTeamspeak>                        
                          <h6>{obj.nome}</h6>
                        </div>
                        <div className={styles.divListComments}> 
                        <p> {obj.comment}</p>
                        </div>
                    </div>))}
                    </>
                  ):(<p>Não tem </p>)}
                  </div>
                  <div className={styles}>
                    <CommentForm handleSubmit={AddComments} btnText="Enviar"></CommentForm>
                    <input className={styles.imputComent}></input>
                  </div>                 

            </div>

          
           
            <form className={styles.form_container}>
                <div className={styles.divAviso}>
                <p><FaRegCheckSquare className={styles.verde}></FaRegCheckSquare> {suggest.status}</p>
                {suggest.comments ? (<p>
                    <FaRegComments></FaRegComments>{suggest.comments.length} comentários</p> ) : 
                    <span>0 voto</span>}
                  <p><FaCalendarDay className={styles.date}></FaCalendarDay>{suggest.date}</p>
                  {suggest.likes ? (<p>
                    <FaRegThumbsUp className={styles.azul}></FaRegThumbsUp>{suggest.likes.length} voto(s)</p> ) : 
                    <span>0 voto</span>}
                    
                </div>
              </form>

        </div>
      )}
        {suggest.length === 0 && (<p>Não há no momento!</p>)}
    </>  
    )
}

export default OnlySuggest