import React, { useEffect, useState } from 'react'

const Music = () => {
    const [isPlaying,setIsPlaying] = useState(false);
    const [songs,setSongs] = useState(['hey','summer','ukulele']);
    const [songIndex,setSongIndex] = useState(1);
    const [audioEle,setAudio] = useState(document.getElementById('audio'))

    useEffect(()=>{
        loadSong(songs[songIndex]);
    },[])

    const loadSong=(song)=>{
        document.getElementById('title').innerHTML = song;
        document.getElementById('audio').src = `music/${song}.mp3`
        document.getElementById('cover').src = `images/${song}.jpg`
    }


    
    const pauseSong=()=>{
        setIsPlaying(false)
        document.getElementById('audio').pause()
        
    }

    const playSong=(e)=>{
        setIsPlaying(true)
        document.getElementById('audio').play()
    }

    const handleSong=(e)=>{
        // console.log("Suhas Kamble")
        if(isPlaying){
            pauseSong()
        }else{
            // console.log("Suhas")
            playSong()
        }
    }

    const prevSong=()=>{
        if(songIndex < 0){
            setSongIndex(2)
        }else{
            
            setSongIndex(songIndex-1);
            loadSong(songs[songIndex])
            playSong()
        }
    }

    const nextSong=()=>{
        if(songIndex > songs.length-1){
            setSongIndex(0)
        }else{
            
            setSongIndex(songIndex+1);
            loadSong(songs[songIndex])
            playSong()
        }
    }

    function updateProgress(e){
      const  {currentTime,duration} = e.target;
    const progressPercentage = (currentTime/duration) * 100;
    document.querySelector('.progress').style.width =`${progressPercentage}%`
    }

   
    function setProgress(e){
        const width = e.target.clientWidth;
        const clientX = e.clientX;
        const duration = document.getElementById('audio').duration;
        document.getElementById('audio').currentTime = (clientX/width) * duration;
    }
    
    return (
       <div className={`music-container ${isPlaying?"play":null}`}>
           <div className="music-info">
               <h4 id="title">Ukulele</h4>
               <div className="progress-container" onClick={setProgress}>
                   <div className="progress"></div>
               </div>
           </div>
           <audio src="./music/ukulele.mp3" id="audio" onTimeUpdate={updateProgress} onEnded={nextSong}></audio>
           <div className="img-container">
               <img src="./images/ukulele.jpg" alt="Music Cover" id="cover"/>
           </div>
           <div className="navigation" >
               <button className="action-btn" id="prev" onClick={prevSong}>
                   <i  className="fas fa-backward"></i>
               </button>
               <button className="action-btn action-btn-big" id="prev" onClick={handleSong}>
                   <i className={`fas ${isPlaying?"fa-pause":"fa-play"}`}></i>
               </button>
               <button className="action-btn" id="next" onClick={nextSong}>
                   <i className="fas fa-forward"></i>
               </button>
           </div>
       </div>
    )
}

export default Music
