import { HeaderAlert } from "./components/header";
import { TableAlertWrapper } from "./components/TableAlertWrapper";

export default function Home() {
  return (
    <div className="bg-black">
      <HeaderAlert />
      <TableAlertWrapper />
    </div>
  );
}
