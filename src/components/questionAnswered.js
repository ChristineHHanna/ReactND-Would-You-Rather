import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Segment, Label, Icon, Button, Progress, Header} from 'semantic-ui-react'


 class QuestionAnswer extends Component {

    handleClick = () => {
        this.props.history.push('/')
    }

    render() {
        const { question, user } = this.props
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const userVote = user.answers[question.id]

        const styles = {
        choice: {
            color: 'orange',
            bgColor: 'honeydew'
        },
        basic: {
            color: 'grey',
            bgColor: '#f4f4f4'
        }
        };

        let optionO = styles.basic,
        optionT = styles.basic
        if (optionOneVotes > optionTwoVotes) {
            optionO = styles.choice
        } else if (optionOneVotes < optionTwoVotes) {
            optionT = styles.choice
        }

        /* console.log('opt1', optionO)
        console.log('opt2', optionT) */

        return(
            <div className='column'>
                <Header as='h3' textAlign='center' style={{fontWeight : 'bold'}}>
                    Results:
                </Header>
                <Header.Subheader as='h5' style={{fontWeight : 'bold'}}>
                    Would You Rather ...?
                </Header.Subheader>
                <Segment color = {optionO.color} style = {{ backgroundColor : `${optionO.bgColor}` }}>
                    {userVote === 'optionOne' && <LabelVote />}
                    <p style={{fontWeight : 'bold'}}>
                        {question.optionOne.text}
                    </p>
                    <Progress percent={((optionOneVotes/ totalVotes) *100).toFixed(2)} progress color={optionO.color}>
                        {optionOneVotes} of {totalVotes} Votes
                    </Progress>
                </Segment>
                <Segment color = {optionT.color} style = {{ backgroundColor : `${optionT.bgColor}` }}>
                    {userVote === 'optionTwo' && <LabelVote/>}
                    <p style={{fontWeight : 'bold'}}>
                        {question.optionTwo.text}
                    </p>
                    <Progress percent={((optionTwoVotes/ totalVotes) *100).toFixed(2)} progress color={optionT.color}>
                        {optionTwoVotes} of {totalVotes} Votes
                    </Progress>
                </Segment>
            <Button color='blue' size='small' fluid onClick={this.handleClick} content='Back'/>
        </div>
        )
    }
}

const LabelVote = () => (
    <Label color='orange' ribbon ='right' className='vote'>
        <Icon className='circle check outline' size='large' />
            <div style={{float : 'right', verticalAlign:'center', fontSize:'16px'}}>
                Your Vote
            </div>
    </Label> 
)

function mapStateToProps ({ users, authedUser }) {
    const user = users[authedUser]
    return{
        user
    }
}

export default withRouter(connect(mapStateToProps)(QuestionAnswer))