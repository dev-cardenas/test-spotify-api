import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

interface ISelect {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Select({ value, handleChange } : ISelect) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="track" control={<Radio />} label="Musica" />
        <FormControlLabel value="album" control={<Radio />} label="Album" />
        <FormControlLabel value="artist" control={<Radio />} label="Artista" />
        <FormControlLabel value="history" control={<Radio />} label="Historial" />
      </RadioGroup>
    </FormControl>
  );
}
