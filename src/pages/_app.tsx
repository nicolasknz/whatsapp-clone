import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import Login from './login'
import Loading from '../../components/Loading'
import firebase from 'firebase'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            // if wasnt created, will be created, and also update if necessary, that's why set insted of update
            db.collection('users').doc(user.uid).set(
                {
                    email: user.email,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
                    photoURL: user.photoURL
                },
                { merge: true }
            )
        }
    }, [user])

    if (loading) return <Loading />

    if (!user) return <Login />

    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <GlobalStyle />
        </ThemeProvider>
    )
}

export default MyApp
