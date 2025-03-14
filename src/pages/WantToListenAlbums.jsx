import { useContext, useState, useEffect } from "react";
import EmptyWantToListen from "../components/EmptyWantToListen";
import { AppContext } from "../App";
import AlbumCard from "../components/AlbumCard";
import { createPortal } from "react-dom";
import AlbumModal from "../components/AlbumModal";

export default function WantToListenAlbums() {
  const {
    wantToListen,
    accessToken,
    removeFromWantToListen,
    addToWantToListen,
    isInWantToListen,
    isReviewed
  } = useContext(AppContext);

  const [albumsData, setAlbumsData] = useState([]);
  const [currentModal, setCurrentModal] = useState(undefined);
  const [modalTracks, setModalTracks] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      if (wantToListen.length === 0) return;

      const albumsParams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      try {
        const result = await fetch(
          "https://api.spotify.com/v1/albums?ids=" + wantToListen.join(","),
          albumsParams
        );
        const data = await result.json();
        if (data && data.albums) {
          setAlbumsData(data.albums);
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    }

    getAlbums();
  }, [wantToListen, accessToken]); // Re-run when these dependencies change

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
    <div className="w-4xl mx-auto my-2">
      {wantToListen.length !== 0 ? (
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
      ) : (
        <EmptyWantToListen />
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
  );
}
