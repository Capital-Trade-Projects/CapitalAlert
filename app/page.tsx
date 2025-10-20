import { HeaderAlert } from "./components/header";
import { TableAlert } from "./components/table";

export default function Home() {
  return (
    <div className="bg-black">
      <HeaderAlert />
      <TableAlert />
    </div>
  );
}
