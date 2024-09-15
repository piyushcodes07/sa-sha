'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type PermissionDetails = {
  status: 'normal' | 'dangerous';
  info: string;
  description: string;
};

type Permissions = {
  [key: string]: PermissionDetails;
};

export function PermissionsTable({ permissions }: { permissions: Permissions }) {
  const perm = Object.entries(permissions);

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">PERMISSION</TableHead>
            <TableHead className="w-[100px]">STATUS</TableHead>
            <TableHead className="w-[200px]">INFO</TableHead>
            <TableHead>DESCRIPTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {perm.map(([name, details]) => (
            <TableRow key={name}>
              <TableCell className="font-mono">{name}</TableCell>
              <TableCell>
                <Badge variant={details.status === 'normal' ? 'default' : 'destructive'}>
                  {details.status}
                </Badge>
              </TableCell>
              <TableCell>{details.info}</TableCell>
              <TableCell>{details.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
