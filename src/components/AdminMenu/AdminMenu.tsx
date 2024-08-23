import { useRef, useState } from "react";
import { Form } from "../UserMenu/UserMenu";

function AdminMenu({adminAuthCb}:any) {
    const [isAuth, setIsAuth] = useState(false);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function auth(login: string, password: string) {
        return login === 'admin' && password === 'admin';
    }

    function loginHandler() {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            const authStatus=auth(login, password);
            setIsAuth(authStatus);
            if(authStatus){
                let ad=localStorage.getItem('problem7');
                if(typeof ad === 'string'){
                    let mas:Form = JSON.parse(ad);
                    console.log(1,mas);
                }
                let ad1=localStorage.getItem('problem8');
                if(typeof ad1 === 'string'){
                    let mas1:Form = JSON.parse(ad1);
                    console.log(2,mas1);
                }
            }
        }
        
    }

    function logoutHandler() {
        setIsAuth(false);
    }

    return (<>
        {isAuth ? (<>
            <button onClick={logoutHandler}>Выйти</button>

        </>) : (<>
            <button onClick={adminAuthCb}>Назад в меню пользователя</button><br></br>
            <input ref={loginRef} placeholder="Логин"></input><br></br>
            <input ref={passwordRef} placeholder="Пароль"></input><br></br>
            <button onClick={loginHandler}>Войти</button>
        </>)}
    </>);
}

export default AdminMenu;