// export {}
import {AudioPlayer} from './AudioPlayer'
const playersEl: HTMLElement = document.getElementById('player');
const players = [];

players.push(new AudioPlayer(playersEl));