import { useRef, useState } from "react";
import { Form } from "../UserMenu/UserMenu";

function AdminMenu({adminAuthCb}:any) {
    const [isAuth, setIsAuth] = useState(false);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function auth(login: string, password: string) {
        return login === 'admin' && password === 'admin';
    }

    let Problems:Form[]=[];

    function loginHandler() {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            const authStatus=auth(login, password);
            setIsAuth(authStatus);
            if(authStatus){
                /*let ad=localStorage.getItem('problem1');
                if(typeof ad === 'string'){
                    let mas:Form = JSON.parse(ad);
                    console.log(1,mas);
                }
                let ad1=localStorage.getItem('problem4');
                if(typeof ad1 === 'string'){
                    let mas1:Form = JSON.parse(ad1);
                    console.log(4,mas1);
                }*/
                let i = 1;
                let ad1:any;
                let mas1:Form;
                while (true) {
                    if (localStorage.getItem('problem' + i.toString()) === null) {

                        break;
                    }
                    ad1=localStorage.getItem('problem' + i.toString());
                    mas1 = JSON.parse(ad1);
                    Problems.push(mas1);
                    console.log(i,mas1);
                    i++;
                }
                console.log(Problems[1].id)

            }

        }
        
    }

    function logoutHandler() {
        setIsAuth(false);
    }
    
    let showProblems = Problems.map(function(item) {
        return <p key={item.id}>
           <span>{item.name}</span>
           <span>{item.building}</span>
           <span>{item.class}</span>
           <span>{item.pcNumber}</span>
           <span>{item.description}</span>
        </p>;
     });

    return (<>
        {isAuth ? (<>
            <button onClick={logoutHandler}>Выйти</button>
            <h1>Текущие задачи</h1><br></br><br></br>
            {Problems}
            {showProblems}
            <h1>Решённые задачи</h1>
        </>) : (<>
            <button onClick={adminAuthCb}>Назад в меню пользователя</button><br></br>
            <input ref={loginRef} placeholder="Логин"></input><br></br>
            <input ref={passwordRef} placeholder="Пароль"></input><br></br>
            <button onClick={loginHandler}>Войти</button>
        </>)}
    </>);
}

export default AdminMenu;