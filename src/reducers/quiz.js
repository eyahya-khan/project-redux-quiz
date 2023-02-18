import { createSlice } from '@reduxjs/toolkit'
import ElephantButt from '../components/assets/elephant_butt.png'
import TigerButt from '../components/assets/tiger_butt.png'
import FoxButt from '../components/assets/fox_butt.png'
import LionButt from '../components/assets/lion_butt.png'
import TurtleButt from '../components/assets/turtle_butt.png'
import HippoButt from '../components/assets/hippo_butt.png'
import elephantImg from '../components/assets/elephant.png'
import tigerImg from '../components/assets/tiger.png'
import foxImg from '../components/assets/fox.png'
import lionImg from '../components/assets/lion.png'
import turtleImg from '../components/assets/turtle.png'
import hippoImg from '../components/assets/hippo.png'

const questions = [
	{
		id: 1,
		options: ['Hippo', 'Elephant', 'Seal', 'Rhino'],
		correctAnswerIndex: 1,
		img_alt: 'elephant',
		img: ElephantButt,
		sticker: elephantImg,
	},
	{
		id: 2,
		options: ['Tiger', 'Zebra', 'Hyena', 'Cheetah'],
		correctAnswerIndex: 0,
		img: TigerButt,
		img_alt: 'Tiger',
		sticker: tigerImg,
	},
	{
		id: 3,
		options: ['Wolf', 'Hyena', 'Coyote', 'Fox'],
		correctAnswerIndex: 3,
		img: FoxButt,
		img_alt: 'Fox',
		sticker: foxImg,
	},
	{
		id: 4,
		options: ['Puma', 'Jaguar', 'Lion', 'Tiger'],
		correctAnswerIndex: 2,
		img: LionButt,
		img_alt: 'Lion',
		sticker: lionImg,
	},
	{
		id: 5,
		options: ['Turtle', 'Snake', 'Crocodile', 'Lizard'],
		correctAnswerIndex: 0,
		img: TurtleButt,
		img_alt: 'Turtle',
		sticker: turtleImg,
	},
	{
		id: 6,
		options: ['Bear', 'elephant', 'Mamut', 'Hippo'],
		correctAnswerIndex: 3,
		img: HippoButt,
		img_alt: 'Hippo',
		sticker: hippoImg,
	},
]

const initialState = {
	questions,
	answers: [],
	currentQuestionIndex: 0,
	quizOver: false,
	score: 0,
	start: false,
}

export const quiz = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		/**
		 * Use this action when a user selects an answer to the question.
		 * The answer will be stored in the `quiz.answers` state with the
		 * following values:
		 *
		 *    questionId  - The id of the question being answered.
		 *    answerIndex - The index of the selected answer from the question's options.
		 *    question    - A copy of the entire question object, to make it easier to show
		 *                  details about the question in your UI.
		 *    answer      - The answer string.
		 *    isCorrect   - true/false if the answer was the one which the question says is correct.
		 *
		 * When dispatching this action, you should pass an object as the payload with `questionId`
		 * and `answerIndex` keys. See the readme for more details.
		 */

		startGame: (state) => {
			state.start = true
		},

		submitAnswer: (state, action) => {
			const { questionId, answerIndex } = action.payload

			const question = state.questions.find((q) => q.id === questionId)

			if (!question) {
				throw new Error(
					'Could not find question! Check to make sure you are passing the question id correctly.'
				)
			}

			if (question.options[answerIndex] === undefined) {
				throw new Error(
					`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
				)
			}

			// Score counter
			if (question.correctAnswerIndex === answerIndex) {
				state.score = state.score + 2
			} else {
				state.score--
			}

			state.answers.push({
				questionId,
				answerIndex,
				question,
				answer: question.options[answerIndex],
				isCorrect: question.correctAnswerIndex === answerIndex,
			})
		},

		/**
		 * Use this action to progress the quiz to the next question. If there's
		 * no more questions (the user was on the final question), set `quizOver`
		 * to `true`.
		 *
		 * This action does not require a payload.
		 */
		goToNextQuestion: (state) => {
			if (state.currentQuestionIndex + 1 === state.questions.length) {
				state.quizOver = true
			} else {
				state.currentQuestionIndex += 1
				state.nextQuestion = false
			}
		},

		/**
		 * Use this action to reset the state to the initial state the page had
		 * when it was loaded. Who doesn't like re-doing a quiz when you know the
		 * answers?!
		 *
		 * This action does not require a payload.
		 */
		restart: (state) => {
			return initialState
		},
	},
})