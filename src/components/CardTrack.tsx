import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import { Player } from "./Player"


import MoreVertIcon from '@mui/icons-material/MoreVert';

import { ITracks } from '../types/types'

interface ICardTrack {
  track: ITracks
}

export function CardTrack({ track }: ICardTrack) {

  return (
    <Card
      key={track.id}
      sx={{ maxWidth: 345, marginTop: 2 }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={track.name}
        subheader={track.type}
      />
      <CardContent>
        {track.album &&
          <Typography variant="body2" color="text.secondary">
            Nombre Album: {track.album.name}
            <br />
            Tipo Album: {track.album.type}
          </Typography>
        }
      </CardContent>
      <CardActions disableSpacing>
      {
          track.popularity && track.popularity !== 0 &&
          <IconButton aria-label="add to favorites">
            <StarIcon />
            <Typography 
              variant="caption"
              display="block"
              style={{ marginTop: 3, marginLeft: 2}}
            >
              {track.popularity}
            </Typography>
          </IconButton>

        }
        <br />

        {
          track.preview_url &&
          <Player
            audio={{
              name: track.name,
              src: track.preview_url,
            }}
            track={track}
          />
        }
        
      </CardActions>
    </Card>
  );
}
