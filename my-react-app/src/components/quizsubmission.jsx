import React, { useState } from 'react';
import '../css/quizzesComponent.css';
import MiniLeaderboard from '../components/MiniLeaderboard';

const QuizSubmission = () => {
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [username, setUsername] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      id: 1,
      category: "Geography",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
    },
    {
      id: 2,
      category: "Astronomy",
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
    },
    {
      id: 3,
      category: "History",
      question: "Who was the first President of the United States?",
      options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
    },
    {
      id: 4,
      category: "Sports",
      question: "How many players are there in a soccer team?",
      options: ["9", "10", "11", "12"],
    },
    {
      id: 5,
      category: "Movies",
      question: "Who directed the movie 'Inception'?",
      options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"],
    },
  ];

  const correctAnswers = {
    1: "Paris",
    2: "Mars",
    3: "George Washington",
    4: "11",
    5: "Christopher Nolan",
  };

  const handleAnswerChange = (e) => {
    const selectedOption = e.target.value;
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      selectedAnswer: selectedOption,
    };
    setAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    answers.forEach((answer) => {
      if (correctAnswers[answer.questionId] === answer.selectedAnswer) {
        correctCount++;
      }
    });
    const finalScore = correctCount / questions.length;
    setScore(finalScore);
    setIsComplete(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (username.trim()) {
              setUsername(username.trim());
              setQuizStarted(true);
            }
          }}
        >
          <h3 className="quiz-title">Enter Your Username</h3>
          <div className="center-quiz-username">
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
              disabled={!username.trim()}
            >
              Start Quiz
            </button>
          </div>
        </form>
      ) : !isComplete ? (
        <form onSubmit={handleSubmit}>
          <h3 className="quiz-title">General Knowledge Quiz</h3>
          <div>
            <p className="quiz-category">Category: {currentQuestion.category}</p>
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
                    checked={
                      answers[currentQuestionIndex]?.selectedAnswer === option
                    }
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
            You got {answers.filter((answer) => correctAnswers[answer.questionId] === answer.selectedAnswer).length} out of {questions.length} correct
          </p>
          <button onClick={() => setShowResults(true)} className="quiz-submit-button">
            See Results
          </button>
          <div className="leaderboard-quiz-results">
            <MiniLeaderboard />
          </div>
        </div>
      ) : (
        <div className="quiz-detailed-results">
          <h2>Detailed Results</h2>
          <p>Your score: {score}</p>
          {questions.map((q) => {
            const userAnswer = answers.find((a) => a.questionId === q.id)?.selectedAnswer;
            const isCorrect = correctAnswers[q.id] === userAnswer;
            return (
              <div key={q.id}>
                <h3>{q.question}</h3>
                <p>Category: {q.category}</p>
                <p>Your answer: {userAnswer || "No answer provided"}</p>
                <p>Correct answer: {correctAnswers[q.id]}</p>
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