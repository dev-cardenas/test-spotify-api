import { useEffect, useState, FocusEvent } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';

import SearchIcon from '@mui/icons-material/Search';

import { getHistory } from "../../helper/historyTrack"

import { SkeletonLoading } from "../../components/SkeletonLoading"
import { CardTrack } from "../../components/CardTrack"
import { CardArtist } from "../../components/CardArtist"
import { CardAlbum } from "../../components/CardAlbum"
import { Select } from "../../components/Select"

import {
  ITracks
} from '../../types/types'
import { useAppSelector, useAppDispatch } from '../../lib/redux/hookRedux';
import {
  setValueSelect,
  setWordSearch,
  searchAsync,
  selectTracks,
  setErrorMessage
} from './tracksSlice';


export const Dashboard = () => {
  const [ historyList, setHistoryList ] = useState<ITracks[]>([])

  const {
    loading,
    artists,
    tracks,
    albums,
    wordSearch,
    valueSelect,
    errorInput,
    messageError
  } = useAppSelector(selectTracks);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValueSelect((event.target as HTMLInputElement).value));
  };

  useEffect(() => {
    dispatch(searchAsync(wordSearch))
  }, [])

  async function search(){
    let schema = yup
    .string()
    .matches(/^[aA-zZ&\s]+$/, "Debes buscar solo por palabras, no incluyas caracteres especiales")

    try {
      if(wordSearch.length > 0){
        await schema.validate(wordSearch)
        
        dispatch(searchAsync(wordSearch))
        dispatch(setErrorMessage(''))
      }
   
    } catch(e: any) {
      dispatch(setErrorMessage(e.message))
    }
  }

  useEffect(() => {
    search()
  }, [wordSearch])


  useEffect(() => {
    if(valueSelect === 'history'){
      const lists = getHistory()
      setHistoryList(lists.reverse())
    }
  }, [valueSelect])

  function handleBlur(e: FocusEvent<HTMLInputElement>){
    dispatch(setWordSearch(e.target.value))
  }

  return (
    <div style={{ padding: 25, width: '100%'}}>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField
          error={errorInput}
          helperText={messageError}
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