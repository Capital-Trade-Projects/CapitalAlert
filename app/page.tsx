import { HeaderAlert } from "./components/header";
import { TableAlertWrapper } from "./components/TableAlertWrapper";

export default function Home() {
  return (
    <div className="bg-background min-h-screen custom-scrollbar overflow-scroll p-2 border rounded-lg">
      <HeaderAlert />
      <TableAlertWrapper />
    </div>
  );
}
