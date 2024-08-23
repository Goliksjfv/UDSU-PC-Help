import { useRef } from "react";

export type Form = {
    name: string,
    building: string,
    class: string,
    pcNumber: string,
    description: string,
}

function UserMenu() {
    const nameRef = useRef<HTMLInputElement>(null);
    const buildingRef = useRef<HTMLInputElement>(null);
    const classRef = useRef<HTMLInputElement>(null);
    const pcNumberRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    function addNewProblem() {
        if (nameRef.current && buildingRef.current && classRef.current && pcNumberRef.current && descriptionRef.current) {
            let problem: Form = {
                name: nameRef.current.value,
                building: buildingRef.current.value,
                class: classRef.current.value,
                pcNumber: pcNumberRef.current.value,
                description: descriptionRef.current.value,
            }
            let i = 7;
            while (true) {
                if (localStorage.getItem('problem' + i.toString()) === null) {
                    localStorage.setItem('problem' + i.toString(), JSON.stringify(problem));
                    
                    return;
                }
                i++;
            }
        }
    }

    return (<>
        <input ref={nameRef} placeholder="Ваше ФИО" ></input><br></br>
        <input ref={buildingRef} placeholder="Корпус"></input><br></br>
        <input ref={classRef} placeholder="Аудитория"></input><br></br>
        <input ref={pcNumberRef} placeholder="Номер ПК"></input><br></br>
        <input ref={descriptionRef} placeholder="Описание проблемы"></input><br></br>
        <button onClick={addNewProblem}>Отправить!</button>
    </>);
}
export default UserMenu;