import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from 'reducers/quiz';
import correctSticker from './assets/checkmark.png';
import inCorrectSticker from './assets/cross.png';
import Button from './Button';
import { Footer } from './Footer';

const QuizOver = () => {
  const dispatch = useDispatch();
  const selectedAnswer = useSelector((state) => state.quiz.answers);
  const correctAnwser = selectedAnswer.filter((answer) => answer.isCorrect);

  const onRestartClick = () => {
    dispatch(quiz.actions.restart());
  };

  return (
    <>
      <h1>Guess Whose Butt</h1>
      <div className="container">
        <section className="question-section quiz-section">
          <h2 className="summary-text">
            {correctAnwser.length <= 3
              ? 'Oh sorry, look at more butts and try again'
              : (correctAnwser.length === 4 || correctAnwser.length === 5
                ? 'Nice try! You did good. But if you see a butt, check it out'
                : 'Congratulations! You really know your butts')}
          </h2>
          <div className="summary-container">
            {selectedAnswer.map((item) => (
              <div id={item}>
                <img
                  className="sticker"
                  src={item.question.sticker}
                  alt={item.img_alt} />
                <img
                  className="check-mark"
                  src={item.isCorrect ? correctSticker : inCorrectSticker}
                  alt="" />
              </div>
            ))}
          </div>

          <Button onClick={onRestartClick}>Play again</Button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default QuizOver;
