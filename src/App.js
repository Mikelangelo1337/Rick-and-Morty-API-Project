
import './styles/App.css';
import {NavLink, Outlet} from "react-router-dom";
import "./styles/app-page.css"

function App() {
  return (
   <div className="App">
     <div className={"header-container"}>
       <ul>
         <NavLink to={"/character"}>
           <li>Персонажи</li>
         </NavLink>
         <NavLink to={"/locations"}>
           <li>Локации</li>
         </NavLink>
         <NavLink to={"/episodes"}>
           <li>Эпизоды</li>
         </NavLink>
       </ul>
     </div>
     <div className={"app-main"}>
       <h1>Добро пожаловать!</h1>
     <h1>Здесь вы найдете информацию о персонажах, локациях и эпизодах из мира Rick and Morty.</h1>
     <h1>Выберите раздел выше, чтобы начать!</h1>
     </div>
    </div>

  );
}

export default App;
