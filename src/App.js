import React , {useState , useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import PostPage from './PostPage';
import NewPost from './NewPost';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import {format} from 'date-fns'
import api from './api/Posts'


import {Routes , Route} from 'react-router-dom'




function App() {

  const [posts , setPosts] = useState([])
  const [search , setSearch]= useState("")
  const [searchResult , setSearchResult] = useState([])
  const [postTitle , setPostTitle]=useState("")
  const [postBody , setPostBody]=useState("")
  const [editTitle , setEditTitle]=useState("")
  const [editBody , setEditBody]=useState("")
  
  const history = useNavigate()


      // Axios fetching API useEffect

  useEffect(()=>{
    const fetchPosts = async ()=>{
      try{
        const response = await api.get('posts')
        setPosts(response.data)
        // console.log(response.data)

      }catch (err){
        if(err.respons){
          console.log(err.respons.data)
          console.log(err.respons.status)
          console.log(err.respons.headers)
        }else{
          console.log(`error ${err.massage}`)
        }
        
      }
    }


    fetchPosts()
  }, [])



  useEffect(()=>{
    const filterResult = posts.filter((post)=> 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )

    setSearchResult(filterResult.reverse())

  },[search , posts])


  const handleSubmit = async (e)=> {
    e.preventDefault()
    const id = posts.length ? (posts[posts.length -1].id +1).toString() : (1).toString() ;
    
    const datetime = format(new Date(), "MMMM dd , yyyy - pp");
    const newPost = { id , title: postTitle , datetime , body : postBody}

    try{
      const resopnse = await api.post('posts' , newPost)
      const allPosts =[...posts , resopnse.data]
    
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      
      history("/")
      

    }catch (err){
      console.log(`error ${err.massage}`)
      alert("check error (id)")
    }
  }

  const handleEdit = async (id)=> {
    const datetime = format(new Date() , "MMMM dd, yyyy - pp")
    const updatedPost = { id:"" , title: editTitle , datetime , body : editBody}
    try{
      const response = await api.put(`/posts/${id}` , updatedPost)
      setPosts (posts.map(post => post.id === id ? { ...response.data} : post))

      setEditTitle('')
      setEditBody('')
      history('/')

    }catch (err){
      console.log(`error: ${err.massage}`)
      alert("check error (id)")
    }

    
  }



  const handleDelete = async (id)=> {
    try{
      
      await api.delete((`posts/${id}`)) //he convert id to string 

      const postList = posts.filter((post)=> post.id !== id );
      setPosts(postList)
      history('/')
      alert("delete post successfully")
      
    }catch (err){
      console.log(`error ${err.massage}`)
     
    }
  }

  
  


  


  return (
    <div className="App">
      <Header title="react js Blog"/>

      <Nav 
        search={search}
        setSearch= {setSearch}
      />


      <Routes>

        <Route path='/' element={<Home posts={searchResult} />}/>  

        <Route path='/posts/:id' element={
          <PostPage 
            posts={posts } 
            handleDelete={handleDelete}
            />
        }/>

        
        <Route path='/newPost' element={
          <NewPost
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />
           
        } />

      
        
        <Route path="/edit/:id" element={
          <EditPost 
            posts = {posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}

          />
        } />
      
      


        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
        
        

      </Routes>

      
      
    </div>
  );
}

export default App;
