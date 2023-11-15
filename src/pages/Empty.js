import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function Empty(){
    const [time, setTime] = useState(3)
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            } else {
                navigate('/');
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [time, navigate]);
    return(
        <div style={{display: 'flex',flexDirection: 'column', justifyContent:"center", alignItems:'center'}}>
<h1>Форма отправлена!</h1>
            <h1>Ожидайте ответа в скором времени</h1>
            <h1>{time}</h1>

        </div>
    )
}