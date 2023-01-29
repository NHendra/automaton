import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Signin from './signin';
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react'
import InputForm from '@/components/InputForm';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Automaton Zeta</title>
        <meta name="description" content="Automaton Zeta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
        </div>
        <div className={styles.center}>
          {!session ? <>
            <Image
              className='stupid-smug'
              src="/home.png"
              alt="13"
              width={200}
              height={200}
              priority
            />
          <div className={styles.thirteen}>
            <Signin />
          </div>
          </> : <>
          <InputForm/>
          </>}
        </div>
        <div className={styles.grid}>
        </div>
      </main>
    </>
  )
}
