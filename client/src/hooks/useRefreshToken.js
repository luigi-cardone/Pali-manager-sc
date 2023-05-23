import axios from '../api/axios'
import useAuth from './useAuth'

export default function useRefreshToken() {
    const { setAuth} = useAuth()

    const refresh = async () =>{
        const res = await axios.get('/refresh', {
            withCredentials : true
        })
        setAuth(prev => {
            const newAuth = {...prev, 
                role: res.data.role,
                nome: res.data.nome,
                cognome: res.data.cognome,
                user_id: res.data.user_id,
                accessToken : res.data.accessToken
            }
            return newAuth
        })
        return res.data.accessToken
    }

  return refresh
}
