import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 

const About = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email 
    
    const handleGoBack = () =>{
        navigate('/urlTable', {state: {email}})
    }
    return(
        <div>
            <h2>Алгоритм Url-shortener</h2>
            <p>Ось опис, як працює алгоритм:</p>
            <ol>
                <p>Крок 1: Перейдіть на сторінку авторизації.</p>
                <p>Крок 2: Перевірка на дублікат URL</p>
                <p>Крок 3: Генерація унікального короткого URL</p>
                <p>Крок 4: Збереження у базі даних</p>
                <p>Крок 5: Виведення короткої URL</p>
                <p>Крок 6: Перенаправлення за коротким URL (перевірка його в базі даних та знаходження оригінального URL)</p>
            </ol>
            <button onClick={handleGoBack}>Back to URL Table</button>
        </div>
    );    
}
export default About