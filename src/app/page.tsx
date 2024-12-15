"use client";

import { useTranslation } from "./components/global/TranslationsProvider";
import { useEffect, useRef, useState } from "react";
import "./styles/home-page/home-page.css";

/**
 * Apollo Client setup for GraphQL queries (commented out because swapi.dev is down).
 * Uncomment the following imports and code to use GraphQL when swapi.dev is available.
 *
 * import { gql, useQuery } from "@apollo/client";
 * import client from "./apollo-client";
 *
 * const GET_FILMS = gql`
 *   query GetFilms {
 *     allFilms {
 *       films {
 *         title
 *         episodeID
 *         director
 *         releaseDate
 *         producers
 *       }
 *     }
 *   }
 * `;
 */

interface Film {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  producer: string;
}

interface FilmAPIResponse {
  result: {
    properties: Film;
  }[];
}

export default function Home() {
  const { t, locale } = useTranslation();

  const [data, setData] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [filters, setFilters] = useState({ director: "", releaseYear: "" });
  const [sortKey, setSortKey] = useState<"title" | "release_date">("title");

  const [visibleCount, setVisibleCount] = useState(3);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://swapi.tech/api/films")
      .then((res) => res.json())
      .then((resData: FilmAPIResponse) => {
        const films = resData.result.map((item) => item.properties);
        setData(films);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching films:", err);
        setError(err);
        setLoading(false);
      });
  }, [locale]);

  /**
   * GraphQL logic (commented out because swapi.dev is down):
   * Replace the REST API logic above with the following when swapi.dev is available.
   
   * const { data, loading, error } = useQuery(GET_FILMS);const films: Film[] = data?.allFilms?.films.map((film: any) => ({
   *   title: film.title,
   *   episode_id: film.episodeID,
   *   director: film.director,
   *   release_date: film.releaseDate,
   *   producer: film.producers.join(", "),
   * })) || [];
   */

  const handleDirectorChange = (value: string) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFilters((prev) => ({ ...prev, director: value }));
    }
  };

  const handleReleaseYearChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setFilters((prev) => ({ ...prev, releaseYear: value }));
    }
  };

  let films = data;
  if (filters.director) {
    films = films.filter((film) =>
      film.director.toLowerCase().includes(filters.director.toLowerCase())
    );
  }

  if (filters.releaseYear) {
    films = films.filter((film) =>
      film.release_date.startsWith(filters.releaseYear)
    );
  }

  films.sort((a, b) => {
    if (sortKey === "title") {
      return a.title.localeCompare(b.title);
    }
    return (
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  });

  const visibleFilms = films.slice(0, visibleCount);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && visibleCount < films.length) {
        setVisibleCount((prevCount) => prevCount + 3);
      }
    };

    const observer = new IntersectionObserver(onIntersect, { threshold: 1 });
    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [films, visibleCount]);

  if (loading) return <p className="loading">{t("loading")}</p>;
  if (error)
    return (
      <p className="error">
        {t("error")}: {error.message}
      </p>
    );

  return (
    <section className="home-section">
      <main>
        <h1>{t("title")}</h1>
        <div className="home-page-filters">
          <input
            type="text"
            placeholder={t("filterDirector")}
            value={filters.director}
            onChange={(e) => handleDirectorChange(e.target.value)}
          />
          <input
            type="text"
            placeholder={t("filterYear")}
            value={filters.releaseYear}
            onChange={(e) => handleReleaseYearChange(e.target.value)}
          />
          <button type="button" onClick={() => setSortKey("title")}>
            {t("sortTitle")}
          </button>
          <button type="button" onClick={() => setSortKey("release_date")}>
            {t("sortReleaseDate")}
          </button>
        </div>

        <ul>
          {visibleFilms.map((film) => (
            <li key={film.episode_id}>
              <h2>{film.title}</h2>
              <p>
                {t("episodeId")}: {film.episode_id}
              </p>
              <p>
                {t("director")}: {film.director}
              </p>
              <p>
                {t("releaseDate")}:{" "}
                {new Date(film.release_date).toLocaleDateString(locale, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p>
                {t("producers")}: {film.producer.split(", ").join(", ")}
              </p>
            </li>
          ))}
        </ul>

        {visibleCount < films.length && (
          <div ref={loadMoreRef} className="load-more">
            <p>{t("loading")}</p>
          </div>
        )}
      </main>
    </section>
  );
}
