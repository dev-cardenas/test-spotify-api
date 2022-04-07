import axios from "axios"
import qs from 'qs';

export async function getToken() {
  const {
    REACT_APP_SPOTIFY_CLIENT_ID = "",
    REACT_APP_SPOTIFY_SECRET_KEY = ""
  } = process.env

  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: REACT_APP_SPOTIFY_CLIENT_ID,
      password: REACT_APP_SPOTIFY_SECRET_KEY,
    },
  };
  const data = {
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    );
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
}