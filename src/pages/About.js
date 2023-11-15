import "../styles/App.css"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
export function About(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [arr, setArr] = useState([])
    function operation(e){
e.preventDefault()
        if(!name || !phone){
            alert("Вы не ввели форму!")
        } else {
            arr.push(name)
            arr.push(phone)
            localStorage.setItem('form', arr)
            navigate("/form-send")
        }

    }
    return (
        <div>
            <div className={"button-container"}>
                <button onClick={() => navigate("/")}>Назад</button>
            </div>
            {localStorage.getItem('form') ? (
                <h1>
                    Вы уже ввели форму.
                </h1>
            ) : (
                <form>
                    <input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        placeholder={"Ваше имя"}
                        type="text"
                    />
                    <input
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                        placeholder={"Ваш телефон"}
                        type="text"
                    />
                    <button onClick={operation}>Отправить форму</button>
                </form>
            )}
        </div>
    );
}