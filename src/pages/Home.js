import {useEffect, useState} from "react";
import "../styles/home.css"
import {NavLink, useNavigate} from "react-router-dom";
import 'animate.css';

export function Home(){
    const [char,setChar] = useState([])
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                if (searchText.trim() === '') {
                    const response = await fetch(`https://rickandmortyapi.com/api/character/`);
                    const data = await response.json();
                    setChar(data.results);
                } else {
                    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchText}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.results.length > 0) {
                            setChar(data.results);
                        } else {
                            setChar([]);
                        }
                    } else {
                        console.error('Ошибка при получении данных');
                    }
                }
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchCharacters();
    }, [searchText]);

    const search = (e) => {
        setSearchText(e.target.value);
    };

    const filter = char.filter(character =>
        character.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return(

<div>

    <div className={"header-container"}>
            <ul>
                <NavLink to={"/locations"}>
                    <li>Локации</li>
                </NavLink>
                <NavLink to={"/episodes"}>
                    <li>Эпизоды</li>
                </NavLink>
            </ul>
            <input className={"header-input"}
                   placeholder={"Поиск по персонажу"}
                   type="text"
                   value={searchText}
                   onChange={search}
            />
    </div>
<div className={"header"}>
    <h1  className="animate__animated animate__tada">Rick And Morty</h1>
</div>
        <div className={"character-div"}>
            {filter.map((item)=>{
                return <div
                    className={"div-block"}
                    key={item.id}>
                    <img onClick={(e)=>{
e.target.setAttribute("class", "animate__hinge")
                        setTimeout(()=>{
navigate(`/character/${item.id}`)
                        },2000)

                    }}
                         className={"character-img animate__animated animate__fadeInUp"}
                         key={item.id} src={item.image}
                         alt={item.name} />
                <p
                    className={"animate__animated animate__fadeInDown"}>
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

    )
}