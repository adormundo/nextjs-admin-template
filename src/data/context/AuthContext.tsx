import Router from 'next/router';
import { createContext } from 'react';
import firebase from '../../firebase/config';
import Usuario from '../../model/Usuario';
import { useState } from 'react';

interface AuthContextProps{
  usuairo?: Usuario
  loginGoogle?: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken()
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName || '',
    email: usuarioFirebase?.email || '',
    token,
    provedor: usuarioFirebase.providerData[0]?.providerId || '',
    imagemUrl: usuarioFirebase?.photoURL || ''
  }
}

export function AuthProvider(props: any) {
  const [usuairo, setUsuario] = useState<Usuario>()

  async function loginGoogle() {
    console.log('Login google...')
    Router.push('/')
  }

  return(
    <AuthContext.Provider value={{usuairo, loginGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}
