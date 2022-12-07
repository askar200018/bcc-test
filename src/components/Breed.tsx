import { PropsWithChildren } from 'react';
import { useLoadImages } from '../hooks/useLoadImages';
import Gallery from './Gallery';

interface Props {
  breed: string;
  subBreed?: string;
}

const BUTTON_STATE = {
  LOADING: 'Загружается',
  SHOW: 'Показать',
  UPDATE: 'Обновить',
};

const Breed: React.FC<PropsWithChildren<Props>> = ({ breed, subBreed, children }) => {
  const { images, error, isLoading, handleShowImages } = useLoadImages(breed, subBreed);

  const galleryContent = <>{isLoading ? <p>Images are loading</p> : <Gallery images={images} />}</>;
  const buttonText = isLoading
    ? BUTTON_STATE.LOADING
    : images.length === 0
      ? BUTTON_STATE.SHOW
      : BUTTON_STATE.UPDATE;
  return (
    <li>
      {breed} {subBreed && subBreed}
      <button onClick={handleShowImages}>{buttonText}</button>
      <div>
        {error ? (
          <p
            style={{
              color: 'red',
            }}
          >
            {error}
          </p>
        ) : (
          galleryContent
        )}
      </div>
      {children}
    </li>
  );
};

export default Breed;
