import { useRef } from "react";

export type Form = {
    id: number,
    name: string,
    building: string,
    class: string,
    pcNumber: string,
    description: string,
    completed: boolean
}

function UserMenu() {
    const nameRef = useRef<HTMLInputElement>(null);
    const buildingRef = useRef<HTMLInputElement>(null);
    const classRef = useRef<HTMLInputElement>(null);
    const pcNumberRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null); // Изменяем тип на HTMLTextAreaElement

    function addNewProblem() {
        if (nameRef.current?.value && buildingRef.current?.value && classRef.current?.value && pcNumberRef.current?.value && descriptionRef.current?.value) {
            if (localStorage.getItem('problem') === null) {
                let i = 1;
                let Problems: Form[] = [];
                let problem: Form = {
                    id: i,
                    name: nameRef.current.value,
                    building: buildingRef.current.value,
                    class: classRef.current.value,
                    pcNumber: pcNumberRef.current.value,
                    description: descriptionRef.current.value,
                    completed: false
                }
                Problems.push(problem);
                localStorage.setItem('problem', JSON.stringify(Problems));

            } else {
                let ad1 = localStorage.getItem('problem')!;
                let Problems: Form[] = JSON.parse(ad1);
                let i = Problems.length + 1;
                let problem: Form = {
                    id: i,
                    name: nameRef.current.value,
                    building: buildingRef.current.value,
                    class: classRef.current.value,
                    pcNumber: pcNumberRef.current.value,
                    description: descriptionRef.current.value,
                    completed: false
                }
                Problems.push(problem);
                localStorage.removeItem('problem');
                localStorage.setItem('problem', JSON.stringify(Problems));
            }
            nameRef.current.value = '';
            buildingRef.current.value = '';
            classRef.current.value = '';
            pcNumberRef.current.value = '';
            descriptionRef.current.value = '';
            alert('Ваша проблема успешно отправлена, скоро она будет решена!')
        } else {
            alert('Заполните все поля!')
        }
    }

    return (
        <>
            <h1>Если у вас есть какая-либо проблема с работой ПК, оставьте её здесь и она будет решена</h1>
            <input ref={nameRef} placeholder="Ваше ФИО" /><br />
            <input ref={buildingRef} placeholder="Корпус" /><br />
            <input ref={classRef} placeholder="Аудитория" /><br />
            <input ref={pcNumberRef} placeholder="Номер ПК" /><br />
            <textarea ref={descriptionRef} placeholder="Описание проблемы"></textarea><br />
            <button onClick={addNewProblem}>Отправить!</button>
        </>
    );
}

export default UserMenu;