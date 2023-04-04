import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import Timer from '@/components/Timer/Timer'
import Stats from '@/components/Stats/Stats'

export default function Home() {
  return (
    <div className='w-screen h-screen bg-x-400 flex'>
      <Sidebar buttonActive={1}/>
      <div className="flex flex-col justify-between flex-grow">
        <Timer />
        <Stats />
      </div>
    </div>
  )
}