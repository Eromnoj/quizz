import React from 'react'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { useSelector } from 'react-redux'
import { selectAnswer } from '../redux'

function Answer(props) {
  const {
    answer,
    question
  } = props

  const quizzEnd = useSelector(state => state.endQuizz)

  const payLoadObject = {
    questId: question.id,
    ansId: answer.id
  }

  const dispatch = useDispatch()

  let classAnswer = ''

  if (quizzEnd) {

    classAnswer = answer.isSelected && question.correct ? 'answer ansCorSel' : answer.isSelected && !question.correct ? 'answer ansIncSel' : answer.answer === question.goodAnswer ? 'answer ansCorSel' : 'answer'

  } else {
    classAnswer = answer.isSelected ? 'answer ansSelect' : 'answer'
  }



  return (
    <div className={classAnswer} onClick={() => dispatch(selectAnswer(payLoadObject))}>{answer.answer}</div>
  )
}

export default Answer