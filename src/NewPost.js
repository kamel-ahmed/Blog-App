import React, { Fragment } from 'react'
import Footer from './Footer'

const NewPost = ({postTitle , setPostTitle , postBody , setPostBody , handleSubmit}) => {
  return (
    <Fragment>
      <main className="NewPost">
        <h2>New Post</h2>
        <form className="newPostForm" onSubmit={handleSubmit}>
          <label>title</label>
          <input 
          id="postTitle"
            type='text'
            placeholder='enter post title'
            required
            value={postTitle}
            onChange={(e)=>setPostTitle(e.target.value)}
          /> 
          <label>post</label>
          <textarea
            id="postBody" 
            type='text'
            placeholder='Enter post body'
            required
            value={postBody}
            onChange={(e)=>setPostBody(e.target.value)}
          />

          <button type="submit">submit</button>
          
        </form>
      </main>

      <Footer/>

    </Fragment>
  )
}

export default NewPost
