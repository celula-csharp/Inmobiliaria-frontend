import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { account } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm mb-4">
        Bienvenido, {account?.email.split("@")[0]}
      </p>

      <Button onClick={() => navigate("/app/properties")}>
        Gestionar propiedades
      </Button>
    </div>
  );
}
