export default function About() {
  return (
    <div className="mt-5 w-xl mx-auto">
      <h1 className="text-6xl text-center font-bold">About</h1>
      <h2 className="text-xl mt-4 mb-1 font-bold">What is Jukeboxd?</h2>
      <p>
        Jukeboxd is a streamlined web app created by <a className="font-bold underline hover:text-primary" href="https://www.adrianuspandu.com/" target="_blank">Adrianus Pandu Wicaksono</a>,
        designed to help users discover, organize, and track their music
        listening journey. With Jukeboxd, you can search for albums, add them to
        a "want to listen" list, and rate or review albums you've previously
        listened to—all in one place.
      </p>
      <h2 className="text-xl mt-2 mb-1 font-bold">How Does It Work?</h2>
      <p>
        Jukeboxd leverages the Spotify API to fetch and display album data,
        ensuring accurate and up-to-date search results. Currently, the app
        stores user data locally via localStorage, but future updates will
        integrate Firebase for cloud-based data storage. Jukeboxd is actively in
        development, with ongoing improvements to enhance its features and user
        experience.
      </p>
    </div>
  );
}
