import { useContext } from "react";
import EmptyReviewedAlbums from "../components/EmptyReviewedAlbums";
import MyAlbumCard from "../components/MyAlbumCard";
import { AppContext } from "../App";

export default function ReviewedAlbums() {
  const { reviewedAlbums } = useContext(AppContext);
  const reviewedAlbumCards = reviewedAlbums.map((album) => {
    return <MyAlbumCard 
      key={album.id}
      id={album.id}
      img={album.img}
      name={album.name}
      artist={album.artist}
      year={album.year}
      rating={album.rating}
      review={album.review}
    />;
  });

  return (
    <div>
      {reviewedAlbums.length !== 0 ? reviewedAlbumCards : <EmptyReviewedAlbums />}
    </div>
  );
}
