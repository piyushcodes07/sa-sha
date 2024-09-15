'use client'

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type Severity = 'high' | 'warning' | 'info' | 'secure'

type Finding = {
  files: Record<string, string>
  metadata: {
    cvss: number
    cwe: string
    'owasp-mobile': string
    masvs: string
    ref?: string
    description: string
    severity: Severity
  }
}

type SecurityReportProps = {
  findings: Record<string, Finding>
  summary: Record<Severity | 'suppressed', number>
}

export function CodeAnalysis({ findings, summary }: SecurityReportProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFindings = Object.entries(findings).filter(([key, finding]) =>
    key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finding.metadata.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const severityColor: Record<Severity, string> = {
    high: 'destructive',
    warning: 'warning',
    info: 'secondary',
    secure: 'success'
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between mb-4 gap-2">
        {Object.entries(summary).map(([severity, count]) => (
          <Badge key={severity} variant={severityColor[severity as Severity] || 'outline'}>
            {severity.toUpperCase()}: {count}
          </Badge>
        ))}
      </div>
      <div className="flex justify-end mb-4">
        <Input
          className="w-64"
          placeholder="Search:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead className="w-[50px]">NO</TableHead>
            <TableHead>ISSUE</TableHead>
            <TableHead>SEVERITY</TableHead>
            <TableHead>STANDARDS</TableHead>
            <TableHead>FILES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFindings.map(([key, finding], index) => (
            <TableRow className='bg-blue-100 border-white border-2' key={key}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{finding.metadata.description}</TableCell>
              <TableCell>
                <Badge variant={severityColor[finding.metadata.severity]}>
                  {finding.metadata.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <div>CWE: {finding.metadata.cwe}</div>
                {finding.metadata['owasp-mobile'] && (
                  <div>OWASP Mobile: {finding.metadata['owasp-mobile']}</div>
                )}
                {finding.metadata.masvs && <div>MASVS: {finding.metadata.masvs}</div>}
              </TableCell>
              <TableCell>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">Show Files</Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    {Object.entries(finding.files).map(([file, lines]) => (
                      <div key={file} className="text-sm">
                        {file} (lines: {lines})
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}