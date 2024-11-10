"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../app/styles.css';

const HomePage = () => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('score');
    const savedCorrectAnswers = localStorage.getItem('correctAnswers');
    const savedTotalQuestions = localStorage.getItem('totalQuestions');

    if (savedScore) setScore(parseInt(savedScore, 10));
    if (savedCorrectAnswers) setCorrectAnswers(parseInt(savedCorrectAnswers, 10));
    if (savedTotalQuestions) setTotalQuestions(parseInt(savedTotalQuestions, 10));
  }, []);

  const resetScore = () => {
    localStorage.setItem('score', 0);
    localStorage.setItem('correctAnswers', 0);
    localStorage.setItem('totalQuestions', 0);
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
  };

  const feedbackMessage = () => {
    if (totalQuestions === 0) {
      return "Începe un quiz pentru a primi feedback!";
    }
    const percentage = (correctAnswers / totalQuestions) * 100;
    if (percentage >= 80) {
      return "Felicitări! Ești un adevărat expert!";
    } else if (percentage >= 50) {
      return "Bună treabă! Mai poți îmbunătăți!";
    } else {
      return "Mai este loc de îmbunătățiri. Nu te descuraja!";
    }
  };

  return (
    <div className='divHome'>
      <h1 className='h1Home'>Quiz App</h1>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link href="/quiz/science">Quiz Știință</Link>
        <Link href="/quiz/general-knowledge">Quiz Cultură Generală</Link>
        <Link href="/quiz/history">Quiz Istorie</Link>
      </nav>
        <h2>Scorul tău: {score} puncte</h2>
      <button onClick={resetScore} className='resetButton'>Resetează Scorul</button>
      <div className="InfoQ"> 
        <h3>Total Întrebări: {totalQuestions}</h3>
        <h3>Răspunsuri Corecte: {correctAnswers}</h3>
        <p>{feedbackMessage()}</p>
      </div> 
    </div>
  );
};

export default HomePage;
