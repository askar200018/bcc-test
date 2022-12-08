import { isAxiosError } from 'axios';
import { useState } from 'react';
import { getImagesByBreed } from '../services/dogs';

interface Props {
  breed: string;
  subBreed?: string;
  openErrorModal: () => void;
}

export const useLoadImages = ({ breed, subBreed, openErrorModal }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [controller, setController] = useState<AbortController>();

  const cancelRequest = () => {
    controller?.abort();
  };

  const createAbortController = (): AbortController => {
    const newController = new AbortController();
    setController(newController);
    return newController;
  };

  const createBreedPartUrl = () => {
    return subBreed ? `${breed}/${subBreed}` : breed;
  };

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const newController = createAbortController();

      const breedPartUrl = createBreedPartUrl();
      const fetchedImages = await getImagesByBreed(breedPartUrl, newController.signal);
      setImages(fetchedImages);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      if (isAxiosError(err)) {
        if (err.name === 'CanceledError') {
          return;
        }
      }
      openErrorModal();
    }
  };

  const handleShowImages = async () => {
    if (isLoading) {
      cancelRequest();
    } else {
      fetchImages();
    }
  };

  return {
    isLoading,
    images,
    handleShowImages,
  };
};
