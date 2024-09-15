"use client";
import { PermissionsTable } from "@/components/permissions-table";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import Loader from "@/components/ui/loader";
import { Manifest_analysis } from "@/components/manifest_anaysis";
import AndroidManifest from "@/components/androidManifest";
import { CodeAnalysis } from "@/components/code_analysis";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [file, setFile] = useState(null);
  const [hash,setHash] = useState("");
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
      setLoading(true);
      console.log(process.env.MOBSF_API_KEY, "key");

      const response = await fetch(`http://127.0.0.1:8000/api/v1/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_MOBSF_API_KEY}`,
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("UPLOADED SUCCESSFULLY");
      } else {
        console.log("FAILED FILE UPLOAD");
      }

      const hash = {
        hash: data.hash,
      };
      setHash(data.hash as string)
      const formBody = new URLSearchParams(hash).toString();

      const get_report = await fetch("http://127.0.0.1:8000/api/v1/scan", {
        method: "POST",
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_MOBSF_API_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      });

      const final_report = await get_report.json();
      console.log(final_report);
      setReport(final_report);
      setLoading(false);
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
      {loading ? (
        <Loader />
      ) : report ? (
        <div className="p-2 m-4 ">
          <AndroidManifest hash={hash}/>
          
          <div className="mt-4 shadow-2xl p-3 rounded-md">
          <label htmlFor="PermissionsTable" className="bold m-4 font-medium">
            {" "}
            APPLICATION PERMISSIONS
          </label>
          <PermissionsTable permissions={report.permissions} />
          </div>
          <div className="mt-4 shadow-2xl p-3 rounded-md">
            <label htmlFor="manifest analysis" className="bold m-4 font-medium">
              ANDROID MANIFEST.XML ANALYSIS{" "}
            </label>
            <Manifest_analysis manifest_analysis={report.manifest_analysis}/>
          </div>
          <div className="mt-4 shadow-2xl p-3 rounded-md">
          <label htmlFor="manifest analysis" className="bold m-4 font-medium">
              MOBSF CODE ANALYSIS{" "}
            </label>
            <CodeAnalysis findings={report.code_analysis.findings} summary={report.code_analysis.summary}/>
          </div>
        </div>
      ) : null}
    </div>
  );
}
