import albumPlaceholder from "../assets/album-placeholder.png";
import plusIcon from "../assets/plus-icon.svg";
import checkIcon from "../assets/check.svg";
import clsx from "clsx";
export default function AlbumCard({
  id,
  img,
  title,
  year,
  artist,
  handleRateButton,
  handlePlusButton,
  isInWantToListen,
  isReviewed
}) {
  const wantToListenButtonClassName = clsx(
    "w-[42px]",
    "h-[42px]",
    "p-0.5",
    "rounded-sm",
    "border-text",
    "cursor-pointer",
    "hover:bg-[gray]",
    isInWantToListen(id) ? "bg-grayaccent border-1" : "bg-text"
  );
  return (
    <div className="flex flex-col justify-around items-start bg-grayaccent w-2xs p-1.5 rounded-md">
      <img
        src={img}
        className="w-full rounded-md mb-0.5 aspect-square object-cover"
      />

      <h2 className="font-bold text-base mb-0.25">{title}</h2>
      <span className="text-sm font-light mb-0.25">{year}</span>
      <span className="text-sm font-bold text-graytext mb-1.25">{artist}</span>

      <div className="flex flex-row w-full">
        <button
          className={`font-bold grow py-0.625 rounded-sm mr-1 hover:bg-[gray] cursor-pointer ` + (isReviewed(id) ? "text-text bg-grayaccent border" : "bg-primary text-background")}
          onClick={() => handleRateButton(id)}
        >
          {isReviewed(id) ? "Edit Review" : "Rate this album"}
        </button>
        <button
          className={wantToListenButtonClassName}
          onClick={() => handlePlusButton(id)}
        >
          <img src={isInWantToListen(id) ? checkIcon : plusIcon} className="w-full" />
        </button>
      </div>
    </div>
  );
}
