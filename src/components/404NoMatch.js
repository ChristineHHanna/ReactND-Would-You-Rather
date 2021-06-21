import React, {Component} from 'react'
import { Header, Container } from 'semantic-ui-react'

class NoMatch extends Component {
    render() {
        return(
            <Container>
                <Header className ='no-match' as='h3' textAlign='center'>
                    404 Error - No Match
                </Header>
            </Container>
        )
    }
}

export default NoMatch