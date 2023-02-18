import React from 'react'
import {quiz} from 'reducers/quiz'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { Footer } from './Footer'

const Home=()=> {
    const dispatch = useDispatch()
    const start = useSelector((state)=>state.quiz.start)
    const onStartButtonclick = () =>{
        dispatch(quiz.actions.startGame())
    }
  return (
    <>
    {!start ? (
				<div className='welcome-container'>
					<main className='start'>
						<h1>Guess Whose Butt</h1>
						<section className='question-section start'>
							<div className='question-container welcome-wrapper '>
								<h2>Let’s see if you know your animal butts!</h2>
								<h3 className='welcome-text'>How to play?</h3>
								<p>Correct butt: +2 points </p>
								<p>Incorrect butt: -1 point </p>
							</div>
							<Button onClick={onStartButtonclick}> Let's play! </Button>
						</section>
					</main>
					<Footer />
				</div>
			) : (
				<CurrentQuestion />
			)}
    </>
  )
}

export default Home