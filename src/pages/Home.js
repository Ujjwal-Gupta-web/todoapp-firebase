import React from 'react'
import { CardGroup ,Card, Container  } from 'react-bootstrap';

const Home = () => {
    return (<>
    <Container>
        <CardGroup>
            <Card className='mx-2 border border-black'>
                <Card.Img style={{height:"200px",width:"300px"}} variant="top" src="https://i.imgur.com/OvMZBs9.jpeg" />
                <Card.Body>
                    <Card.Title>Remain Managed</Card.Title>
                    <Card.Text>
                        Writing your tasks make you more efficient
                    </Card.Text>
                </Card.Body>
                
            </Card>
            <Card className='mx-2 border border-black'>
                <Card.Img style={{height:"200px",width:"300px"}} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTkFO1TmvYKCDJ84KXvMFgsAvJ-mc936bmt7yrbc0Y0bWpD4rtLtJyAm5o-pK9nW4mMQ&usqp=CAU" />
                <Card.Body>
                    <Card.Title>Delete a Todo after completion</Card.Title>
                    <Card.Text>
                        This gives you feeling of acheivement
                    </Card.Text>
                </Card.Body>
                
            </Card>
            <Card className='mx-2 border border-black'>
                <Card.Img style={{height:"200px",width:"300px"}} variant="top" src="https://i.pinimg.com/originals/ce/22/32/ce22327fa176a92798cdbd1589391cc2.jpg" />
                <Card.Body>
                    <Card.Title>Edit/Update a todo</Card.Title>
                    <Card.Text>
                        Sometimes plans change.
                    </Card.Text>
                </Card.Body>
                
            </Card>
        </CardGroup>            
    </Container>
        

    </>
    )
}

export default Home
