import { Button } from "@/components/ui/button";

import { signout } from "../services/actions";

function SignoutButton() {
  return (
    <form action={signout}>
      <Button className="h-auto px-3 py-1.5" variant="outline">
        Sign out
      </Button>
    </form>
  );
}

export default SignoutButton;
