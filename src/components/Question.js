import React from 'react'
import Answer from './Answer'
// import {nanoid} from 'nanoid'

function Question(props) {
    const {
      question,
      quizzEnd,
      handleClick} = props

    const displayAnswers = question.allAnswers.map(answer => <Answer 
    key={answer.id}
    answer={answer}
    question={question}
    quizzEnd={quizzEnd}
    handleClick={handleClick} />)

  return (
    <div className='questionList'>
        <div className='question'>{question.question}</div>
        <div className='answers'>{displayAnswers}</div>
    </div>
  )
}

export default Question