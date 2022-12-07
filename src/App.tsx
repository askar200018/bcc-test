import { useEffect, useState } from 'react';
import Breed from './components/Breed';
import { IBreed, getBreeds } from './services/dogs';

const App = () => {
  const [breeds, setBreeds] = useState<IBreed>({});
  
  useEffect(() => {
    const initialBreeds = async () => {
      const fetchedBreeds = await getBreeds();
      setBreeds(fetchedBreeds);
    };

    initialBreeds().catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {Object.entries(breeds).map(([breed, subBreeds]) => (
        <Breed key={breed} breed={breed}>
          <ul>
            {subBreeds.map((subBreed) => (
              <Breed key={subBreed} breed={breed} subBreed={subBreed} />
            ))}
          </ul>
        </Breed>
      ))}
    </ul>
  );
};

export default App;
