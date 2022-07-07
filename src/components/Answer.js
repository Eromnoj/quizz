import React from 'react'

function Answer(props) {
  const {
    answer,
    // goodAnswer,
    isSelected,
    handleClick
  } = props

  const styles = {
    color: isSelected ? "green" : "blue"
  }

  return (
    <div onClick={handleClick} style={styles}>{answer}</div>
  )
}

export default Answer