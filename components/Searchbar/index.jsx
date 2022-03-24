import cn from "classnames";
import useKeyPress from "components/Hooks/useKeyPress";
import { SearchIcon } from "components/icons";
import { LANGUAGES } from "lib/constants/languages";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  searchContainer,
  search,
  suggestions as suggestionsStyle,
  suggestion as suggestionStyle,
  withSuggestions,
  active
} from "./searchbar.module.scss";

const Searchbar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const languageNames = LANGUAGES.map((language) => language.name);

  const [inputFocused, setInputFocused] = useState(false);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(-1);
  const [hovered, setHovered] = useState();
  const [searchBySuggestion, setSearchBySuggestion] = useState(false);

  useEffect(() => {
    if (suggestions.length && downPress && inputFocused) {
      setSearchBySuggestion(true);
      setCursor((prevState) =>
        prevState < suggestions.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress, inputFocused, suggestions.length]);

  useEffect(() => {
    if (suggestions.length && upPress && inputFocused) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress, suggestions.length, inputFocused]);

  useEffect(() => {
    if (suggestions.length && enterPress && inputFocused && searchBySuggestion) {
      const selected = suggestions[cursor];

      handleSearch();
      router.push(`/search?q=${selected}`);
    }
  }, [searchBySuggestion, cursor, enterPress, inputFocused, router, suggestions]);

  useEffect(() => {
    if (suggestions.length && hovered) {
      setCursor(suggestions.indexOf(hovered));
    }
  }, [hovered, suggestions]);

  const handleChange = (e) => {
    setCursor(-1);
    setSearchBySuggestion(false);
    setQuery(e.target.value);
    const regex = new RegExp(`^${e.target.value || "w"}`, "i");
    setSuggestions(languageNames.filter((language) => regex.test(language)));
  };

  const handleSearch = () => {
    setQuery("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    handleSearch();
    router.push(`/search?q=${query}`);
  };

  return (
    <form
      className={cn(searchContainer, "bg-global-secondary", {
        [withSuggestions]: suggestions.length > 0,
      })}
      onSubmit={handleSubmit}
    >
      <SearchIcon />
      <input
        type="text"
        placeholder="Rechercher"
        id="searchBar"
        className={search}
        value={query}
        onChange={handleChange}
        autoComplete="off"
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      <ul className={`${suggestionsStyle} bg-global-secondary`} role="listbox">
        {suggestions.map((suggestion, i) => (
          <li
            key={suggestion}
            className={cn(suggestionStyle, {
              [active]: i === cursor && searchBySuggestion
            })}
            role="presentation"
            onMouseEnter={() => setHovered(suggestion)}
            onMouseLeave={() => setHovered(undefined)}
          >
            <Link
              href={{ pathname: "/search", query: { q: suggestion } }}
            >
              <a onClick={handleSearch}>{suggestion}</a>
            </Link>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Searchbar;
