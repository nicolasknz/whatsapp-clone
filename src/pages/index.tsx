import React from 'react'
import Head from 'next/head'

// import Logo from '../assets/logo.svg'
import NextjsIcon from '../assets/next-js.svg'
import TypescriptIcon from '../assets/typescript-icon.svg'

import reactjsIcon from '../assets/react.png'

import { Container, LogosWrapper } from '../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>
      <LogosWrapper>
        <NextjsIcon />
        <img src={reactjsIcon} alt="" />
        <TypescriptIcon />
      </LogosWrapper>
      <h1>ReactJS Structure</h1>
      <p>
        ReactJs + Next.js + Styled Components + Typescript + ESLint + Prettier
      </p>
    </Container>
  )
}

export default Home
