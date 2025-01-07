import {Button, Col, Image, Nav, Row, Spinner} from 'react-bootstrap'
import ProfilePostCard from './ProfilePostCard'
// import { jwtDecode } from 'jwt-decode'
import { useEffect, useContext } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchPostsByUser } from '../features/postsSlice'
import {AuthContext} from './AuthProvider'
import coverImage from '../assets/cover-image.jpg'
// import { current } from '@reduxjs/toolkit'

export default function ProfileMidBody() {
    
    const url = coverImage
    const pic = 'https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg'

    const dispatch = useDispatch()

    const posts = useSelector((state) => state.posts.posts)
    const loading = useSelector((state) => state.posts.loading)
    const {currentUser} = useContext(AuthContext)

    // const fetchPosts = (userId) => {
    //     fetch (`https://91b8f362-6769-4c24-9f3a-a3f50858e94b-00-1xltvnylqob4.pike.replit.dev/posts/user/${userId}`)
    //     .then((response) => response.json())
    //     .then((data) => setPosts(data))
    //     .catch((error) => console.error("Error: ", error))
    // }
    

    useEffect(() => {
        dispatch(fetchPostsByUser(currentUser.uid))
    },[dispatch, currentUser])
    
    
    return (
        <Col sm={6} className='bg-light' stlye={{border: '1px solid lightgrey'}}>
            <Image src={url} fluid />
            <br />
            <Image 
                src={pic}
                roundedCircle
                style={{width: 150, position: 'absolute', top: '140px', border: '4px solid #F8F9FA', marginLeft: 15,}} />

            <Row className='justify-content-end'>
                <Col xs='auto'>
                    <Button className='rounded-pill mt-2' variant='outline-secondary'>
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p className='mt-5' style={{margin: 0, fontWeight: "bold", fontSize:"15px"}}>Shawn</p>
            <p style={{marginBottom: '2px'}}>Shawn@shawn</p>
            <p>I do coding</p>
            <p>Elon Musk Rich</p>

            <p>
                <strong>1</strong> Following <strong>1000</strong> Followers
            </p>

            <Nav variant='underline' defaultActiveKey='/home' justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="/link-1">Replies</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="/link-2">Highlights</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="/link-3">Media</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="/link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {loading && (<Spinner animation='border' className='ms-3 mt-3' variant='primary'/>)}
            
            {posts.length > 0 && posts.map((post) => (
                <ProfilePostCard key={post.id} post={post}/>
            ))}
        </Col>

    )
}
