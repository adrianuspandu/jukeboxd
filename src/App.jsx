import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { useState, useEffect, createContext } from "react";

// Import Layouts
import MyAlbumsLayout from "./layouts/MyAlbumsLayout";
import RootLayout from "./layouts/RootLayout";

// Import Pages
import Home from "./pages/Home";
import NewReleases from "./pages/NewReleases";
import ReviewedAlbums from "./pages/ReviewedAlbums";
import WantToListenAlbums from "./pages/WantToListenAlbums";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// React Router Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="new-releases" element={<NewReleases />} />

      <Route path="my-albums" element={<MyAlbumsLayout />}>
        <Route index element={<ReviewedAlbums />} />
        <Route path="want-to-listen" element={<WantToListenAlbums />} />
      </Route>

      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Spotify API Keys
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const [accessToken, setAccessToken] = useState("");

  // Spotify Get Access Token
  useEffect(() => {
    //test
    const tests = [
      {
        id: "3PRoXYsngSwjEQWR5PsHWR",
        rating: 5,
        review: "super duper good",
      },
      {
        id: "45FwBA8BASCrs5DBQIHkTn",
        rating: 3,
        review: "i mean its listenable",
      },
    ];

    localStorage.setItem("reviewed-albums", JSON.stringify(tests));

    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  const [wantToListen, setWantToListen] = useState(() => {
    const initialWantToListen = localStorage.getItem("want-to-listen");
    return initialWantToListen ? JSON.parse(initialWantToListen) : [];
  });
  const [reviewedAlbums, setReviewedAlbums] = useState(() => {
    const initialReviewedAlbums = localStorage.getItem("reviewed-albums");
    return initialReviewedAlbums ? JSON.parse(initialReviewedAlbums) : [];
  });

  // update localStorage whenever wantToListen changes
  useEffect(() => {
    localStorage.setItem("want-to-listen", JSON.stringify(wantToListen));
  }, [wantToListen]);

  // update localStorage whenever reviewedAlbums changes
  useEffect(() => {
    localStorage.setItem("reviewed-albums", JSON.stringify(reviewedAlbums));
  }, [reviewedAlbums]);

  // add to Want to Listen function
  function addToWantToListen(id) {
    setWantToListen((prev) => [...prev, id]);
  }

  // remove from want to listen function
  function removeFromWantToListen(id) {
    setWantToListen((prev) => prev.filter((album) => album !== id));
  }

  // helper function to determine whether an album is already in wantToListen
  const isInWantToListen = (id) => {
    return wantToListen.some((album) => album === id);
  };

  function handleReview(id, img, name, year, artist, e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    setReviewedAlbums(prev => {
      return (
        [...prev, {
          id: id,
          img: img,
          name: name,
          year: year,
          artist: artist,
          rating: data.rating,
          review: data.review
        }]
      )
    })
  }

  const isReviewed = (id) => {
    return reviewedAlbums.some((album) => album.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        accessToken,
        wantToListen,
        setWantToListen,
        reviewedAlbums,
        setReviewedAlbums,
        addToWantToListen,
        removeFromWantToListen,
        isInWantToListen,
        handleReview,
        isReviewed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;