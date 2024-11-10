"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizQuestion from '../../components/QuizQuestion';

const ScienceQuiz = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: ''
  });
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        const savedQuestions = JSON.parse(localStorage.getItem('customQuestions')) || [];
        setQuestionsData([...data.Stiinta, ...savedQuestions]);
      } catch (error) {
        console.error('Eroare la încărcarea întrebărilor:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  const handleOptionChange = (option) => {
    const updatedAnswers = [...selectedAnswers];
    if (!updatedAnswers[currentQuestionIndex]) {
      updatedAnswers[currentQuestionIndex] = [];
    }
    if (updatedAnswers[currentQuestionIndex].includes(option)) {
      updatedAnswers[currentQuestionIndex] = updatedAnswers[currentQuestionIndex].filter((opt) => opt !== option);
    } else {
      updatedAnswers[currentQuestionIndex].push(option);
    }
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const selected = selectedAnswers[currentQuestionIndex] || [];
    const correct = questionsData[currentQuestionIndex]?.correct;
  
    const totalQuestions = parseInt(localStorage.getItem('totalQuestions')) || 0;
    localStorage.setItem('totalQuestions', totalQuestions + 1);
  
    let newScore = score;
  
    if (Array.isArray(correct)) {
      if (JSON.stringify(selected.sort()) === JSON.stringify(correct.sort())) {
        newScore += 10;
        setIsCorrect(true);
  
        const correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;
        localStorage.setItem('correctAnswers', correctAnswers + 1);
      } else {
        setIsCorrect(false);
      }
    } else {
      if (selected.includes(correct)) {
        newScore += 10;
        setIsCorrect(true);
  
        const correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;
        localStorage.setItem('correctAnswers', correctAnswers + 1);
      } else {
        setIsCorrect(false);
      }
    }
  
    setScore(newScore);  
    localStorage.setItem('score', newScore); 
  
    setShowResult(true);  
  };
  
  

  const handleNextQuestion = () => {
    setShowResult(false);
    setIsCorrect(false);

    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert('Ai terminat quiz-ul!');
      router.push('/');
    }
  };

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    if (name === 'question') {
      setNewQuestion((prev) => ({ ...prev, question: value }));
    } else if (name.startsWith('option')) {
      const index = parseInt(name.split('option')[1], 10) - 1;
      const newOptions = [...newQuestion.options];
      newOptions[index] = value;
      setNewQuestion((prev) => ({ ...prev, options: newOptions }));
    } else if (name === 'correct') {
      setNewQuestion((prev) => ({ ...prev, correct: value }));
    }
  };

  const handleAddQuestion = () => {
    const updatedQuestions = [...questionsData, newQuestion];

    const savedQuestions = JSON.parse(localStorage.getItem('customQuestions')) || [];
    savedQuestions.push(newQuestion);
    localStorage.setItem('customQuestions', JSON.stringify(savedQuestions));

    setQuestionsData(updatedQuestions);

    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correct: ''
    });
  };

  if (!questionsData.length) {
    return <p>Încărcăm întrebările...</p>;
  }

  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <div>
      <h1>Quiz de Știință</h1>
      {currentQuestion ? (
        <QuizQuestion
          question={currentQuestion}
          selectedOptions={selectedAnswers[currentQuestionIndex] || []}
          onOptionChange={handleOptionChange}
          showResult={showResult}
          isCorrect={isCorrect}
          correctAnswer={currentQuestion.correct}
          onNextQuestion={handleNextQuestion}
        />
      ) : (
        <p>Întrebările nu sunt disponibile.</p>
      )}
      <div className="scorSiVerificare">
        {!showResult && <button onClick={handleSubmit}>Verifică răspunsul</button>}
        <h2 className="scorulTau">Scorul tău: {score}</h2>
      </div>

      {}
      <div>
        <h2 className='newque'>Adaugă o întrebare nouă</h2>
        <form className='formi' onSubmit={handleAddQuestion}>
          <input
            type="text"
            name="question"
            placeholder="Întrebare"
            value={newQuestion.question}
            onChange={handleNewQuestionChange}
            required
          />
          <input
            type="text"
            name="option1"
            placeholder="Varianta 1"
            value={newQuestion.options[0]}
            onChange={handleNewQuestionChange}
            required
          />
          <input
            type="text"
            name="option2"
            placeholder="Varianta 2"
            value={newQuestion.options[1]}
            onChange={handleNewQuestionChange}
            required
          />
          <input
            type="text"
            name="option3"
            placeholder="Varianta 3"
            value={newQuestion.options[2]}
            onChange={handleNewQuestionChange}
            required
          />
          <input
            type="text"
            name="option4"
            placeholder="Varianta 4"
            value={newQuestion.options[3]}
            onChange={handleNewQuestionChange}
            required
          />
          <input
            type="text"
            name="correct"
            placeholder="Răspuns corect"
            value={newQuestion.correct}
            onChange={handleNewQuestionChange}
            required
          />
          <button type="submit">Adaugă Întrebarea</button>
        </form>
      </div>
    </div>
  );
};

export default ScienceQuiz;
