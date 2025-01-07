import {Button, Col, Image, Row} from 'react-bootstrap'
import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { likePost, removeLikeFromPost, deletePost } from '../features/postsSlice'
import { AuthContext } from './AuthProvider'
import UpdatePostModal from './UpdatePostModal'

export default function ProfilePostCard({ post }) {
    const {content, id: postId, imageUrl} = post
    const [likes, setLikes] = useState(post.likes || [])
    const dispatch = useDispatch()
    const {currentUser} = useContext(AuthContext)
    const userId = currentUser.uid
    const isLiked = likes.includes(userId)
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg"

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const handleShowUpdateModal = () => setShowUpdateModal(true)
    const handleCloseUpdateModal = () => setShowUpdateModal(false)


    // useEffect(() => {
    //     fetch(`https://91b8f362-6769-4c24-9f3a-a3f50858e94b-00-1xltvnylqob4.pike.replit.dev/likes/post/${postId}`)
    //     .then((response) => response.json())
    //     .then((data) => setLikes(data.length))
    //     .catch((error) => console.error("Error: ", error))
    // }, [postId])

    const handleLike = () => (isLiked? removeFromLikes() : addToLikes())

    const addToLikes = () => {
        setLikes([...likes, userId])
        dispatch(likePost({userId, postId}))
    }

    const removeFromLikes = () => {
        setLikes(likes.filter((id) => id !== userId))
        dispatch(removeLikeFromPost({userId, postId}))
    }

    const handleDelete = () => {
        dispatch(deletePost({userId, postId}))
    }



    return (
        <Row className='p-3'
        style={{borderTop: '1px solid #D3D3D3', borderBottom: '1px solid #D3D3D3'}}>
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle/>
            </Col>

            <Col>
                <strong>Shawn</strong>
                <span>@Shawn.Sheep ~ Dec 30</span>
                <p>{content}</p>
                <Image src={imageUrl} style={{width: 150}} />
                <div className='justify-content-between'>
                    <Button variant='light'>
                        <i className='bi bi-chat'></i>
                    </Button>

                    <Button variant='light'>
                        <i className='bi bi-repeat'></i>
                    </Button>

                    <Button variant='light' onClick={handleLike}>
                        {isLiked ? (
                            <i className='bi bi-heart-fill text-danger'></i>
                        ) : (
                            <i className='bi bi-heart'></i>
                        )}
                        {likes.length}
                    </Button>

                    <Button variant='light'>
                        <i className='bi bi-upload'></i>
                    </Button>

                    <Button variant='light'> 
                        <i className='bi bi-pencil' onClick={handleShowUpdateModal}></i>
                    </Button>

                    <Button variant='light'>
                        <i className='bi bi-trash' onClick={handleDelete}></i>
                    </Button>

                    <UpdatePostModal show={showUpdateModal} handleClose={handleCloseUpdateModal} postId={postId} originalPostContent={content} />
                </div>
            </Col>
        </Row>

    )
}