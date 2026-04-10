import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { EthnicBorder } from '../EthnicPattern';
import { parseGoogleToken, type GoogleOAuthResponse } from '../../hooks/useGoogleAuth';

interface OwnerGoogleRegisterProps {
  onComplete: (data: { email: string; name: string; password: string }) => void;
  onBack: () => void;
}

export function OwnerGoogleRegister({ onComplete, onBack }: OwnerGoogleRegisterProps) {
  const [step, setStep] = useState<'google' | 'password'>('google');
  const [loading, setLoading] = useState(false);
  const [googleData, setGoogleData] = useState<{ email: string; name: string } | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ password?: string }>({});
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo_client_id';

  useEffect(() => {
    if (step === 'google' && clientId && googleButtonRef.current) {
      const initializeGoogle = () => {
        if (window.google?.accounts?.id && googleButtonRef.current) {
          try {
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: handleGoogleResponse,
            });
            window.google.accounts.id.renderButton(googleButtonRef.current, {
              theme: 'outline',
              size: 'large',
              width: '100%',
            });
          } catch (err) {
            console.error('Failed to initialize Google:', err);
            setError('Ошибка при инициализации Google. Попробуйте позже.');
          }
        }
      };

      if (window.google?.accounts?.id) {
        initializeGoogle();
      } else {
        const timer = setTimeout(initializeGoogle, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [step, clientId]);

  const handleGoogleResponse = async (response: GoogleOAuthResponse) => {
    setError('');
    setLoading(true);

    try {
      const userInfo = parseGoogleToken(response.credential);
      if (!userInfo) {
        throw new Error('Failed to parse Google token');
      }
      setLoading(false);
      setGoogleData({ email: userInfo.email, name: userInfo.name });
      setStep('password');
    } catch (err) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Google authentication failed';
      setError(msg);
      console.error('Google auth error:', err);
    }
  };

  const validatePassword = () => {
    const newErrors: { password?: string } = {};
    if (!password || password.length < 8) {
      newErrors.password = 'Пароль должен быть не короче 8 символов';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword() && googleData) {
      onComplete({
        email: googleData.email,
        name: googleData.name,
        password
      });
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
          <h2 className="mb-3 text-foreground">
            {step === 'google' ? 'Регистрация через Google' : 'Придумайте пароль'}
          </h2>
          <div className="w-20 mx-auto mb-4">
            <EthnicBorder className="text-accent" />
          </div>
          <p className="text-muted-foreground">
            {step === 'google' 
              ? 'Выберите Google аккаунт для продолжения' 
              : 'Создайте пароль для защиты вашего аккаунта'}
          </p>
        </div>

        {step === 'google' && (
          <div className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-3 text-sm">
                {error}
              </div>
            )}
            <div ref={googleButtonRef} className="flex justify-center" />
          </div>
        )}

        {step === 'password' && googleData && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Показываем выбранный Google аккаунт */}
            <div className="bg-muted rounded-2xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Выбранный аккаунт:</p>
              <p className="font-medium text-foreground">{googleData.name}</p>
              <p className="text-sm text-muted-foreground">{googleData.email}</p>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-foreground">Придумайте пароль *</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
                placeholder="Минимум 8 символов"
                className="py-6 rounded-2xl border-2 focus:border-accent"
              />
              {errors.password && (
                <p className="mt-2 text-destructive flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.password}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-accent to-[#B88A16] hover:from-accent/90 hover:to-[#B88A16]/90 text-white py-6 rounded-2xl shadow-lg mt-8"
            >
              Зарегистрироваться
            </Button>

            <Button 
              type="button"
              variant="outline"
              onClick={() => setStep('google')}
              className="w-full border-2 border-gray-300 py-6 rounded-2xl"
            >
              Выбрать другой аккаунт
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default OwnerGoogleRegister;
