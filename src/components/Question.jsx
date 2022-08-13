import { nanoid } from "nanoid"
import Answers from "./Answers"

export default function Question(props){

    const answerElements = props.quizQuestion.answers.map((item,index) => {
        return <Answers 
        key = {nanoid()} 
        id={props.id} 
        answer = {item} 
        selectedAnswer = {props.quizQuestion.selectedAnswer}
        correctAnswer = {props.quizQuestion.correct_answer}
        selectAnswer = {props.selectAnswer}
        isQuizOver = {props.isQuizOver}
        />
    } )



    return(
        <div className = "question">
            <h1>{props.quizQuestion.question.replace(/&quot;/g, '').replace(/&#039;/g,'').replace(/&/g,'').replace(/acute;/g,'')}</h1>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}