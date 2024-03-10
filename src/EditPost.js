import React , {Fragment, useEffect} from 'react'
import { Link, useParams  } from 'react-router-dom'
import Footer from './Footer';


const EditPost = ({
    posts , handleEdit , editTitle , setEditTitle , editBody , setEditBody
}) => {

    const {id}= useParams();
    const post = posts.find((post) => (post.id).toString() === id)

    useEffect(()=>{
        if (post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post , setEditTitle , setEditBody])


  return (
    <Fragment>
        <main className="NewPost">
            
        { editTitle &&
            <Fragment>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
                    <label>title</label>
                    <input 
                        id="postTitle"
                        type='text'
                        placeholder='enter post title'
                        required
                        value={editTitle}
                        onChange={(e)=>setEditTitle(e.target.value)}
                    /> 
                    <label>post</label>
                    <textarea
                        id="postBody" 
                        type='text'
                        placeholder='Enter post body'
                        required
                        value={editBody}
                        onChange={(e)=>setEditBody(e.target.value)}
                    />

                    <button type="submit" onClick={()=>handleEdit(post.id)}>submit Edit</button>
                    
                </form>

        </Fragment>
        }
        { !editTitle &&
            <Fragment>
                <h2> post Not Founded Yet</h2>
                <p>well, that's disappointing!</p>
                <p>
                    <Link to="/">Visit Our HomePage</Link>
                </p>
            </Fragment>

        }
        
        </main>
        <Footer />
    </Fragment>
  )
}

export default EditPost
