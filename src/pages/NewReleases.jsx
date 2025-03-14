import { useContext, useEffect, useState } from "react";
import EmptyDiscover from "../components/EmptyDiscover";
import { AppContext } from "../App";
import AlbumCard from "../components/AlbumCard";
import AlbumModal from "../components/AlbumModal";
import { createPortal } from "react-dom";

export default function NewReleases() {
  //LOCAL STATES
  const [albumsData, setAlbumsData] = useState([]);
  const [currentModal, setCurrentModal] = useState(undefined);
  const [modalTracks, setModalTracks] = useState([]);

  const {
    wantToListen,
    accessToken,
    removeFromWantToListen,
    addToWantToListen,
    isInWantToListen,
    isReviewed
  } = useContext(AppContext);

  useEffect(() => {
    async function getNewReleases() {
      const albumsParams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      try {
        const result = await fetch(
          "https://api.spotify.com/v1/browse/new-releases",
          albumsParams
        );
        const data = await result.json();
        if (data && data.albums) {
          setAlbumsData(data.albums.items);
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    }

    getNewReleases();
  }, []);

  // Define handleRateButton or remove it if not needed
  const handleRateButton = (id) => {
    // Implement rating functionality
    getTracks(id);
    setCurrentModal(id);
  };

  // Get Tracks from Album Id
  async function getTracks(id) {
    let albumsParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const result = await fetch(
      "https://api.spotify.com/v1/albums/" + id + "/tracks?market=US&limit=50",
      albumsParams
    );
    const data = await result.json();
    if (await data.items) {
      setModalTracks(data.items.map((item) => item.name));
    }
  }

  return (
    <div>
      <div className="mt-5 w-xl mx-auto">
        <h1 className="text-6xl text-center font-bold mb-1">New Releases</h1>
        <p className="text-center">
          Stay ahead of the curve with Jukeboxd’s New Releases section! We bring
          you the freshest albums as soon as they drop, so you’ll never miss out
          on the latest sounds from your favorite artists.
        </p>
      </div>
      <div className="w-4xl mx-auto my-2">
        {albumsData !== undefined && (
          <div className="grid grid-cols-3 mt-1 mx-auto gap-2 justify-items-center justify-center w-full">
            {albumsData.map((album) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                img={album.images[0].url}
                title={album.name}
                year={album.release_date.substring(0, 4)}
                artist={album.artists.map((artist) => artist.name).join(", ")}
                handleRateButton={handleRateButton}
                handlePlusButton={
                  isInWantToListen(album.id)
                    ? removeFromWantToListen
                    : addToWantToListen
                }
                isInWantToListen={isInWantToListen}
                isReviewed={isReviewed}
              />
            ))}
          </div>
        )}
        {currentModal !== undefined &&
          createPortal(
            <AlbumModal
              addToWantToListen={addToWantToListen}
              removeFromWantToListen={removeFromWantToListen}
              isInWantToListen={isInWantToListen}
              onClose={() => setCurrentModal(undefined)}
              albumObject={albumsData.find(
                (album) => album.id === currentModal
              )}
              modalTracks={modalTracks}
            />,
            document.getElementById("main")
          )}
      </div>
    </div>
  );
}
