import React from 'react'

function Answer(props) {
  const {
    answer,
    isSelected,
    handleClick,
    correct,
    goodAnswer,
    quizzEnd
  } = props

  let classAnswer = ''

  if (quizzEnd) {

    classAnswer = isSelected && correct ? 'answer ansCorSel' : isSelected && !correct ? 'answer ansIncSel' : answer === goodAnswer ? 'answer ansCorSel' : 'answer'

  } else {
    classAnswer = isSelected ? 'answer ansSelect' : 'answer'
  }



  return (
    <div className={classAnswer} onClick={handleClick}>{answer}</div>
  )
}

export default Answer