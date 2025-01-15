import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@smart-safety-solutions/components';
import { FunctionComponent } from 'react';

const AlertsTable: FunctionComponent = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Device ID</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Placeholder</TableCell>
          <TableCell>Placeholder</TableCell>
          <TableCell>Placeholder</TableCell>
          <TableCell className="text-right">Placeholder</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AlertsTable;
