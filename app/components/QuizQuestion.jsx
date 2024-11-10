import React from 'react';
import '../styles.css';

const QuizQuestion = ({ 
  question, 
  selectedOptions, 
  onOptionChange, 
  showResult, 
  isCorrect, 
  correctAnswer, 
  onNextQuestion 
}) => {
  return (
    <div className="quiz-question">
      <h2>{question.question}</h2>
      <ul className="quiz-options">
        {question.options.map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => onOptionChange(option)}
              disabled={showResult} 
            />
            <label>{option}</label>
          </li>
        ))}
      </ul>

      {}
      {showResult && (
        <div className="result-message">
          {isCorrect ? (
            <p>Corect!</p>
          ) : (
            <p>Greșit! Răspunsul corect este: {correctAnswer}</p>
          )}
          <button onClick={onNextQuestion}>Următoarea Întrebare</button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
 