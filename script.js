
let counter = 0;


function play(name,title,lyrics){

    
    
    const audio = new Audio(
        `${name}`
        );
    console.log(audio)
    
    if(counter==1){
        
        location.reload();

        sessionStorage.setItem("name", name);
        sessionStorage.setItem("title", title);
        sessionStorage.setItem("lyrics", lyrics);
    }else{
        counter = 1;
    }


    fetch(lyrics)
    .then(response => response.text())
    .then(data => {
        // Do something with your data
        document.querySelector(".lyrics-container").innerHTML = data;
    });


    const audioPlayer = document.querySelector(".player");



    audio.addEventListener(
        "loadeddata",
        () => {
            audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                audio.duration
            );
            audio.volume = .75;
        },
        false
        );

        document.querySelector('.player-title').innerHTML = `<marquee>${title}</marquee>`;
        setInterval(() => {
        audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
          audio.currentTime
        );
            if(audio.paused){

            }else{
                document.querySelector('.lyrics-container').scrollBy(0, 5);
            }
        }, 500);

        const playBtn = audioPlayer.querySelector(".player-button");
        playBtn.addEventListener(
        "click",
        () => {
            if (audio.paused) {
                playBtn.textContent = "❚❚";
                audio.play();
            } else {
                playBtn.textContent = "▶";   
                audio.pause();

            
            }
        },
        false
        );
}
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
}


try {
    if(sessionStorage.getItem("name")==""){

    }else{
        play(sessionStorage.getItem("name"),sessionStorage.getItem("title"),sessionStorage.getItem("lyrics"));
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("title");
        sessionStorage.removeItem("lyrics");
    }
} catch (error) {
    
}