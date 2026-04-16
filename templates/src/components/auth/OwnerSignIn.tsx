import { useState } from 'react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { EthnicBorder } from '../EthnicPattern';
import { useTranslations } from '../../i18n/translations';

interface OwnerSignInProps {
  onComplete: (data: { email: string; password: string }) => void;
  onGoogleSignIn: () => void;
  onBack: () => void;
}

export function OwnerSignIn({ onComplete, onGoogleSignIn, onBack }: OwnerSignInProps) {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!password || password.length < 1) {
      newErrors.password = 'Введите пароль';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onComplete({ email: email.trim().toLowerCase(), password });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full mb-6">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="text-center mb-8">
          <h2 className="mb-3 text-foreground">Вход в аккаунт</h2>
          <div className="w-20 mx-auto mb-4">
            <EthnicBorder className="text-accent" />
          </div>
          <p className="text-muted-foreground">Введите email и пароль для входа</p>
        </div>

        {/* Google Sign In Button */}
        <div className="mb-6">
          <Button
            type="button"
            onClick={onGoogleSignIn}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 py-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M43.611 20.083H42V20H24v8h11.3C34.9 32.89 30.06 36 24 36c-7.18 0-13-5.82-13-13s5.82-13 13-13c3.26 0 6.22 1.24 8.48 3.26l5.66-5.66C33.5 4.9 29.09 3 24 3 12.95 3 4 11.95 4 23s8.95 20 20 20 20-8.95 20-20c0-1.34-.12-2.65-.389-3.917z" fill="#EA4335"/>
                <path d="M6.306 14.691l6.571 4.82C14.08 15.08 18.82 12 24 12c3.26 0 6.22 1.24 8.48 3.26l5.66-5.66C33.5 4.9 29.09 3 24 3 16.18 3 9.415 7.925 6.306 14.691z" fill="#FBBC05"/>
                <path d="M24 44c5.93 0 11.09-2.04 14.82-5.52l-6.82-5.65C29.95 34.63 27.17 36 24 36c-6.06 0-11.27-4.1-13.1-9.64l-6.67 5.14C7.66 39.27 15.3 44 24 44z" fill="#34A853"/>
                <path d="M43.611 20.083H42V20H24v8h11.3c-1.36 4.02-4.97 6.9-8.9 7.58l6.82 5.65C36.17 39.25 44 33.52 44 23c0-1.34-.12-2.65-.389-3.917z" fill="#4285F4"/>
              </svg>
              <span className="font-medium">Войти с Google</span>
            </div>
          </Button>
        </div>

        <div className="text-center mb-4 text-muted-foreground text-sm">или</div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-foreground">Email *</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: '' });
                }}
                placeholder="Введите ваш email"
                className="pl-12 py-6 rounded-2xl border-2 focus:border-accent"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-destructive flex items-center gap-2">
                <span>⚠️</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-foreground">Пароль *</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
                placeholder="Введите ваш пароль"
                className="pl-12 py-6 rounded-2xl border-2 focus:border-accent"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-destructive flex items-center gap-2">
                <span>⚠️</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <button 
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => alert('Функция восстановления пароля будет доступна позже')}
            >
              Забыли пароль?
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-accent to-[#B88A16] hover:from-accent/90 hover:to-[#B88A16]/90 text-white py-6 rounded-2xl shadow-lg mt-8"
          >
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}

export default OwnerSignIn;
