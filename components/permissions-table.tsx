'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function PermissionsTable() {
  const permissions = [
    {
      name: "android.permission.INTERNET",
      status: "normal",
      info: "full Internet access",
      description: "Allows an application to create network sockets."
    },
    {
      name: "android.permission.READ_EXTERNAL_STORAGE",
      status: "dangerous",
      info: "read external storage contents",
      description: "Allows an application to read from external storage."
    },
    {
      name: "android.permission.WRITE_EXTERNAL_STORAGE",
      status: "dangerous",
      info: "read/modify/delete external storage contents",
      description: "Allows an application to write to external storage."
    }
  ]

  return (
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
        {permissions.map((permission) => (
          <TableRow key={permission.name}>
            <TableCell className="font-mono">{permission.name}</TableCell>
            <TableCell>
              <Badge variant={permission.status === "normal" ? "default" : "destructive"}>
                {permission.status}
              </Badge>
            </TableCell>
            <TableCell>{permission.info}</TableCell>
            <TableCell>{permission.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}