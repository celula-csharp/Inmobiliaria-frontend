import { Link } from "react-router";
import { Button } from "../ui/button";

export default function HeaderAuth() {
  return (
    <div className="border-b p-4 flex gap-2">
      <span className="text-2xl">Inmobiliaria</span>
      <nav className="flex-1 flex items-center gap-2 justify-end">
        <Button asChild variant="ghost">
          <Link to="#">¿Quienes somos?</Link>
        </Button>
      </nav>
    </div>
  );
}
