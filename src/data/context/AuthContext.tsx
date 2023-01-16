import Router from 'next/router';
import { createContext, useEffect } from 'react';
import firebase from '../../firebase/config';
import Usuario from '../../model/Usuario';
import { useState } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  usuario?: Usuario;
  loginGoogle?: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioFirebase: any): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName || '',
    email: usuarioFirebase?.email || '',
    token,
    provedor: usuarioFirebase.providerData[0]?.providerId || '',
    imagemUrl: usuarioFirebase?.photoURL || '',
  };
}

function gerenciarCookie(logado: any) {
  if (logado) {
    Cookies.set('admin-template-cod3r-auth', logado, {
      expires: 7,
    });
  } else {
    Cookies.remove('admin-template-cod3r-auth');
  }
}

export function AuthProvider(props: any) {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<any>();

  async function configurarSessao(usuarioFirebase: any) {
    const usuario = await usuarioNormalizado(usuarioFirebase);
    if (usuarioFirebase?.email) {
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(null)
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  async function loginGoogle() {
    const resp = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    configurarSessao(resp.user);
    Router.push('/');
  }

  useEffect(() => {
    const cancelar =firebase.auth().onIdTokenChanged(configurarSessao)
    return () => cancelar()
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loginGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
