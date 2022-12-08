import { Container, List, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Breed from './components/Breed';
import ErrorModal from './components/ErrorModal';
import { IBreed, getBreeds } from './services/dogs';

const App = () => {
  const [open, setOpen] = useState(false);
  const [breeds, setBreeds] = useState<IBreed>({});

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const initialBreeds = async () => {
      const fetchedBreeds = await getBreeds();
      setBreeds(fetchedBreeds);
    };

    initialBreeds().catch(() => setOpen(true));
  }, []);

  return (
    <Container>
      <Typography marginBottom={2} variant="h2" textAlign="center" fontWeight={400}>
        Породы собак
      </Typography>

      <List disablePadding={true}>
        {Object.entries(breeds).map(([breed, subBreeds]) => (
          <Breed key={breed} breed={breed}>
            <List
              disablePadding={true}
              sx={{
                paddingLeft: 2,
              }}
            >
              {subBreeds.map((subBreed) => (
                <Breed key={subBreed} breed={breed} subBreed={subBreed} />
              ))}
            </List>
          </Breed>
        ))}
      </List>

      <ErrorModal open={open} onClose={handleClose} />
    </Container>
  );
};

export default App;
