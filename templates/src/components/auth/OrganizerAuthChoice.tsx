import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { EthnicBorder } from '../EthnicPattern';
import { useTranslations } from '../../i18n/translations';

interface OrganizerAuthChoiceProps {
  onGoogleSignIn: () => void;
  onSignIn: () => void;
  onRegister: () => void;
  onBack: () => void;
}

export function OrganizerAuthChoice({ onGoogleSignIn, onSignIn, onRegister, onBack }: OrganizerAuthChoiceProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <div className="mb-8">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full mb-6">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
      </div>

      <div className="flex-1">
        <div className="text-center mb-8">
          <h2 className="mb-3 text-foreground">{t.profile.organizer}</h2>
          <div className="w-20 mx-auto mb-4">
            <EthnicBorder className="text-primary" />
          </div>
          <p className="text-muted-foreground">Выберите способ входа</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onGoogleSignIn}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 py-6 rounded-2xl shadow-lg"
          >
            Войти через Google
          </Button>

          <Button
            onClick={onSignIn}
            variant="outline"
            className="w-full border-2 border-primary text-primary py-6 rounded-2xl"
          >
            Войти в аккаунт
          </Button>

          <Button
            onClick={onRegister}
            className="w-full bg-gradient-to-r from-accent to-[#B88A16] text-white py-6 rounded-2xl shadow-lg"
          >
            {t.common.register}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrganizerAuthChoice;

