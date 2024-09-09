'use client'

import { Button } from "@/components/ui/button"
import {  Clock } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  
   
    
  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <Link href="/" className="text-2xl font-bold">
        Sa-sha
      </Link>
      <p>a Next gen, GenAI powered  static analyser for android</p>
      <div className="flex items-center space-x-4">
        <Button variant="secondary" size="sm" className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          Recent Scans
        </Button>



      </div>
    </nav>
  )
}