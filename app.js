class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentKick = '/.allSounds/kick-classic.wav';
        this.currentSnare = '/.allSounds/snare-acoustic01.wav';
        this.currentHihat = '/.allSounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
    }

    activePad() {
        this.classList.toggle("active");
    }

    repeat(){
        let step = this.index % 8;  // repeat pads from 0 to 1 
        const activeBars = document.querySelectorAll(`.b${step}`); //loops over every b
        this.index++;
        //Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //Check if pads are active
            if(bar.classList.contains('active')){
                //Check each sounds
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.play();
                    this.kickAudio.currentTime = 0;
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.play();
                    this.snareAudio.currentTime = 0;
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.play();
                    this.snareAudio.currentTime = 0;
                }
            }
        });

    }
    start(){
        console.log(this);
        const interval = (60/this.bpm) * 1000;
        //Check if it's playing
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
               this.repeat();  
            }, interval);
        } else{
            //Clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn(){
        if (this.isPlaying){
        this.playBtn.innerText = 'Stop';
        this.playBtn.classList.add('active');
    }else{
        this.playBtn.innerText = "Play";
        this.playBtn.classList.remove("active");
    }
}
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
            this.kickAudio.src = selectionValue;
            break;
            case "snare-select":
            this.snareAudio.src = selectionValue;
            break;
            case "hihat-select":
            this.hihatAudio.src = selectionValue;
            break; 
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else{
                switch(muteIndex){
                    case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
                }
        }
    }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener('click', function() {
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});
drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    });
});
