import React from 'react';
import Button from '@mui/material/Button';
import "./imageUpload.css"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import {db, storage} from '../firebase.js'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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

function ImageUpload({username}) {
    const [open, setOpen] = useState(false);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const storageRef = ref(storage, 'images/'+ image.name);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
        (snapshot) =>{
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        },
        (error) => {
            console.log(error);
            alert(error.message);
        },
        () => {
            getDownloadURL(ref(storage, 'images/' + image.name))
            .then(async (url) => {
                await addDoc(collection(db, "posts"), {
                    timeStamp: serverTimestamp(),
                    caption: caption,
                    imageURL: url,
                    username: username
                });
                setProgress(0);
                setCaption("");
                setImage(null);
                setOpen(false);
            })
        })
    }

    return ( 
    <div className='imageUpload'>
        <Button onClick={() => setOpen(true)}>Post</Button>
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
            <progress value={progress} max="100"/>
          <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)}></input>  
          <input type="file" onChange={handleChange}/>
          <Button onClick={handleUpload}>
            Upload
          </Button>
          </form> 
        </Box>
      </Modal>
    </div> );
}

export default ImageUpload;