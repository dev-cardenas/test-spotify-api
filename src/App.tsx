import React from "react";
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import { Dashboard } from "./pages/Dashboard"
import { ListNicknames } from "./components/ListNicknames"

function App() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return(
    <Container style={{ backgroundColor: '#fff'}}>
      <Dashboard />
      <div>
        <h5 style={{ display: 'inline-block'}}>ASC</h5>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        <h5 style={{ display: 'inline-block'}}>DESC</h5>
      </div>
      <ListNicknames
        names={["Triviño TI", "Homer Dev", " ", " Ragnar Front", "Loki UX"]}
        order={ checked ? "DESC" : "ASC" }
      />
    </Container>
  )
}

export default App;
