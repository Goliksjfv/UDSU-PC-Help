import React, { useState } from 'react';

const UserMenu: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState('');
  const [pcNumber, setPcNumber] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const handleSubmit = async () => {
    const data = {
      fullName,
      building,
      room,
      pcNumber,
      problemDescription,
    };

    try {
      const response = await fetch('http://localhost:3001/update-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Данные успешно отправлены');
      } else {
        alert('Ошибка при отправке данных');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка при отправке данных');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="ФИО"
      />
      <br />
      <input
        type="text"
        value={building}
        onChange={(e) => setBuilding(e.target.value)}
        placeholder="Корпус"
      />
      <br />
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Аудитория"
      />
      <br />
      <input
        type="text"
        value={pcNumber}
        onChange={(e) => setPcNumber(e.target.value)}
        placeholder="Номер ПК"
      />
      <br />
      <textarea
        value={problemDescription}
        onChange={(e) => setProblemDescription(e.target.value)}
        placeholder="Описание проблемы"
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
};

export default UserMenu;
