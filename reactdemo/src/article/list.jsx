/*  */
import React, { useState, useEffect } from 'react';
import Headers from '../component/headers';
import { Container, Typography } from '@material-ui/core';

export default function Home(props) {
    const [buttonText, setButtonText] = useState('');
    useEffect(() => {

    }, []);

    return (
        <div>
            <Headers type="home" />
            <Container style={{ marginTop: '80px' }}>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </div>
    );
}