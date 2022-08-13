export default function Answers(props){
    let backgroundcolor
    let opacityNum
    const selectedAnswer = props.answer === props.selectedAnswer
    const defaultAnswer = props.answer !== props.selectedAnswer
    const correctAnswer = props.correctAnswer === props.answer
    const wrongAnswer = props.correctAnswer !== props.answer
    if(selectedAnswer && !props.isQuizOver ) {
        backgroundcolor = "#D6DBF5"
    }else if(defaultAnswer  && !props.isQuizOver){
        backgroundcolor = "#F5F7FB"
    }else if (props.isQuizOver && correctAnswer ){
        backgroundcolor = "#94D7A2"
    }else if (props.isQuizOver && wrongAnswer === selectedAnswer ){
        backgroundcolor = "#F8BCBC"
        opacityNum = 0.5
    }else {
        opacityNum = 0.5
    }
    const styles = {
        backgroundColor : backgroundcolor,
        opacity: opacityNum
        

    }
    return (
        <button  className="answer" style={styles} onClick={() => props.selectAnswer(props.id,props.answer)}>
            {props.answer.replace(/&quot;/g, '').replace(/&#039;/g,'').replace(/&/g,'').replace(/acute;/g,'')}
        </button>
    )
}