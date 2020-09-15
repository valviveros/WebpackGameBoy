export class AudioPlayer {
    domElement: HTMLElement;
    src: string;
    audio: HTMLAudioElement;
    playButton: HTMLElement;
    muteButton: HTMLElement;
    nextButton: HTMLElement;
    previousButton: HTMLElement;
    fastForwardButton: HTMLElement;
    delayButton: HTMLElement;
    cover: HTMLImageElement;
    progress: HTMLElement;
    songTitle: HTMLElement;
    songArtist: HTMLElement;
    currentTime: HTMLElement;
    durationTime: HTMLElement;
    songIndex: number;
    songs: string[];
    covers: string[];
    titles: string[];
    artists: string[];
    timeCount: number;
    barProgress: number;
    constructor(domElement: HTMLElement) {
        this.domElement = domElement;
        this.src = `${this.domElement.dataset.src}`;
        this.audio = new Audio(this.src);
        this.playButton = this.domElement.querySelector(".controls .playBtn");
        this.muteButton = this.domElement.querySelector(".controls .muteBtn");
        this.nextButton = this.domElement.querySelector(".controls .nextBtn");
        this.previousButton = this.domElement.querySelector(".controls .previousBtn");
        this.fastForwardButton = this.domElement.querySelector(".controls .fastForwardBtn");
        this.delayButton = this.domElement.querySelector(".controls .delayBtn");
        this.cover = this.domElement.querySelector("#coverSong");
        this.progress = this.domElement.querySelector(".cover .progress");
        this.songTitle = this.domElement.querySelector(".cover .songTitle");
        this.songArtist = this.domElement.querySelector(".cover .songArtist");
        this.currentTime = this.domElement.querySelector(".cover .currentTime");
        this.durationTime = this.domElement.querySelector(".cover .durationTime");
        this.songIndex = 0;
        this.songs = ['./assets/audio/how-you-like-that.mp3', './assets/audio/everything-i-wanted.mp3', './assets/audio/ice-cream.mp3'];
        this.covers = ['./assets/covers/how_you_like_that.jpg', './assets/covers/everything_i_wanted.jpg', './assets/covers/ice_cream.jpg'];
        this.titles = ['How You Like That', 'everything i wanted', 'Ice Cream'];
        this.artists = ['BLACKPINK', 'Billie Eilish', 'BLACKPINK, Selena Gomez'];
        this.timeCount = 0;
        this.barProgress = 0;
        this.initControls();
        this.initRun();
        // this.initProgressActions();

        this.audio.ontimeupdate = () => { this.updateUI(), this.initBarValues(), this.songFinished(); }
    }

    songFinished() {
        this.audio.addEventListener('ended', (event) => {
            // this.nextButton.click();
            console.log("Acabé");
        });
    }

    initControls() {
        if (this.playButton) {
            this.initPlay(this.playButton);
        }
        if (this.muteButton) {
            this.initMute(this.muteButton);
        }
        if (this.nextButton) {
            this.initNext(this.nextButton);
        }
        if (this.previousButton) {
            this.initPrevious(this.previousButton);
        }
        if (this.fastForwardButton) {
            this.initFastForward(this.fastForwardButton);
        }
        if (this.delayButton) {
            this.initDelay(this.delayButton);
        }
    }

    initFastForward(domElement: HTMLElement) {
        domElement.onclick = () => {
            // console.log("fastForward");
            this.timeCount = this.barProgress;
            this.timeCount += 3;
            const x = this.timeCount;
            const totalX = 177;
            const progress = (x / totalX) * 2;
            this.setCurrentTime(progress);
        }
    }

    initDelay(domElement: HTMLElement) {
        domElement.onclick = () => {
            // console.log("delay");
            this.timeCount = this.barProgress;
            this.timeCount -= 3;
            const x = this.timeCount;
            const totalX = 177;
            const progress = (x / totalX) * 1.5;
            this.setCurrentTime(progress);
        }
    }

    initPrevious(domElement: HTMLElement) {
        domElement.onclick = () => {
            // console.log("previous");
            if (!this.audio.paused) {
                this.pause();
                this.songIndex -= 1;
                if (this.songIndex < 0) {
                    this.songIndex = this.songs.length - 1;
                }
                this.songTitle.innerHTML = this.titles[this.songIndex];
                this.songArtist.innerHTML = this.artists[this.songIndex];
                this.src = this.songs[this.songIndex];
                this.cover.src = this.covers[this.songIndex];
                this.audio = new Audio(this.src);
                this.play();
                this.timeCount = 0;
                this.audio.ontimeupdate = () => { this.updateUI(), this.initBarValues(); }
            } else {
                console.log("Do nothing");
            }
        }
    }

    public initNext(domElement: HTMLElement) {
        domElement.onclick = () => {
            // console.log("next");
            if (!this.audio.paused) {
                this.pause();
                this.songIndex += 1;
                if (this.songIndex > this.songs.length - 1) {
                    this.songIndex = 0;
                }
                this.songTitle.innerHTML = this.titles[this.songIndex];
                this.songArtist.innerHTML = this.artists[this.songIndex];
                this.src = this.songs[this.songIndex];
                this.cover.src = this.covers[this.songIndex];
                this.audio = new Audio(this.src);
                this.play();
                this.timeCount = 0;
                this.audio.ontimeupdate = () => { this.updateUI(), this.initBarValues(); }
            } 
        }
    }

    initMute(domElement: HTMLElement) {
        domElement.onclick = () => {
            if (!this.audio.muted) {
                this.audio.muted = true;
            } else {
                this.audio.muted = false;
            }
        }
    }

    initPlay(domElement: HTMLElement) {
        domElement.onclick = () => {
            if (!this.audio.paused) {
                this.pause();
            } else {
                this.play();
            }
        }
    }

    // initProgressActions() {
    //     const cover = this.domElement.querySelector(".cover");
    //     cover.onclick = (e) => {
    //         const x = e.offsetX;
    //         const totalX = cover.clientWidth;
    //         const progress = x / totalX;
    //         this.setCurrentTime(progress);
    //     };
    // }

    initBarValues() {
        this.currentTime.innerHTML = (this.formatTime(Math.floor(this.audio.currentTime)));
        this.audio.addEventListener('durationchange', (event) => {
            if (this.durationTime.innerHTML === "NaN:NaN") {
                this.durationTime.innerHTML = "0:00";
            } else {
                this.durationTime.innerHTML = (this.formatTime(Math.floor(this.audio.duration)));
            }
        });
    }

    formatTime(seconds: number) {
        let min = Math.floor((seconds / 60));
        let sec = Math.floor(seconds - (min * 60));
        let valSec = '';
        if (sec < 10) {
            valSec = `0${sec.toString()}`;
        } else {
            valSec = sec.toString();
        }
        return `${min}:${valSec}`;
    }

    initRun() {
        setInterval(this.formatTime, 500);
    }

    setCurrentTime(progress: number) {
        this.audio.currentTime = this.audio.duration * progress;
    }

    updateUI() {
        console.log("Updating UI");
        const total = this.audio.duration;
        const current = this.audio.currentTime;
        this.barProgress = (current / total) * 100;
        this.progress.style.width = `${this.barProgress}%`;
    }

    play() {
        this.audio.play().then().catch(err => console.log(`Error al reproducir el archivo: ${err}`));
    }

    pause() {
        this.audio.pause();
    }
}
