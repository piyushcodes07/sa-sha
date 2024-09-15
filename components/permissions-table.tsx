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
            <TableRow className="bg-slate-200 border-2 border-gray-100" key={name}>
              <TableCell className="font-mono  font-medium">{name}</TableCell>
              <TableCell>
                <Badge variant={details.status === 'normal' ? 'default' : 'destructive'}>
                  {details.status}
                </Badge>
              </TableCell>
              <TableCell className=" text-base font-medium">{details.info}</TableCell>
              <TableCell className=" text-base">{details.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
