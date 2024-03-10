import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'

const Home = ({posts}) => {
  return (
    
    <Fragment>
      
    {!posts ? 
      (
        <Fragment>
          <h1>no posts to view yet...</h1>
        </Fragment>
      )
      :
      (
        <main className="Home">
        
          {posts.map((post)=> 
              
            <article className="post" key={post.id}>

          
              <div>
                <Link to={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                  <p className="postDate">{post.datetime}</p>
                </Link>
      
                <p className="postBody">
                  {(post.body).length <= 25 ? post.body : `${(post.body).slice(0,100)}...` }
                </p>
              </div>

            </article>

          )}

        
        </main>

      )
      
      
    }
    
    <Footer />
    </Fragment>
  )
}

export default Home
