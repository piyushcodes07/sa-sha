'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


interface ManifestFinding {
  rule: string;        
  title: string;         
  severity: 'high' | 'warning' | 'info'; 
  description: string;     
  name: string;           
}

type ManifestFindings = ManifestFinding[];

interface ManifestSummary {
  high: number;            
  info: number;            
  suppressed: number;      
  warning: number;         
}

interface ManifestAnalysis {
  manifest_findings: ManifestFindings;  
  manifest_summary: ManifestSummary;    
}



export function Manifest_analysis({manifest_analysis}:{manifest_analysis:ManifestAnalysis}) {
console.log(manifest_analysis.manifest_findings);

  return (
    <div className="p-4">
      <div className="flex  mb-4">
        <Badge variant="destructive">HIGH: {manifest_analysis.manifest_summary.high}</Badge>
        <Badge variant="outline">WARNING: {manifest_analysis.manifest_summary.warning}</Badge>
        <Badge variant="secondary">INFO: {manifest_analysis.manifest_summary.info}</Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ISSUE</TableHead>
            <TableHead>SEVERITY</TableHead>
            <TableHead>DESCRIPTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {manifest_analysis.manifest_findings.map((issue) => (
            <TableRow >
              <TableCell>{issue.name}</TableCell>
              <TableCell>
                <Badge variant={issue.severity === "high" ? "destructive" : "warning"}>
                  {issue.severity}
                </Badge>
              </TableCell>
              <TableCell>{issue.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}