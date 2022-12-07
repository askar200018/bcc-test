interface Props {
  images: string[];
}

const Gallery = ({ images }: Props) => {
  return (
    <div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Image of breed"
          height={160}
          width={160}
          style={{
            objectFit: 'cover',
            margin: 8,
          }}
        />
      ))}
    </div>
  );
};
export default Gallery;
