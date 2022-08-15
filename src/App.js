import React, { useEffect } from 'react';
import Post from './components/Post';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input'
import './App.css';
import { useState } from 'react';
import {db, auth} from './firebase.js'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid lightgray',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (authUser) =>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
        if(authUser.displayName){
          // dont update usernmame
        }else{
          // if we just created someone..
          return updateProfile(authUser, {
            displayName: username,
          })
        }
      }else{
        setUser(null);
      }
    })
    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);
  
  useEffect(() => {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => ({
        id:doc.id,
        post:doc.data()
      })));
  });
  },[]); 

  const signUp = (event) =>{
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => alert(error.message))
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <form className='app__signup'>
          <img className="app__signupImage"
            src = "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
            alt=""/>
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form> 
          
        </Box>
      </Modal>
      <div className="app__header">
      
        <img className="app__headerImage"
        src = "https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
        alt=""/>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
      </div>
      <h1>Hello we build</h1>
      { 
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageURL={post.imageURL}></Post>
        ))
      }
    </div>
  );
}

export default App;
