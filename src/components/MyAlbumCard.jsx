import albumPlaceholder from "../assets/album-placeholder.png";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function MyAlbumCard({ id, img, name, year, artist, review, rating }) {
  return (
    <div className="bg-grayaccent w-4xl flex flex-row p-2 mx-auto rounded-lg gap-2 my-2">
      <div className="flex flex-col w-3xs shrink-0 gap-0.5">
        <img src={img} className="w-full mb-1" />
        <h2 className="text-2xl font-bold">{name}</h2>
        <span className="text-xl font-light">{year}</span>
        <span className="text-xl font-bold text-graytext">{artist}</span>
      </div>
      <div className="flex flex-col justify-center w-full">
        <div>
        <h3 className="text-xl font-bold mb-0.5">Your Review</h3>
        <p>
          {review}
        </p>
        <h3 className="text-xl font-bold mb-0.5 mt-2">Your Rating</h3>
        <Rating
          className="mb-1"
          precision={0.5}
          size={"large"}
          name="album-rating"
          value={rating}
          readOnly
          emptyIcon={
            <StarIcon
              sx={{
                fontSize: 30,
                color: "gray",
              }}
            />
          }
        />
        </div>
        <button className="ml-auto mt-auto px-1.5 py-0.5 bg-primary font-bold text-background rounded-sm">
          Edit Review
        </button>
      </div>
    </div>
  );
}
