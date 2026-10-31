import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Wallet, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export const RegisterView: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, isConfigured } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas digitadas não coincidem.');
      return;
    }

    setLoading(true);
    const { error } = await signUp(name.trim(), email.trim(), password);
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage('Conta criada com sucesso! Você já pode entrar.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex w-12 h-12 rounded-2xl bg-brand-600 text-white items-center justify-center shadow-lg shadow-brand-500/25 mb-3">
          <Wallet className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Crie sua conta
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Suas despesas protegidas com isolamento total
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        {!isConfigured && (
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-amber-900">Atenção:</span>
              Credenciais do Supabase ausentes no arquivo <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">.env</code>.
            </div>
          </div>
        )}

        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Nome completo"
              type="text"
              required
              placeholder="Seu Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              required
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Senha"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Mínimo de 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Repita sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={loading}
            >
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Já possui uma conta?{' '}
              <Link
                to="/login"
                className="font-semibold text-brand-600 hover:text-brand-700 hover:underline"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
