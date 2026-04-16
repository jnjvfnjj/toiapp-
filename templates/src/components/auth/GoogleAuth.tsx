import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { EthnicBorder } from '../EthnicPattern';
import { useTranslations } from '../../i18n/translations';
import { parseGoogleToken, type GoogleOAuthResponse } from '../../hooks/useGoogleAuth';

interface GoogleAuthProps {
  title: string;
  onAuthenticated: (email: string, name: string) => void;
  onBack: () => void;
  onRegister?: () => void;
}

export function GoogleAuth({ title, onAuthenticated, onBack, onRegister }: GoogleAuthProps) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo_client_id';

  useEffect(() => {
    if (!clientId) {
      setError('Google Client ID не настроен. Обратитесь к администратору.');
      return;
    }

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
  }, [clientId]);

  const handleGoogleResponse = async (response: GoogleOAuthResponse) => {
    setError('');
    setLoading(true);

    try {
      const userInfo = parseGoogleToken(response.credential);
      if (!userInfo) {
        throw new Error('Failed to parse Google token');
      }
      setLoading(false);
      onAuthenticated(userInfo.email, userInfo.name);
    } catch (err) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Google authentication failed';
      setError(msg);
      console.error('Google auth error:', err);
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
      <div className="flex-1 flex flex-col">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-[#B88A16] flex items-center justify-center mx-auto mb-6">
            <div className="w-10 h-10 rounded-full bg-white" />
          </div>
          
          <h2 className="mb-3 text-foreground">{title}</h2>
          
          <div className="w-20 mx-auto mb-4">
            <EthnicBorder className="text-accent" />
          </div>
          
          <p className="text-muted-foreground">Используйте свой Google аккаунт для входа</p>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          {/* Google Sign-In Button */}
          <div ref={googleButtonRef} className="flex justify-center" />

          {/* Fallback registration button */}
          {onRegister && (
            <Button
              onClick={onRegister}
              className="w-full bg-gradient-to-r from-accent to-[#B88A16] hover:from-accent hover:to-[#B88A16] text-white py-6 rounded-2xl shadow-lg"
            >
              {t.common.register}
            </Button>
          )}
        </div>

        <p className="text-center text-muted-foreground mt-6 text-sm">
          Ваши данные используются только для входа в аккаунт
        </p>
      </div>
    </div>
  );
}

export default GoogleAuth;

