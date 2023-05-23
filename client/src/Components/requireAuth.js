import { useLocation, Navigate, Outlet} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import ROLES_LIST from '../Classes/roles'

const RequiredAuth = ({allowedRoles}) =>{
    const { auth } = useAuth()
    const location = useLocation()
    return (
        allowedRoles.includes(ROLES_LIST[auth?.role])
            ? <Outlet />
            : auth?.accessToken
                ? <Navigate to="/unauthorized" state={{from: location}} replace /> 
                : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequiredAuth