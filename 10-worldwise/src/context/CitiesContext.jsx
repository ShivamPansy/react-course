import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const inittialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loaded":
      return { ...state, isLoading: true };
    case "unloaded":
      return { ...state, isLoading: false };
    case "cities/fetch":
      return { ...state, cities: action.payload };
    case "cities/get":
      return { ...state, currentCity: action.payload };
    case "cities/create":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case "cities/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      return inittialState;
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    inittialState
  );
  //   const [cities, setCities] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loaded" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/fetch", payload: data });
      } catch {
        alert("There was an error fetching cities");
      } finally {
        dispatch({ type: "unloaded" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loaded" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "cities/get", payload: data });
    } catch {
      alert("There was an error fetching cities");
    } finally {
      dispatch({ type: "unloaded" });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loaded" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        header: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "cities/create", payload: data });
    } catch {
      alert("There was an error creating cities");
    } finally {
      dispatch({ type: "unloaded" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loaded" });
      const res = await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      dispatch({ type: "cities/delete", payload: id });
    } catch {
      alert("There was an error deleting cities");
    } finally {
      dispatch({ type: "unloaded" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of scope");
  return context;
}

export { CitiesProvider, useCities };
