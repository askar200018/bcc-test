import axios from 'axios';
import { useEffect, useState } from 'react';

interface Breed {
  [key: string]: string[];
}

const getBreeds = () => {
  return axios.get('https://dog.ceo/api/breeds/list/all');
};

const getImages = (breed: string) => {
  return axios.get(`https://dog.ceo/api/breed/${breed}/images/random/3`);
};

const App = () => {
  const [breeds, setBreeds] = useState<Breed>({});
  const [show, setShow] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const initialBreeds = async () => {
      const { data } = await getBreeds();
      setBreeds(data.message);
    };
    initialBreeds().catch((err) => console.error(err));
  }, []);

  const showImages = async (breed: string) => {
    const { data } = await getImages(breed);
    setImages(data.message);
  };

  return (
    <div className="App">
      {images.length > 0 &&
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Image of"
            height={160}
            width={160}
            style={{
              objectFit: 'cover',
              margin: 8,
            }}
          />
        ))}
      <ul>
        {Object.entries(breeds).map(([breed, subBreeds], index) => (
          <li key={index}>
            {breed} <button onClick={() => showImages(breed)}>Show</button>
            <ul>
              {subBreeds.map((sub, index) => (
                <li key={index}>{sub}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
