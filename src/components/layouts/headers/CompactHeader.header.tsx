import UrlReferencyButton, {
} from "../../ui/buttons/UrlRefency.buttons";
import ToHomeButton from "../../ui/buttons/ToHomeButton.ui";
import { isAuthenticated } from "@/src/dal/auth";


export async function CompactHeader() {
  const authenticated = await isAuthenticated();

  return (
    <header className="flex flex-row justify-between p-6 z-9999 relative">
      <ToHomeButton logoType="small" size={36} />
      <UrlReferencyButton
        authenticated={authenticated}
      />
    </header>
  );
};

