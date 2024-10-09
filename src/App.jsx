import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {LeafletSample} from './components/LeafletSample'
import { EnvVar } from './components/EnvVar'


function App() {

  return (
    <>
    <EnvVar></EnvVar>
    <LeafletSample></LeafletSample>
    </>
  )
}

export default App
