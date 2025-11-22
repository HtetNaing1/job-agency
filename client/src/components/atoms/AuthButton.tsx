"use client";

import Button from "./Button";

interface AuthButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  htmlType?: "button" | "submit" | "reset";
}

/**
 * Reusable authentication button (for Sign In / Sign Up)
 * Styled consistently with all auth forms.
 */
export default function AuthButton({
  label,
  loading = false,
  disabled = false,
  onClick,
  htmlType = "submit",
}: AuthButtonProps) {
  return (
    <Button
      type="primary"
      className="w-full h-12 text-base font-medium disabled:opacity-60"
      label={label}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      htmlType={htmlType}
    />
  );
}
