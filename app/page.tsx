'use client'
import { PermissionsTable } from "@/components/permissions-table";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
export default function Home() {

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `155cb39d86fe505bc7cc6f1840a232453b6b83fa1835848cc1f78721ac4145c8`,
        },
      });

      const data = await response.json();
      console.log(data);


      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("File upload failed");
      }
      
      const hash = {
        hash:data.hash
      }
      const formBody = new URLSearchParams(hash).toString();

      const get_report = await fetch('http://127.0.0.1:8000/api/v1/scan',{
        method:'POST',
        headers: {
          Authorization: `155cb39d86fe505bc7cc6f1840a232453b6b83fa1835848cc1f78721ac4145c8`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:formBody
      });

      const report = await get_report.json()
      console.log(report);
      

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          className="flex items-center"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload APK
        </Button>
      </form>

      <PermissionsTable />
    </div>
  );
}
