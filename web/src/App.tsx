import "./App.css";
import { Outlet } from "react-router-dom";
import { PageLoader } from "./components/PageLoader";
import { ConfirmDialogProvider } from "./components/ConfirmDialog";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

const AuthWrapper = ({ children }: React.PropsWithChildren) => {
  const { isLoading } = useAuthRedirect();
  return isLoading ? <PageLoader /> : <>{children}</>;
};

function App() {
  return (
    <AuthWrapper>
      <ConfirmDialogProvider>
        <Outlet />
      </ConfirmDialogProvider>
    </AuthWrapper>
  );
}

export default App;
