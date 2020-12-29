import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagono1, Hexagono } from '../styles'

function Hexa({ children,to }) {
    return (
        <Hexagono as={Link} to={to}>
          <Hexagono1>
            {children}
          </Hexagono1>
        </Hexagono>
    )
}

export default Hexa;