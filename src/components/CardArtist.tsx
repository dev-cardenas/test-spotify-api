import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { IArtist } from '../types/types'

interface ICardArtist {
  artist: IArtist
}

export function CardArtist({ artist }: ICardArtist) {

  return (
    <Card key={artist.id} sx={{ maxWidth: 345, marginTop: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={artist.name}
        subheader={artist.type}
      />
     {
        artist.images.length > 0 && 
        <CardMedia
          component="img"
          height="194"
          image={artist.images[0].url}
          alt={artist.name}
        />
      }
      <CardContent>
        {artist.genres.length > 0 &&
          <Typography variant="body2" color="text.secondary">
            {artist.genres.join(" - ")}
          </Typography>
        }
      </CardContent>
      <CardActions disableSpacing>
        {
          artist.popularity && 
          <IconButton aria-label="add to favorites">
            <StarIcon />
            <Typography 
              variant="caption"
              display="block"
              style={{ marginTop: 3, marginLeft: 2}}
            >
              {artist.popularity}
            </Typography>
          </IconButton>

        }
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
     
      </CardActions>
    </Card>
  );
}
