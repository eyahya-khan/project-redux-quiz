import React from 'react'
import { useSelector } from 'react-redux'
import QuestionPage from './questionPage'
import QuizOver from './quizOver'

export const CurrentQuestion = () => {
	const gameOver = useSelector((state) => state.quiz.quizOver)
	const question = useSelector(
		(state) => state.quiz.questions[state.quiz.currentQuestionIndex]
	)


	if (!question) {
		return <h1>Oh no! I could not find the current question!</h1>
	}

	return  <main>{!gameOver ? <QuestionPage /> : <QuizOver />}</main>

}