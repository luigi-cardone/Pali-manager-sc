import { CButton, CCallout, CForm, CFormInput, CFormCheck } from "@coreui/react"
import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Spinner from '../Components/spinner'
import useAuth from '../hooks/useAuth'
import { axiosPrivate } from "../api/axios"
import appName from "../config/app_name"

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const { setAuth, persist, setPersist } = useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({error: false, message: ""})
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        try{
            const res = await axiosPrivate.post("/login",
                    JSON.stringify(credentials),
                    {
                        headers: {'Content-Type' : 'application/json'},
                        withCredentials: true
                    }
                      )
            if(res.data.error) setError({error: true, message: res.data.message})
            else{
                const accessToken = res?.data?.accessToken
                const role = res?.data?.role
                const id = res?.data?.user_id
                const cognome = res?.data?.cognome
                const email = credentials.email
                const nome = res?.data?.nome
                setAuth({email, id, nome, role, accessToken, cognome})
                setCredentials({
                    email: "",
                    password: ""
                })
                navigate(from, {replace : true})
            }
            setIsLoading(false)
        }
        catch (err){
            setError({error: true, message: err.response.data.message})
            setIsLoading(false)
        }
    }

    const togglePersist = () =>{
        setPersist(prev => !prev)
    }

    useEffect(() =>{
        localStorage.setItem("persist", persist)
    }, [persist])
    return (
        <>
        { isLoading && <Spinner/>}
        <div style={{height: "80vh"}} className="justify-content-center align-items-center mx-auto d-flex my-auto">
            <CForm onSubmit={handleSubmit}>
                <h1 style={{fontWeight: 900, fontSize: "64px"}} className="color-highlight mb-4">{appName}</h1>
                <div>
                    {error.error && <CCallout className="py-2" color="danger">
                        <h1 className="size-header m-0">Errore</h1>
                        <p className="size-text m-0">{error.message}</p>
                    </CCallout>}
                    <CFormInput
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        type="email"
                        id="email"
                        placeholder="mail@mail.it"
                        autoComplete="username"
                        className='size-text color-base weight-400 rounded-1 px-3 mb-3 border-light shadow-sm'
                    />
                    <CFormInput
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        className='size-text color-base weight-400 rounded-1 px-3 mb-3 border-light shadow-sm'
                    />
                    <CFormCheck onChange={togglePersist} nome="radioNoLabel" id="radioNoLabel" label="Ricordami" checked={persist}/>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                <CButton type="submit" shape="rounded-1 w-25 primary border-0 size-text d-flex justify-content-center shadow-sm weight-600">Login</CButton> 
                <div>
                <Link className="d-flex size-subHeader color-base">Hai dimenticato la password?</Link>
                {/* <Link className="d-flex size-subHeader color-base" to="/register">Ti devi registrare?</Link> */}
                </div>
                </div>
            </CForm>
        </div>
        </>
    )
}

export default Login