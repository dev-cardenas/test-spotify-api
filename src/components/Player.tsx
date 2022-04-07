// import ReactJkMusicPlayer, { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player'
// import 'react-jinke-music-player/assets/index.css'

import { saveHistory, getHistory } from "../helper/historyTrack"
import { ITracks } from '../types/types'

interface IPlayer {
  audio: {
    src: string;
    name: string;
  }
  track: ITracks
}

export function Player({ audio, track }: IPlayer) {

  function onPlay(track: ITracks) {
    const lists = getHistory()
    const found = lists.find((element: ITracks) => element.id === track.id);
    if(!found){
      lists.push(track)
      saveHistory(lists)
    }
  }

  return (
    <audio controls onPlay={() => onPlay(track)}>
      <source src={audio.src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
}