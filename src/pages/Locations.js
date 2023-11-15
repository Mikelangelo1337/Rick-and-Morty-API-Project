import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import 'animate.css';
import "../styles/home.css"
import "../styles/formation.css"
import "../styles/home-location.css"
export function Locations(){
    const [location,setLocation] = useState([])
    const random = Math.floor(Math.random() * 10);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
            .then(res=> res.json())
            .then(data=> setLocation(data.results))
    }, [page]);
    const search = (event) => {
        setSearchInput(event.target.value);
    };

    const filter = location.filter(location =>
        location.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    function next(){
        if (page < 7){
            setPage(e => e + 1)
        }
    }
    function back() {
        if (page > 1) {
            setPage(e => e - 1);
        }
    }
    return(
        <>
            <div>
                <div className={"header-container"}>
                    <button onClick={back}>Пред. страница</button>
                    <button onClick={next}>След. страница</button>
                    <ul>
                        <NavLink to={"/character"}>
                            <li>Персонажи</li>
                        </NavLink>
                        <NavLink to={"/episodes"}>
                            <li>Эпизоды</li>
                        </NavLink>
                    </ul>
                    <input className={"header-input"}
                           placeholder={"Поиск по локации"}
                           type="text"
                           value={searchInput}
                           onChange={search}
                    />
                </div>
                <div className={"header"}>
                    <h1  className="animate__animated animate__fadeInRightBig">Rick And Morty</h1>
                    <h1  className="animate__animated animate__fadeInLeftBig"> Locations</h1>
                </div>

                <div className={"character-div"}>
                    {filter.map((item)=>{
                        return <div
                            className={"div-block"}
                            key={item.id}>
                            <p onClick={()=>{
                                navigate(`/location/${item.id}`)
                            }} className={"animate__animated animate__fadeInDown location-title"}>
                                {item.name}
                            </p>
                        </div>
                    })}
                </div>
                <div className={"footer-container"}>
                        <ul>
                            <li>Все права защищены©</li>
                            <NavLink to={"/about"}>
                                <li>Свяжитесь с нами</li>
                            </NavLink>
                            <NavLink to={"/"}>
                                <li>Главная страница</li>
                            </NavLink>
                        </ul>
                </div>
            </div>
        </>
    )
}