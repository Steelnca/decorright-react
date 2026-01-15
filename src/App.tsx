
// src/App.tsx
import { AuthProvider } from "@/contexts/AuthProvider";
import AppRoutes from "@/routers/AppRoutes";
import ConfirmProvider from "@components/confirm/ConfirmProvider";

function App() {
  return (
    <ConfirmProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ConfirmProvider>
  );
}

export default App