import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo | null) => void;
}

export default function PhotosGallery({
  photos,
  onPhotoClick,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <PhotosGalleryItem
          key={photo.id}
          photo={photo}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </Grid>
  );
}
