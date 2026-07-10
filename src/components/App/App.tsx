import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import toast, { Toaster } from "react-hot-toast";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSelectPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
  };

  const onSubmit = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setPhotos(null);

      const data = await getPhotos(query);

      if (data.length === 0) {
        toast.error("No photos found for your request.");
        return;
      }

      setPhotos(data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Toaster position="top-center" />
          <Form onSubmit={onSubmit} />
          {isLoading && <Loader />}
          {isError && <Text>Ooooooops, something went wrong😢</Text>}
          {photos && photos.length > 0 && (
            <PhotosGallery photos={photos} onPhotoClick={handleSelectPhoto} />
          )}
          {selectedPhoto && (
            <Modal onClose={() => handleSelectPhoto(null)}>
              <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
