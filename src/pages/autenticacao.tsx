import { useState } from 'react';
import AuthInput from '../auth/AuthInput';
import { FcGoogle } from 'react-icons/fc';
import { IconeAtencao } from '../components/icons';
import useAuth from '../data/hook/useAuth';

export default function Autenticacao() {
  const { login, cadastrar, loginGoogle } = useAuth();

  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  function exibirErro(msg: any, tempoEmSegundos = 8) {
    setErro(msg);
    setTimeout(() => setErro(null), tempoEmSegundos * 1000);
  }

  async function submeter() {
    try {
      if (modo === 'login') {
       await login?.(email, senha) === undefined ? exibirErro('Oxe') : ''

      } else {
       await cadastrar?.(email, senha);
      }
    } catch(e: any) {
      exibirErro(e?.message ?? "Erro desconhecido")
    }
  }

  return (
    <div className={`flex h-screen items-center justify-center`}>
      <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
        <img
          className={`h-screen w-full object-cover`}
          src="https://source.unsplash.com/random/?Sky&1"
          alt="Imagem da Tela de Autenticação"
        />
      </div>
      <div className={`m-10 w-full md:w-1/2 lg:w-1/3 mt-4`}>
        <h1 className={`text-3xl font-bold mb-5`}>
          {modo === 'login'
            ? 'Entre com a sua conta'
            : 'Cadastre-se na plataforma'}
        </h1>

        {erro ? (
          <div
            className={`flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg`}
          >
            {IconeAtencao()}
            <span className={`ml-3`}>{erro}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput
          tipo="email"
          label="Email"
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />

        <AuthInput
          tipo="password"
          label="Senha"
          valor={senha}
          valorMudou={setSenha}
          obrigatorio
        />

        <button
          onClick={submeter}
          className={`w-full bg-indigo-500 hover:bg-indigo-400
          text-white rounded-lg px-4 py-3 mt-6`}
        >
          {modo === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>

        <hr className={`my-6 border-gray-300 w-full`} />

        <button
          onClick={loginGoogle}
          className={`flex gap-2 items-center justify-center
          w-full bg-red-400 hover:bg-red-300
          text-white rounded-lg px-4 py-3`}
        >
          <FcGoogle size={25} />
          Entrar com Google
        </button>

        {modo === 'login' ? (
          <p className={`mt-8`}>
            Novo por aqui?
            <a
              onClick={() => setModo('cadastro')}
              className={`
                text-blue-500 hover:text-blue-700 font-semibold
                cursor-pointer
              `}
            >
              {' '}
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className={`mt-8`}>
            {' '}
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo('login')}
              className={`
                text-blue-500 hover:text-blue-700 font-semibold
                cursor-pointer
              `}
            >
              {' '}
              Entre com a suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
