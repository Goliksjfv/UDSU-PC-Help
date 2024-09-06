import { useRef, useState, useReducer } from "react";
import { Form } from "../UserMenu/UserMenu";

function AdminMenu({ adminAuthCb }: any) {
    const [isAuth, setIsAuth] = useState(false);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

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
                alert('Неправильный логин или пароль!')
            }

        }

    }

    function logoutHandler() {
        setIsAuth(false);
    }

    const checkboxHandler=(id:any)=>(event:any)=>{
        console.log(id);
        Problems[id-1].completed=!Problems[id-1].completed;
        localStorage.removeItem('problem');
        localStorage.setItem('problem', JSON.stringify(Problems));
        console.log(Problems[id-1].completed);
        forceUpdate();
    }

    let showCurrentProblems = Problems.map(function (item) {
        if(item.completed===false){
            return <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.building}</td>
            <td>{item.class}</td>
            <td>{item.pcNumber}</td>
            <td>{item.description}</td>
            <td><input type="checkbox" checked={item.completed} onChange={checkboxHandler(item.id)}></input></td>
        </tr>}
    });

    let showResolvedProblems = Problems.map(function (item) {
        if(item.completed===true){
            return <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.building}</td>
            <td>{item.class}</td>
            <td>{item.pcNumber}</td>
            <td>{item.description}</td>
            <td><input type="checkbox" checked={item.completed} onChange={checkboxHandler(item.id)}></input></td>
        </tr>}
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
                    {showCurrentProblems}
                </tbody>
            </table>

            <h1>Решённые задачи</h1>
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
                    {showResolvedProblems}
                </tbody>
            </table>
        </>) : (<>
            <button onClick={adminAuthCb}>Назад в меню пользователя</button><br></br>
            <input ref={loginRef} placeholder="Логин"></input><br></br>
            <input ref={passwordRef} placeholder="Пароль"></input><br></br>
            <button onClick={loginHandler}>Войти</button>
        </>)}
    </>);
}

export default AdminMenu;