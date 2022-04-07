import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { IAlbum } from '../types/types'

interface ICardAlbum {
  album: IAlbum
}

export function CardAlbum({ album }: ICardAlbum) {

  return (
    <Card key={album.id} sx={{ maxWidth: 345, marginTop: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={album.name}
        subheader={album.type}
      />
     {
        album.images.length > 0 && 
        <CardMedia
          component="img"
          height="194"
          image={album.images[0].url}
          alt={album.name}
        />
      }
    </Card>
  );
}
