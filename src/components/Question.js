import React from 'react'
import Answer from './Answer'
// import {nanoid} from 'nanoid'

function Question(props) {
    const {id, 
      question, 
      answers, 
      goodAnswer, 
      handleClick} = props

    const displayAnswers = answers.map(answer => <Answer 
    key={answer.id}
    answer={answer.answer}
    goodAnswer={goodAnswer}
    isSelected={answer.isSelected}
    handleClick={() => handleClick(id, answer.id)} />)
  return (
    <div>
        <div className='question'>{question}</div>
        <div className='answers'>{displayAnswers}</div>
    </div>
  )
}

export default Question