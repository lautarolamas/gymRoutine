import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

interface CafecitoButtonProps {
  username?: string;
  className?: string;
}

export function CafecitoButton({ username }: CafecitoButtonProps) {
  const cafecitoUsername =
    username || process.env.NEXT_PUBLIC_CAFECITO_USERNAME || "gymroutine";

  return (
    <a
      href={`https://cafecito.app/${cafecitoUsername}`}
      rel="noopener"
      target="_blank"
      className="inline-block"
    >
      <img
        srcSet="https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x"
        src="https://cdn.cafecito.app/imgs/buttons/button_5.png"
        alt="Invitame un café en cafecito.app"
        className="h-8"
      />
    </a>
  );
}
