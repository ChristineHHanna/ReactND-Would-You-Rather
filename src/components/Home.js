import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from '../components/userCard'
import { Tab } from 'semantic-ui-react';

class Home extends Component {
    
    render() {
        const {userQuestion} = this.props
        /* console.log(this.props)  */   

        return <Tab panes={panes({userQuestion})} className="questions-list"/>
    }
}

const panes = props => {
    const { unansweredQuestion, answeredQuestion } = props.userQuestion;
    return [
    {
        menuItem : 'Unaswered Questions',
        render : () => (
        <Tab.Pane> 
       {/*      {console.log('unanswered',unansweredQuestion)} */}
            {unansweredQuestion.map((question) => (
                <UserCard key={question.id} 
                    question_id={question.id} 
                    unansweredQuestion={true} />
            ))}
        </Tab.Pane>)},
        {
        menuItem : "Answered Questions",
        render : () => (
        <Tab.Pane>   
        {/*     {console.log('answered',answeredQuestion)} */}
            {answeredQuestion.map((question) => (
                <UserCard key={question.id} 
                    question_id={question.id} 
                    unansweredQuestion={false} />
            ))}
        </Tab.Pane>)}
]}

function mapStateToProps({ authedUser, questions, users }) {
     const answerID = Object.keys(users[authedUser].answers)
     const unansweredQuestion = Object.values(questions)
            .filter(question => !answerID.includes(question.id))
            .sort((a,b) => b.timestamp - a.timestamp)
    const answeredQuestion = Object.values(questions)
            .filter(question => answerID.includes(question.id))
            .sort((a,b) => b.timestamp - a.timestamp)
    return {
        userQuestion : {
            answeredQuestion,
            unansweredQuestion,
            answerID
        }    
}}

export default connect(mapStateToProps)(Home)