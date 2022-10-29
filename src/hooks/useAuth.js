import api from '../utils/api'
import React, {useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useMessage from './useMessage'

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate();
    const {setMessage} = useMessage()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
          setAuthenticated(true)
        }
        if(userId){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(userId)}`
          setAuthenticated(true)
        }
    
    }, [])
    
 
    async function register(user){
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'
        try {
            const data = await api.post('/users/register', user)
            .then((response)=>{
                return response.data
            })
        await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'            
        }
        setMessage(msgText, msgType)
    }

    async function login(user){
        let msgText = "login realizado com sucesso"
        let msgType = "success"
        try {
            const data = await api.post('/users/login', user)
            .then((response) => {
                return response.data
            })
            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = "error"            
        }
        setMessage(msgText, msgType)


    }

    async function authUser(data){
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('userId', JSON.stringify(data.userId))
        navigate('/suggests')

    }

    async function logout(){
        const msgText = "Logout realizado com sucesso!"
        const msgType = "success"
        setTimeout(() => {
        setAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')

        api.defaults.headers.Authorization = undefined
        navigate('/')
            window.location.reload();
        }, 1000)
        
        setMessage(msgText, msgType)

    }


    return { authenticated, register,login, logout }
}