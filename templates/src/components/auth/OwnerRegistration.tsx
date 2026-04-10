import { SimpleRegistrationForm, type RegistrationPayload } from './SimpleRegistrationForm';
import { useTranslations } from '../../i18n/translations';

interface OwnerRegistrationProps {
  onComplete: (data: RegistrationPayload) => void;
  onBack: () => void;
}

export function OwnerRegistration({ onComplete, onBack }: OwnerRegistrationProps) {
  const t = useTranslations();
  return (
    <SimpleRegistrationForm
      variant="owner"
      title={`${t.profile.owner} — регистрация`}
      onComplete={onComplete}
      onBack={onBack}
    />
  );
}
