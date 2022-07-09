import React from 'react'

function Answer(props) {
  const {
    answer,
    question,
    quizzEnd,
    handleClick
  } = props

  let classAnswer = ''

  if (quizzEnd) {

    classAnswer = answer.isSelected && question.correct ? 'answer ansCorSel' : answer.isSelected && !question.correct ? 'answer ansIncSel' : answer.answer === question.goodAnswer ? 'answer ansCorSel' : 'answer'

  } else {
    classAnswer = answer.isSelected ? 'answer ansSelect' : 'answer'
  }



  return (
    <div className={classAnswer} onClick={() => handleClick(question.id, answer.id)}>{answer.answer}</div>
  )
}

export default Answer