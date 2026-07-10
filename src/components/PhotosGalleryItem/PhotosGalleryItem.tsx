import type { Photo } from "../../types/photo";
import GridItem from "../GridItem/GridItem";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  onPhotoClick: (photo: Photo | null) => void;
}

export default function PhotosGalleryItem({
  photo,
  onPhotoClick,
}: PhotosGalleryItemProps) {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: photo.avg_color,
          borderColor: photo.avg_color,
        }}
      >
        <img
          src={photo.src.original}
          alt={photo.alt}
          onClick={() => onPhotoClick(photo)}
        />
      </div>
    </GridItem>
  );
}
