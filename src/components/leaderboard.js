import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Divider, Grid, Segment, Image, Header, Label} from 'semantic-ui-react'

class LeaderBoard extends Component {
    render(){
        const {leaderBoardUsers} = this.props
       /*  console.log(this.props) */
        return(
            <Fragment>
                {leaderBoardUsers.map((user, id) => (
                    <Segment.Group key={user.id}>
                        <Label icon="trophy" corner='left' color={labelColors[id]}/>
                        <Grid divided padded>
                            <Grid.Row>
                                <Grid.Column width={4} verticalAlign='middle'>
                                    <Image src={user.avatarURL} circular />
                                </Grid.Column>
                                <Grid.Column width={8} verticalAlign='middle'>
                                    <Header as='h3' textAlign='left'>
                                        {user.name}
                                    </Header>
                                    <Grid >
                                        <Grid.Column width={12}> Questions Created : </Grid.Column>
                                        <Grid.Column width={4}>{user.questionCount}</Grid.Column>
                                    </Grid>
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={12}> Questions Answered : </Grid.Column>
                                        <Grid.Column width={4}>{user.answerCount}</Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={4} textAlign='center' verticalAlign='middle'>
                                    <Segment.Group>
                                        <Header as='h4' textAlign='center'>
                                            Score
                                        </Header>
                                        <Segment>
                                            <Label circular color='blue' size='huge'>
                                                {user.total}
                                            </Label>
                                         </Segment>
                                    </Segment.Group>
                                </Grid.Column>                 
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>

                ))}
                
            </Fragment>
        )
    }
}

const labelColors = [
    'yellow',
    'grey',
    'orange'
]

function mapStateToProps ({ users }) {
    const leaderBoardUsers = Object.values(users)
    .map((user) => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
    })).sort((a,b) => b.total - a.total)
    .slice(0,3)
    return {
        leaderBoardUsers
    }
}

export default connect(mapStateToProps)(LeaderBoard)