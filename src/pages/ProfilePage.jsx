import {Container, Row} from "react-bootstrap"
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'    
import useLocalStorage from 'use-local-storage'
import ProfileSideBar from "../components/ProfileSideBar"
import ProfileMidBody from "../components/ProfileMidBody"


export default function ProfilePage () {
    const [authtoken, setAuthToken] = useLocalStorage('authtoken', '')  
    const navigate = useNavigate()

    useEffect(() => {
        if(!authtoken) {
            navigate('/login')
        }
    }, [authtoken, navigate])
    
    const handleLogout = () => {
        setAuthToken('')
    }

    return (
        <>
        <Container>
            <Row>
                <ProfileSideBar handleLogout={handleLogout} />
                <ProfileMidBody />
            </Row>
        </Container>
        </>
    )
}