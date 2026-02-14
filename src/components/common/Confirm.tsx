
import React, { useState } from "react";
import useConfirm from "@components/confirm/useConfirm";
import { PATHS } from "@/routers/Paths";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

export function LogoutButton({ children, ...props }: Props) {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const { t } = useTranslation()

  async function handleLogout() {
    if (pending) return;

    const confirmed = await confirm({
      title: t('confirm.sign_me_out'),
      description: t('confirm.signout_description'),
      confirmText: t('auth.logout'),
      cancelText: t('common.cancel'),
      variant: "default",
    });

    if (!confirmed) return;

    setPending(true);
    try {
      // best-effort: sign out via Supabase if available
      try {
        await supabase.auth.signOut();
      } catch (err) {
        // non-fatal — still navigate to login
        console.warn("supabase.signOut() failed:", err);
      }

      // navigate within app (no full reload)
      navigate(PATHS.LOGIN);
    } catch (err) {
      console.error("logout failed", err);
      toast.error(t('auth.error_failed_logout'))

    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" onClick={handleLogout} disabled={pending || props.disabled} aria-busy={pending}
      {...props}
    >
      <Spinner status={pending} size="sm" > {children ?? t('auth.Logout') } </Spinner>
    </button>
  );
}

export function VerifyPhone({ children, phone, ...props }:any) {
  const confirm = useConfirm();
  const [pending, setPending] = useState(false);

  const { t } = useTranslation()

  async function handleVerification() {
    if (pending) return;

    const confirmed = await confirm({
      title: t('confirm.phone_verification'),
      description: t('confirm.phone_verification_description', {phone: phone}),
      confirmText: t('confirm.phone_verification_cta'),
      cancelText: t('common.cancel'),
      variant: "default",
    });

    if (!confirmed) return;

    setPending(true);
    try {
      try {

      } catch (err) {
        // non-fatal — still navigate to login
        console.warn("supabase.signOut() failed:", err);
      }

    } catch (err) {
      console.error("logout failed", err);
      // TODO: show user-facing toast
    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" onClick={handleVerification} disabled={pending || props.disabled} aria-busy={pending}
      {...props}
    >
      <Spinner status={pending} size="sm" > {children ?? t('confirm.phone_verification_cta')} </Spinner>
    </button>
  );
}