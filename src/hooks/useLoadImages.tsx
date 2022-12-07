import { useState } from 'react';
import { getImagesByBreed } from '../services/dogs';

const ERROR_MESSAGE = 'Упс! Что-то пошло не так!';

export const useLoadImages = (breed: string, subBreed?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setError(null);
    } catch (err) {
      setError(ERROR_MESSAGE);
      setIsLoading(false);
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
    error,
    images,
    handleShowImages,
  };
};
