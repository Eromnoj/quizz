import { createSlice, configureStore } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';

const quizzSlice = createSlice({
    name: "quizz",
    initialState: [],
    reducers : {
        createNewQuizz: (state, action) => {
           state = action.payload.map(question => {
                let allAnswers = question.incorrectAnswers
                let random = Math.floor(Math.random() * 3)
                allAnswers.splice(random, 0, question.correctAnswer)
                return {
                  id: nanoid(),
                  question: question.question,
                  allAnswers: allAnswers.map(ans => {
                    return { id: nanoid(), answer: ans, isSelected: false }
                  }),
                  goodAnswer: question.correctAnswer,
                  correct: false
                }
              } )

            return state
        },
        selectAnswer: (state, action) => {
            state = state.map(question => {
                let allChAnswers = question.allAnswers.map(answer => {
                  return answer.id === action.payload.ansId ? { ...answer, isSelected: !answer.isSelected } : question.id === action.payload.questId ? { ...answer, isSelected: false } : answer
                })
                return { ...question, allAnswers: allChAnswers }
              })

            return state
        },
        validAnswer: (state) => {
            state = state.map(question => {
                let givenAnswer = question.allAnswers.filter(answer => answer.isSelected)
                if (givenAnswer[0]) {
                  if (givenAnswer[0].answer === question.goodAnswer) {
                    return { ...question, correct: true }
                  } else {
                    return { ...question, correct: false }
                  }
                } else {
                  return question
                }
              })

            return state
        }
    }
})

const quizzEndSlice = createSlice({
    name: 'endQuizz',
    initialState: false,
    reducers: {
        toggleEndQuizz: (state, action) => {
            state = action.payload
            return state
        }
    }
})

export const {createNewQuizz, selectAnswer,validAnswer} =quizzSlice.actions

export const {toggleEndQuizz} = quizzEndSlice.actions

export const store = configureStore({
    reducer: {
        quizz : quizzSlice.reducer,
        endQuizz: quizzEndSlice.reducer
    }
})