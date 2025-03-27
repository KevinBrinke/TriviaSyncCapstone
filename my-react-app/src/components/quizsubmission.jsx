import React, { useState } from 'react';
import '../css/quizzesComponent.css';
import MiniLeaderboard from '../components/MiniLeaderboard';

const QuizSubmission = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [username, setUsername] = useState('');
  const [quizStarted, setQuizStarted] = useState(false); 

  // Hardcoded questions
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars"
    },
    {
      id: 3,
      question: "Who was the first President of the United States?",
      options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
      correctAnswer: "George Washington"
    },
    {
      id: 4,
      question: "How many players are there in a soccer team?",
      options: ["9", "10", "11", "12"],
      correctAnswer: "11"
    },
    {
      id: 5,
      question: "Who directed the movie 'Inception'?",
      options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"],
      correctAnswer: "Christopher Nolan"
    }
  ];

  // Handle answer selection
  const handleAnswerChange = (e) => {
    const selectedOption = e.target.value;
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: selectedOption
    }));
  };

  // Handle submission of current question
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      questions.forEach((question) => {
        const userAnswer = answers[question.id];
        if (userAnswer === question.correctAnswer) {
          correctCount++;
        }
      });
      const finalScore = (correctCount / questions.length) ;
      setScore(finalScore);
      setIsComplete(true);
    }
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (username.trim()) {
              setUsername(username.trim()); // Remove leading/trailing spaces
              setQuizStarted(true); // Start the quiz
            }
          }}
        >
          <h3 className="quiz-title">Enter Your Username</h3>
          <div className='center-quiz-username'>
          <input
            type="text"
            className="username-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button
            type="submit"
            className="quiz-submit-button"
            disabled={!username.trim()} // Disable if username is empty or only spaces
          >
            Start Quiz
          </button></div>
        </form>
      ) : !isComplete ? (
        <form onSubmit={handleSubmit}>
          <h3 className="quiz-title">General Knowledge Quiz</h3>
          <div>
            <p className="quiz-question">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="quiz-question">{currentQuestion.question}</p>
            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="quiz-option">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={handleAnswerChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
            <button type="submit" className="quiz-submit-button">
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </form>
        
      ) : !showResults ? (
        <div className="quiz-results">
          <h2>Quiz Complete!</h2>
          <p>Your score: {score}</p>
          <p>
            You got {questions.filter(q => answers[q.id] === q.correctAnswer).length} out of {questions.length} correct
          </p>
          <button onClick={() => setShowResults(true)} className="quiz-submit-button">
            See Results
          </button>
          <div className='leaderboard-quiz-results'>
          <MiniLeaderboard/>
          </div>
        </div>
      ) : (
        <div className="quiz-detailed-results">
          <h2>Detailed Results</h2>
          <p>Your score: {score}</p>
          {questions.map((q) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={q.id}>
                <h3>{q.question}</h3>
                <p>Your answer: {userAnswer || "No answer provided"}</p>
                <p>Correct answer: {q.correctAnswer}</p>
                <p>{isCorrect ? "✓ Correct" : "✗ Incorrect"}</p>
                <hr />
                

              </div>
              
            );
          })}
        </div>
        
      )}
            

    </div>
  );
};

export default QuizSubmission;