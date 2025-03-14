import SearchBar from "../components/SearchBar";
import jukeboxdLogo from "../assets/jukeboxd-logo.png";
import AlbumCard from "../components/AlbumCard";
import AlbumModal from "../components/AlbumModal";
import NoSearchResults from "../components/NoSearchResults";
import EmptyReviewedAlbums from "../components/EmptyReviewedAlbums";
import MyAlbumCard from "../components/MyAlbumCard";
import { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../App";

export default function Home() {
  const {
    accessToken,
    wantToListen,
    setWantToListen,
    reviewedAlbums,
    setReviewedAlbums,
    addToWantToListen,
    removeFromWantToListen,
    isInWantToListen,
    isReviewed
  } = useContext(AppContext);

  // States
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentModal, setCurrentModal] = useState(undefined);
  const [modalTracks, setModalTracks] = useState([]);

  // Search album function
  async function search(formData) {
    const query = formData.get("query");
    setSearchQuery(query);
    let albumsParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const result = await fetch(
      "https://api.spotify.com/v1/search?q=" + query + "&type=album&market=DE",
      albumsParams
    );
    const data = await result.json();
    if (await data.albums.items) {
      setSearchResults(await data.albums.items);
    }
  }

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

  // Map search results into a React Component
  const albumCards = searchResults.map((searchResult) => {
    return (
      <AlbumCard
        key={searchResult.id}
        id={searchResult.id}
        img={searchResult.images[0].url}
        title={searchResult.name}
        year={searchResult.release_date.substring(0, 4)} //get year only
        artist={searchResult.artists.map((artist) => artist.name).join(", ")}
        handleRateButton={handleRateButton}
        handlePlusButton={isInWantToListen(searchResult.id) ? removeFromWantToListen : addToWantToListen}
        isInWantToListen={isInWantToListen}
        isReviewed={isReviewed}
      />
    );
  });

  // Handle Rate Button
  function handleRateButton(id) {
    getTracks(id);
    setCurrentModal(id);
  }


  return (
    <>
      <div className="flex flex-col justify-center items-center w-md mx-auto mt-8 mb-3.5">
        <img src={jukeboxdLogo} className="w-xs mb-2" alt="Jukeboxd Logo" />
        <p className="text-center">
          Discover your next favorite album, keep track of what you've listened
          to, and share your thoughts with personal ratings and reviews. Try
          searching for your favorite album using the search bar below.
        </p>
      </div>

      {/* SEARCH BAR */}
      <SearchBar
        placeholder="my beautiful dark twisted fantasy"
        action={search}
      />
      {searchResults.length !== 0 && (
        <div className="w-4xl mx-auto my-2">
          <p>
            Search Results for{" "}
            <span className="font-bold">"{searchQuery}"</span>
          </p>
          <div className="grid grid-cols-3 mt-1 mx-auto gap-2 justify-items-center justify-center w-full">
            {albumCards}
          </div>
        </div>
      )}

      {currentModal !== undefined &&
        createPortal(
          <AlbumModal
            addToWantToListen={addToWantToListen}
            removeFromWantToListen={removeFromWantToListen}
            isInWantToListen={isInWantToListen}
            onClose={() => setCurrentModal(undefined)}
            albumObject={searchResults.find(
              (searchResult) => searchResult.id === currentModal
            )}
            modalTracks={modalTracks}
          />,
          document.getElementById("main")
        )}
    </>
  );
}
