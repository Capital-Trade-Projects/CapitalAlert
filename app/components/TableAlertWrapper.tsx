// components/TableAlertWrapper.tsx
import { getAlerts } from "./actions/alertActions";
import { TableAlert } from "./table";

export const TableAlertWrapper = async () => {
  const alerts = await getAlerts();
  return <TableAlert alerts={alerts} />;
};
