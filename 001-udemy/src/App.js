import { useState, useEffect } from "react";
const apikey = "f3d1f8f";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [numResultsFound, setNumResultsFound] = useState(0);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(
    function () {
      async function getMovies() {
        try {
          console.log(query);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apikey}&${query}&page=${page}`
          );
          const data = await res.json();

          if (data.Response === "False")
            throw new Error("Movie not found, try entering correct query");

          setMovieList(data.Search);
          setNumResultsFound(data.totalResults);
          console.log(data);
        } catch (err) {
          setError(err.message);
        }
      }
      if (!query) {
        console.log(query);
        setError("");
        setMovieList([]);
        return;
      }
      getMovies();
    },
    [query, page]
  );

  function handleSetQuery(value) {
    setPage(1);
    setQuery(value);
  }

  function handlePageClick(page) {
    setPage(page);
  }

  return (
    <div className="App">
      <SearchMovie onSetQuery={handleSetQuery} />
      {error === "" ? (
        numResultsFound === 0 ? (
          ""
        ) : (
          <>
            <DisplayResult
              movieList={movieList}
              onPageClick={handlePageClick}
              page={page}
              numResultsFound={numResultsFound}
            />
          </>
        )
      ) : (
        <ErrorBlock error={error} />
      )}
    </div>
  );
}

function SearchMovie({ onSetQuery }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    onSetQuery(`&s=${title}&type=${type}`);

    setTitle("");
    setType("");
  }

  return (
    <form className="search">
      <label>Enter movie title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="movie">movie</option>
        <option value="series">series</option>
        <option value="">all</option>
      </select>
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
}

function ErrorBlock({ error }) {
  return (
    <div>
      <h3>{error}</h3>
    </div>
  );
}

function Found({ onPageClick, page, numResultsFound }) {
  function onClickLeft() {
    if (page === 1) return;
    onPageClick(page - 1);
  }

  function onClickRight() {
    onPageClick(page + 1);
  }

  return (
    <div className="found">
      <button
        className="button left"
        onClick={onClickLeft}
        disabled={page === 1}
      >{`<`}</button>
      <span>Found {numResultsFound} results</span>
      <button className=" button right" onClick={onClickRight}>{`>`}</button>
    </div>
  );
}

function DisplayResult({ movieList, onPageClick, page, numResultsFound }) {
  return (
    <div className="result">
      <Found
        onPageClick={onPageClick}
        page={page}
        numResultsFound={numResultsFound}
      />
      <ul className="movies">
        {movieList?.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            <div>
              <h3>{movie.Title}</h3>
              <p>
                <span>{movie.Year}</span>
              </p>
              <button className="button">Select</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
