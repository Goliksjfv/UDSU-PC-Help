import { useRef, useState } from "react";
import { Form } from "../UserMenu/UserMenu";

function AdminMenu({ adminAuthCb }: any) {
    const [isAuth, setIsAuth] = useState(false);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function auth(login: string, password: string) {
        return login === 'admin' && password === 'admin';
    }

    let Problems: Form[] = [];

    if (localStorage.getItem('problem') != null) {
        let ad1 = localStorage.getItem('problem')!;
        Problems = JSON.parse(ad1);
    }

    
    

    function loginHandler() {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            const authStatus = auth(login, password);
            setIsAuth(authStatus);
            if (!authStatus) {
                /*let ad=localStorage.getItem('problem1');
                if(typeof ad === 'string'){
                    let mas:Form = JSON.parse(ad);
                    console.log(1,mas);
                }
                let ad1=localStorage.getItem('problem4');
                if(typeof ad1 === 'string'){
                    let mas1:Form = JSON.parse(ad1);
                    console.log(4,mas1);
                }
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
                    //console.log(i,mas1);
                    i++;
                }
                //console.log(typeof Problems)
                */
               alert('Неправильный логин или пароль!')
            }

        }

    }

    function logoutHandler() {
        setIsAuth(false);
    }

    let showProblems = Problems.map(function (item) {
        return <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.building}</td>
            <td>{item.class}</td>
            <td>{item.pcNumber}</td>
            <td>{item.description}</td>
            <td><input type="checkbox"></input></td>
        </tr>
    });

    return (<>
        {isAuth ? (<>
            <button onClick={logoutHandler}>Выйти</button>
            <h1>Текущие задачи</h1><br></br><br></br>
            <table>
                <thead>
                    <tr>
                        <td>Номер проблемы</td>
                        <td>ФИО</td>
                        <td>Корпус</td>
                        <td>Аудитория</td>
                        <td>Номер ПК</td>
                        <td>Описание проблемы</td>
                        <td>Выполнено</td>
                    </tr>
                </thead>
                <tbody>
                    {showProblems}
                </tbody>
            </table>

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