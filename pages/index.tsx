import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import Timer from '@/components/Timer/Timer'
import Stats from '@/components/Stats/Stats'
import Information from '@/components/Information/Information'

export default function Home() {
  return (
    <div className='flex w-screen h-screen bg-x-400 gap-2'>
      <div className='hidden md:block'>
        <Sidebar buttonActive={1}/>
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <Information />
        <Timer />
        <Stats />
      </div>
    </div>
  )
}