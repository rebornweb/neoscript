'use client'
 
import React, { } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles/page.module.css';
import Stopwatch from './components/stopwatch';



export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container fluid>
          <Row>
            <Col><h2>Breathing App</h2>
            </Col><span>Wim Hof Breathing</span>
          </Row>
        
        <Stopwatch />
        </Container>
       
      </div>
    </main>
  );
}


import 'bootstrap/dist/css/bootstrap.min.css';