import Link from "next/link";
import { Button } from "./ui/button";

function Login() {
  return (
    <Button className="h-auto px-3 py-1.5" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}

export default Login;
