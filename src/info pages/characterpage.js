import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import "../styles/info-pages.css"
import {Watch} from 'react-loader-spinner'
export function Characterpage() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
const navigate = useNavigate()
    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCharacter(data);
            })
            .catch((error) => {
                console.error("Ошибка", error);
            });
    }, [id]);



    if (!character) {
        return <div style={{display: "flex", justifyContent: 'center'}}><Watch
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        /></div>;
    }

    const { name, status, species, gender, origin, location, image, created } = character;
    const locationPage = () => {
        if (character && character.location && character.location.url) {
            const id = character.location.url.split('/').pop();
            navigate(`/location/${id}`);
        }
    }
    return (
        <div className={"info-div"}>
            <button onClick={()=>{
navigate("/character")
            }}>Назад</button>
            <img alt={name} src={image}/>
            <h1>Имя: {name}</h1>
            <h1>Статус: {status}</h1>
            <h1>Раса: {species}</h1>
            <h1>Пол: {gender}</h1>
            <h1>Происхождение: {origin.name}</h1>
            <h1 className={"nav-location"} onClick={locationPage}>Локация: {location.name}</h1>
            <h1>Дата создания: {created}</h1>
        </div>
    );
}
