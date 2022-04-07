import { useEffect, useState, FocusEvent } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import SearchIcon from '@mui/icons-material/Search';

import { api } from "../services/api"
import { getToken } from "../hook/useGetToken"
import { getHistory } from "../helper/historyTrack"

import { SkeletonLoading } from "../components/SkeletonLoading"
import { CardTrack } from "../components/CardTrack"
import { CardArtist } from "../components/CardArtist"
import { CardAlbum } from "../components/CardAlbum"
import { Select } from "../components/Select"

import {
  IArtist,
  ITracks,
  IAlbum,
  AxiosSearchResponse
} from '../types/types'


export const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [ artists, setArtists ] = useState<IArtist[]>([])
  const [ tracks, setTracks ] = useState<ITracks[]>([])
  const [ historyList, setHistoryList ] = useState<ITracks[]>([])
  const [ albums, setAlbums ] = useState<IAlbum[]>([])
  const [valueSelect, setValueSelect] = useState('track');
  const [wordSearch, setWordSearch] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSelect((event.target as HTMLInputElement).value);
  };

  async function search(words?: string){
    setLoading(true)
    const token = await getToken()
    const response: AxiosSearchResponse = await api.get(
      `/search?query=${words || "bob" }&type=track,artist,album&market=es&limit=50&offset=0&include_external=audio`, 
      {
        headers: {
          Authorization : `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    setArtists(response.data.artists.items)
    setTracks(response.data.tracks.items)
    setAlbums(response.data.albums.items)
    setLoading(false)
  }

  useEffect(() => {
    search()
  }, [])

  useEffect(() => {
    search(wordSearch)
  }, [wordSearch])


  useEffect(() => {
    if(valueSelect === 'history'){
      const lists = getHistory()
      setHistoryList(lists)
    }
  }, [valueSelect])

  function handleBlur(e: FocusEvent<HTMLInputElement>){
    console.log(e.target.value)
    setWordSearch(e.target.value)
  }

  return (
    <div style={{ padding: 25, width: '100%'}}>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField
          id="standard-basic"
          label="Buscar artista, música, album "
          variant="standard"
          style={{ width: 345, marginBottom: 2}}
          onBlur={handleBlur}
        />
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Box>

      <div>
        <Select
          value={valueSelect}
          handleChange={handleChange}
        />
      </div>


      <Grid container spacing={2}>
        <Grid item xs={4}>
          {
            loading ? 
            <SkeletonLoading />
            : (
              <div style={{ height: '100vh', overflow: 'auto' }}>
                {
                  valueSelect === 'track' ?
                    tracks.length === 0 
                      ? "Ops, no hemos encontrado pero puedes buscar otras opciones"
                      : tracks.map(track => (
                        <CardTrack key={track.id} track={track} />
                      ))
                  : valueSelect === 'artist'
                  ? 
                    artists.length === 0 
                      ? "Ops, no hemos encontrado pero puedes buscar otras opciones"
                      : artists.map(artist => (
                        <CardArtist key={artist.id} artist={artist} />
                      ))
                  : valueSelect === 'album'
                  ? 
                    albums.length === 0 
                      ? "Ops, no hemos encontrado pero puedes buscar otras opciones"
                      : albums.map(album => (<CardAlbum key={album.id} album={album} />))
                  : valueSelect === 'history' && 
                    historyList.length === 0 
                    ? "Ops, aun no hemos encontrado un historial vuelve a músicas para escuchar alguno"
                    : historyList.map(track => (
                      <CardTrack key={track.id} track={track} />
                    ))
                }
                
              </div>
            )
          }
          
        </Grid>
      </Grid>

    </div>
  );
};