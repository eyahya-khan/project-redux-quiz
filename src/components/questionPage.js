import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from 'reducers/quiz';
import styled, { keyframes } from 'styled-components';
import './ProgressBar.css';
import Button from './Button';
import { Footer } from './Footer';

const Counter = styled.span`
  background: #000;
  width: 70px;
  height: 50px;
  border-radius: 10px;
  color: #fef8d8;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  top: 10px;
  left: 10px;
  animation: ${(props) => props.animation} 2s ease-in-out;
  @media (min-width: 800px) {
    top: 20px;
    left: 20px;
  }
`;

const QuestionPage = () => {
  const dispatch = useDispatch();

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  //   eslint-disable-next-line max-len
  const answer = useSelector((state) => state.quiz.answers.find((a) => a.questionId === question.id));

  const answerArray = useSelector((state) => state.quiz.answers);

  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );

  const score = useSelector((state) => state.quiz.score);

  const displayNextQuestion = () => {
    dispatch(quiz.actions.goToNextQuestion());
  };
  const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({ questionId: id, answerIndex: index }));
    setTimeout(displayNextQuestion, 2000);
  };

  const changeColorBtn = (indexOption) => {
    if (!answer) {
      return '#000';
    } else {
      if (question.correctAnswerIndex === indexOption) {
        return '#6DD627';
      }
      return '#FF6242';
    }
  };

  const scoreAnimation = () => {
    if (answerArray.length === currentQuestionIndex) {
      return '';
    }
    if (answerArray[currentQuestionIndex].isCorrect) {
      return keyframes`
                           25% {
                       font-size: 40px;
                       background:#01785D ;
                      }
                      50% {
                       background: black;
                       font-size: 20px;
                   }
                `;
    } else {
      return keyframes`
                25% {
                  font-size: 40px;
                  background:#E76158 ;
                }
                60% {
                  background: black;
                  font-size: 20px;
                `;
    }
  }

  const correctAnswerAnimation = (correctIndex) => {
    if (!answer) {
      return null;
    } else {
      if (question.correctAnswerIndex === correctIndex) {
        return keyframes`
        0% {
          transform: scale(1);
        }
        30% {
          transform: scale(1.35);
        }
        45% {
          transform: scale(1.35) rotate(5deg);
        }
        60% {
          transform: scale(1.35) rotate(-5deg);
        }
        70% {
          transform: scale(1.35) rotate(2deg);
        }
        80% {
          transform: scale(1.35) rotate(-5deg);
        }
        95% {
          transform: scale(1.35) rotate(-2deg);
        }
        100% {
          transform: scale(1);
        }
        `;
      }
      return null;
    }
  };

  const cursorStyle = () => {
    if (!answer) {
      return 'pointer';
    }
    return 'not-allowed';
  };

  return (
    <>
      <h1>Guess Whose Butt</h1>
      {/* ADD PROGRESS BAR */}
      {/* <p>Question {question.id} /6</p> */}
      <div className="progress-wrapper">
        <div className="chart">
          <div
            className="bar"
            style={{ width: `${(question.id / 6) * 100}%` }} />
        </div>
        <div className="num">{question.id}/6</div>
      </div>
      {/* Or use {currentQuestionIndex + 1} */}
      {/* *************** */}
      <div className="container">
        <section className="question-section">
          <img
            className="question-img"
            src={question.img}
            alt={question.img_alt} />
          <div className="answer-btn-container">
            {question.options.map((item, index) => (
              <Button
                disabled={answer}
                type="submit"
                onClick={() => onAnswerSubmit(question.id, index)}
                key={item}
                border={changeColorBtn(index)}
                animation={correctAnswerAnimation(index)}
                cursor={cursorStyle}>
                {item}
              </Button>
            ))}
          </div>
          <Counter animation={scoreAnimation()}>
            <span role="img" aria-label="star emoji">
              ⭐️
            </span>{' '}
            {score}
          </Counter>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default QuestionPage;
