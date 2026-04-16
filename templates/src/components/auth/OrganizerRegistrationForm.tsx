import { SimpleRegistrationForm, type RegistrationPayload } from './SimpleRegistrationForm';

interface OrganizerRegistrationFormProps {
  onComplete: (data: RegistrationPayload) => void;
  onBack: () => void;
}

export function OrganizerRegistrationForm({ onComplete, onBack }: OrganizerRegistrationFormProps) {
  return (
    <SimpleRegistrationForm
      variant="organizer"
      title="Регистрация организатора"
      onComplete={onComplete}
      onBack={onBack}
    />
  );
}

export default OrganizerRegistrationForm;
