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

  let styles = {}
  if(quizzEnd){
    styles = {
      color: isSelected && correct ? "green" : isSelected && !correct ? "red" : answer === goodAnswer ? "green" : "black"
    }
  } else {
    styles = {
        color: isSelected ? "blue" : "black"
      }

  }
  


  return (
    <div className='answer' onClick={handleClick} style={styles}>{answer}</div>
  )
}

export default Answer