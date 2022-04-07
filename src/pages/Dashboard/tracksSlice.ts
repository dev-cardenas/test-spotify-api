import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../lib/redux/store';
import { api } from "../../services/api"
import { getToken } from "../../hook/useGetToken"

import {
  IArtist,
  ITracks,
  IAlbum,
  AxiosSearchResponse
} from '../../types/types'

export interface CounterState {
  loading: boolean;
  artists: IArtist[];
  tracks:ITracks[];
  albums: IAlbum[];
  valueSelect: string;
  wordSearch: string;
  errorInput: boolean;
  messageError: string;
}

const initialState: CounterState = {
  loading: false,
  artists: [],
  tracks: [],
  albums: [],
  valueSelect: 'track',
  wordSearch: '',
  errorInput: false,
  messageError: ''
};


export const searchAsync = createAsyncThunk(
  'counter/fetchSearch',
  async (words: string) => {
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

    return response.data
  }
);

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setValueSelect: (state, action: PayloadAction<string>) => {
      state.valueSelect = action.payload;
    },
    setWordSearch: (state, action: PayloadAction<string>) => {
      state.wordSearch = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      if(action.payload.length === 0){
        state.errorInput = false
        state.messageError = ''
      } else {
        state.errorInput = true
        state.messageError = action.payload
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload.artists.items;
        state.tracks = action.payload.tracks.items;
        state.albums = action.payload.albums.items;
      });
  },
});

export const { setValueSelect, setWordSearch, setErrorMessage } = tracksSlice.actions;

export const selectTracks = (state: RootState) => state.tracks;

export default tracksSlice.reducer;
