import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/info-pages.css";
import { Watch } from 'react-loader-spinner';

export function EpisodePage() {
    const { id } = useParams();
    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/episode/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setEpisode(data);
                const characterUrls = data.characters.slice(0, 5);
                if (characterUrls && characterUrls.length > 0) {
                    Promise.all(characterUrls.map(characterUrl =>
                        fetch(characterUrl)
                            .then(res => res.json())
                            .then(characterData => {
                                setCharacters(prevCharacters => [...prevCharacters, characterData]);
                            })
                    ));
                    if (data.characters.length > 5) {
                        setShowMore(true);
                    }
                }
            })
            .catch((error) => {
                console.error("Ошибка", error);
            });
    }, [id]);
    const loadMoreCharacters = () => {
        const remainingCharacters = episode.characters.slice(characters.length, characters.length + 5);
        Promise.all(remainingCharacters.map(characterUrl =>
            fetch(characterUrl)
                .then(res => res.json())
                .then(characterData => {
                    setCharacters(prevCharacters => [...prevCharacters, characterData]);
                })
        ));

        if (characters.length + 5 >= episode.characters.length) {
            setShowMore(false);
        }
    };

    if (!episode) {
        return (
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <Watch
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        );
    }

    const { name, episode: episodeCode, air_date } = episode;

    return (
        <div className={"info-div"}>
            <button onClick={() => navigate("/locations")}>Назад</button>
            <h1>Название эпизода: {name}</h1>
            <h1>Код эпизода: {episodeCode}</h1>
            <h1>Дата эпизода: {air_date}</h1>
            <h1>Персонажи эпизода</h1>
            <ul>
                {[...new Map(characters.map(item => [item.id, item])).values()].map(character => (
                    <li
                        onClick={() => navigate(`/character/${character.id}`)}
                        key={character.id}
                    >
                        {character.name}
                    </li>
                ))}
            </ul>
            {showMore && (
                <button onClick={loadMoreCharacters}>Показать больше</button>
            )}



        </div>
    );
}
