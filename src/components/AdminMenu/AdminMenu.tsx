import React, { useRef, useState, useEffect } from 'react';
import ExcelJS from 'exceljs';

function AdminMenu({ adminAuthCb }: any) {
  const [isAuth, setIsAuth] = useState(false);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [problems, setProblems] = useState<any[]>([]);

  function auth(login: string, password: string) {
    return login === 'admin' && password === 'admin';
  }

  function loginHandler() {
    if (loginRef.current && passwordRef.current) {
      const login = loginRef.current.value;
      const password = passwordRef.current.value;
      const authStatus = auth(login, password);
      setIsAuth(authStatus);
      if (authStatus) {
        loadProblems();
      }
    }
  }

  function logoutHandler() {
    setIsAuth(false);
    setProblems([]);
  }

  const loadProblems = async () => {
    const file = '/Problems.xlsx'; // обновленный путь к файлу в папке public
    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.getWorksheet(1);

    if (worksheet) {
      const loadedProblems: any[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) { // пропускаем заголовок
          const rowValues = row.values as any[];
          if (rowValues && Array.isArray(rowValues)) {
            const [fullName, building, room, pcNumber, problemDescription] = rowValues.slice(1);
            loadedProblems.push({ fullName, building, room, pcNumber, problemDescription });
          }
        }
      });
      setProblems(loadedProblems);
    } else {
      console.error('Worksheet not found');
    }
  };

  return (
    <>
      {isAuth ? (
        <>
          <button onClick={logoutHandler}>Выйти</button>
          <table>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Корпус</th>
                <th>Аудитория</th>
                <th>Номер ПК</th>
                <th>Описание проблемы</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr key={index}>
                  <td>{problem.fullName}</td>
                  <td>{problem.building}</td>
                  <td>{problem.room}</td>
                  <td>{problem.pcNumber}</td>
                  <td>{problem.problemDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <button onClick={adminAuthCb}>Назад в меню пользователя</button><br />
          <input ref={loginRef} placeholder="Логин" /><br />
          <input ref={passwordRef} placeholder="Пароль" type="password" /><br />
          <button onClick={loginHandler}>Войти</button>
        </>
      )}
    </>
  );
}

export default AdminMenu;
