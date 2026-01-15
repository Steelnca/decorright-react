
import { PATHS } from "@/routers/Paths";
import useConfirm from "@components/confirm/useConfirm";

export default function LogoutButton({children, ...props}:any) {
  const confirm = useConfirm();

  async function handleLogout() {
    const ok = await confirm({
      title: 'Sign me out',
      description: 'Are you sure you want to log out of your account?',
      confirmText: 'Logout',
      cancelText: 'Cancel',
      variant: 'default',
    });

    if (!ok) return;
    try {

      // !!! await Logout(); SIGNOUT LOGIC HERE !!!

      window.location.href = PATHS.LOGIN;
    } catch (err) {
      console.error('logout failed', err);
      // show a toast or error UI
    }
  }

  return (
    <button type="button" onClick={handleLogout} {...props}> {children ? children : 'Logout'} </button>
  );
}