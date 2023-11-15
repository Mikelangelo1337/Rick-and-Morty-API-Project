import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/info-pages.css"
import { Watch } from 'react-loader-spinner';

export function Locationpage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [residents, setResidents] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/location/${id}`)
            .then(res => res.json())
            .then(data => {
                setPlace(data);
                const residentsUrls = data.residents.slice(0, 5);
                if (residentsUrls.length > 0) {
                    Promise.all(residentsUrls.map(residentUrl =>
                        fetch(residentUrl)
                            .then(res => res.json())
                            .then(residentData => {
                                setResidents(prevResidents => [...prevResidents, residentData]);
                            })
                    ));
                    if (data.residents.length > 5) {
                        setShowMore(true);
                    }
                }
            })
            .catch((error) => {
                console.error("Ошибка", error);
            });
    }, [id]);

    const loadMoreResidents = () => {
        const remainingResidents = place.residents.slice(residents.length, residents.length + 5);
        Promise.all(remainingResidents.map(residentUrl =>
            fetch(residentUrl)
                .then(res => res.json())
                .then(residentData => {
                    setResidents(prevResidents => [...prevResidents, residentData]);
                })
        ));

        if (residents.length + 5 >= place.residents.length) {
            setShowMore(false);
        }
    };

    if (!place) {
        return (
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <Watch
                    height={80}
                    width={80}
                    radius={48}
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        );
    }

    const { name, type, dimension } = place;

    return (
        <div className={"info-div"}>
            <button onClick={() => navigate("/locations")}>Назад</button>
            <h1>Название локации: {name}</h1>
            <h1>Тип: {type}</h1>
            <h1>Измерение: {dimension}</h1>
            <h1>Жители:</h1>
            {residents.length > 0 ? (
                <ul>
                    {[...new Map(residents.map(item => [item.id, item])).values()].map(resident => (
                        <li
                            onClick={() => navigate(`/character/${resident.id}`)}
                            key={resident.id}
                        >
                            {resident.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <h1>Жителей нет</h1>
            )}


            {showMore && (
                <button onClick={loadMoreResidents}>Показать больше</button>
            )}
        </div>
    );
}
