import { CButton, CForm, CFormInput, CRow, CCol, CCallout } from "@coreui/react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../Components/spinner"
import axios from "../api/axios"
import appName from "../config/app_name"
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/
const EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const PHONE_VALIDATION = /^[0-9]{8,10}$/
const Register = () => {
    const [validated, setValidated] = useState(false)
    const [userData, setUserData] = useState({email: "", password: "", nome: "", cognome: "", tel: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({error: false, message: ""})
    const [matchPassword, setMatchPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validMatch, setValidMatch] = useState(false)

    const emailRef = useRef()

    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const navigate = useNavigate()

    useEffect(() =>{
        emailRef.current.focus()
    }, [])

    useEffect(() =>{
        const result = EMAIL_VALIDATION.test(userData.email)
        setValidEmail(result)
    }, [userData.email])


    useEffect(() =>{
        const result = PASSWORD_VALIDATION.test(userData.password)
        setValidPassword(result)
        const match = userData.password === matchPassword
        setValidMatch(match)
    }, [userData.password, matchPassword])

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        event.preventDefault()
        if (form.checkValidity() === false) {
        }
        setValidated(true)
        setIsLoading(true)
        try {
            await axios.post("/register",
            JSON.stringify(userData),
            {
                headers: { 'Content-Type': 'application/json' }
            }
            );
            setIsLoading(false)
            navigate('/login')
            setUserData({})
            setMatchPassword('');
        } catch (err) {
            setIsLoading(false)
            setError({error: true, message: err.message})
            console.log(err)
        }
      }
    
    return (
        <>
        { isLoading && <Spinner/>}
        <div style={{height: "80vh"}} className="justify-content-center align-items-center mx-auto d-flex my-auto">
            <CForm
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                >
                <h1 style={{fontWeight: 900, fontSize: "64px"}} className="color-highlight mb-4">{appName}</h1>
                <div>
                    {error.error && <CCallout className="py-2" color="danger">
                        <h1 className="size-header m-0">Errore</h1>
                        <p className="size-text m-0">{error.message}</p>
                    </CCallout>}
                    <CRow>
                        <CCol className="g-2" xs>
                            <CFormInput
                                value={userData.nome}
                                onChange={(e) => setUserData({...userData, nome: e.target.value})}
                                type="text"
                                id="nome"
                                placeholder="Nome"
                                className='size-text color-base weight-400 rounded-1 px-3 border-light shadow-sm'
                                autoComplete="no"
                                required
                                />
                        </CCol>
                        <CCol className="g-2" xs>
                            <CFormInput
                                value={userData.cognome}
                                onChange={(e) => setUserData({...userData, cognome: e.target.value})}
                                type="text"
                                id="cognome"
                                placeholder="Cognome"
                                className='size-text color-base weight-400 rounded-1 px-3 border-light shadow-sm'
                                autoComplete="no"
                                required
                            />
                        </CCol>
                    </CRow>
                    <CRow className="my-1">
                        <CFormInput
                            value={userData.email}
                            ref={emailRef}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            type="email"
                            id="email"
                            placeholder="mail@mail.it"
                            className='size-text color-base weight-400 rounded-1 px-3 border-light shadow-sm'
                            valid={validEmail}
                            invalid={!validEmail && !emailFocus && userData.email !== ""}
                            autoComplete="no"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            required
                        />
                    </CRow>
                    <CRow>
                        <CFormInput
                            value={userData.password}
                            onChange={(e) => setUserData({...userData, password: e.target.value})}
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            placeholder="Password"
                            className='size-text color-base weight-400 rounded-1 px-3 border-light shadow-sm'
                            valid={validPassword}
                            invalid={!validPassword && !passwordFocus && userData.password !== ""}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            required
                            />
                    </CRow>
                    <CRow className="my-1">
                        <CFormInput
                            value={matchPassword}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            type="password"
                            id="confirmPasword"
                            autoComplete="no"
                            placeholder="Conferma password"
                            className='size-text color-base weight-400 rounded-1 px-3 border-light shadow-sm'
                            valid={validMatch && matchPassword !== ""}
                            invalid={!validMatch && !matchFocus}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            required
                        />
                    </CRow>
                    <CRow>
                        <CFormInput
                            value={userData.tel}
                            onChange={(e) => setUserData({...userData, tel: e.target.value})}
                            type="tel"
                            id="tel"
                            placeholder="Cellulare"
                            className='size-text color-base weight-400 rounded-1 px-3 border-light shadow-sm'
                            valid={PHONE_VALIDATION.test(userData.tel)}
                            required
                        />
                    </CRow>
                </div>
                <div className="d-flex justify-content-between align-items-center my-1">
                    <CButton type="submit" shape="rounded-1 w-25 primary border-0 size-text d-flex justify-content-center shadow-sm weight-600">Registrati</CButton> 
                    <CButton type="button" component={Link} to="/login" shape="rounded-1 w-50 contrast border-0 size-text color-base d-flex justify-content-center shadow-sm weight-600">Torna indietro</CButton> 
                </div>
            </CForm>
        </div>
        </>
    )
}

export default Register