import albumPlaceholder from "../assets/album-placeholder.png";
import { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Star } from "@mui/icons-material";
import clsx from "clsx";
import { AppContext } from "../App";

export default function AlbumModal({
  addToWantToListen,
  removeFromWantToListen,
  isInWantToListen,
  modalTracks,
  albumObject,
  onClose,
}) {
  const { handleReview } = useContext(AppContext);

  const trackList = modalTracks.map((track) => <li key={track}>{track}</li>);
  const wantToListenButtonClassName = clsx(
    "mr-auto",
    "py-0.5",
    "px-1.5",
    "border-1",
    "border-text",
    "rounded-md",
    "mt-1",
    "cursor-pointer",
    isInWantToListen(albumObject.id)
      ? "hover:bg-[gray]"
      : "bg-text text-background hover:bg-[white]"
  );

  const albumId = albumObject.id
  const albumName = albumObject.name
  const imgSrc = albumObject.images[0].url
  const artistNames = albumObject.artists
    .map((artist) => artist.name)
    .join(", ");
  const releaseYear = albumObject.release_date.substring(0, 4)
  return (
    <div className="flex flex-row rounded-xl bg-secondary w-5xl h-[80vh] gap-2.75 py-3 px-4 fixed top-0 left-0 right-0 bottom-0 m-auto overflow-scroll shadow-[0_0_50px_50px_black]">
      <div className="flex flex-col w-2xs">
        <img src={imgSrc} className="w-full rounded-lg" />
        <span className="mt-1 mb-0.5 font-bold text-xl">Tracks</span>
        <ol className="list-inside list-decimal text-sm/1.5">{trackList}</ol>
      </div>

      <div className="flex flex-col gap-2 grow">
        <button
          onClick={onClose}
          className="ml-auto text-2xl cursor-pointer hover:font-bold"
        >
          Close
        </button>
        <div className="flex flex-col gap-0.5">
          <h2 className="font-bold text-2xl">{albumName}</h2>
          <span className="text-xl font-light">
            {releaseYear}
          </span>
          <span className="text-xl font-bold text-graytext">
            {artistNames}
          </span>
          <button
            className={wantToListenButtonClassName}
            onClick={
              isInWantToListen(albumId)
                ? () => removeFromWantToListen(albumId)
                : () => addToWantToListen(albumId)
            }
          >
            {isInWantToListen(albumId)
              ? "Remove from 'Want to Listen'"
              : "Add to 'Want to Listen'"}
          </button>
        </div>

        <form
          className="flex flex-col"
          onSubmit={(e) => handleReview(albumId, imgSrc, albumName, releaseYear, artistNames,  e)}
        >
          <label className="text-xl font-bold mb-0.5">Your Rating</label>
          {/* Star Component */}
          <Rating
            className="mb-1"
            onChange=""
            precision={0.5}
            size={"large"}
            name="rating"
            emptyIcon={
              <Star
                sx={{
                  fontSize: 30,
                  color: "gray",
                }}
              />
            }
          />

          <label className="text-xl font-bold mb-0.5">Write a review</label>
          <textarea
            name="review"
            className="border-1 p-1 rounded-sm mb-2"
            rows="6"
            placeholder="I like this album because..."
          ></textarea>
          <button
            type="submit"
            className="bg-greenaccent text-sm font-bold px-1.5 py-0.5 ml-auto rounded-sm cursor-pointer hover:bg-[green]"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
