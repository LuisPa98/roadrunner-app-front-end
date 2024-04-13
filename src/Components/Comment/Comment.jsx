import {useState, useEffect} from 'react'
// import { listComment} from '../../Services/comment.js'
// import { getUser } from '../../Services/profile.js'

function Comment({run, comments}) {
    const {id} = run;
    // const [comments, setComments] = useState([]);
    let profilePic = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
  
  

    // useEffect(() => {
    //     const fetchUserDetails = async () => {
    //         const updatedComments = await Promise.all(comments.map(async (comment) => {
    //             const profile = await getUser(comment.profile);
    //             console.log(profile)
    //             // Ensure your getUser function returns both username and picture
    //             return { ...comment, username: profile.username, picture: profile.picture };
    //         }));
    //         setComments(updatedComments);
    //     };

    //     if (comments.length) {
    //         fetchUserDetails();
    //     }
    // }, []); // Trigger this useEffect when comments change "comments"


    // useEffect(() => {
    //     fetchComments();
    // }, [id]);
    
    // const fetchComments = async () => {
    //     const response = await listComment(id);
    //     setComments(response);
    // };

    return (
        <div className='commentContainer'>
            {comments.map((comment) => (
                <div key={comment.id} className='commentProfileAndDetails'>
                    <div>
                    <img src={profilePic} alt={comment.username} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                        <h2>{comment?.username}</h2>
                    </div>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default Comment;
