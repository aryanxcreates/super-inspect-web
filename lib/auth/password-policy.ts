/** Mirrors typical Supabase Auth password rules (min 8 + mixed case + digit). */
export type PasswordPolicyCheck = {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  digit: boolean;
};

export function getPasswordPolicy(password: string): PasswordPolicyCheck {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
  };
}

export function meetsPasswordPolicy(password: string): boolean {
  const p = getPasswordPolicy(password);
  return p.minLength && p.uppercase && p.lowercase && p.digit;
}
