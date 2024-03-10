import React, { Fragment } from 'react'
import { Link, useParams} from 'react-router-dom'
import Footer from './Footer';

const PostPage = ({posts , handleDelete }) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id)

  return (
    <Fragment>
        <main className="PostPage">
            <article className="Post">
                { post ?
                    (
                        <Fragment>
                            <h2>{post.title}</h2>
                            <p className="PostDate">{post.datetime}</p>
                            <p className="PostBody">{post.body}</p>

                            <Link to={`/edit/${post.id}`} style={{marginRight:"10px"}}>
                                <button style={{backgroundColor:"green"}}> Edit Post  </button>
                            </Link>
                        

                            <button onClick={()=>handleDelete(post.id)}>
                                Delete Post
                            </button>
                            
                            
                        </Fragment>
                    )
                    :
                    (
                        <Fragment>
                            <h2> post not found</h2>
                            <a href='/' >visit our home page</a>
                        </Fragment>
                    )
                }
                
            </article>
            
        </main>
        <Footer/>

    </Fragment>
  )
}

export default PostPage
