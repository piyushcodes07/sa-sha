import { useState } from "react";

export default function AndroidManifest({ hash }: { hash: string }) {
  const [loading, setLoading] = useState(false);

  const handleGetManifest = async () => {
    try {
      const body = {
        hash,
        file: "AndroidManifest.xml",
        type: "apk",
      };
      const formBody = new URLSearchParams(body).toString()
      console.log(body)
      const res =await fetch("http://127.0.0.1:8000/api/v1/view_source", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded", 
          Authorization: process.env.NEXT_PUBLIC_MOBSF_API_KEY as string,
        },
        body: formBody,
      });
      console.log(await res.json())
    } catch (error) {
      console.log("error in fetching manifest ", error);
    }
  };

  return (
    <div className=" shadow-md p-2  flex flex-col items-start">
      <h1 className="font-semibold mb-3">Android Manifest</h1>

      <button className="bg-blue-400 p-2 rounded-sm text-white" onClick={handleGetManifest}>
        View AndroidManifest.xml
      </button>
    </div>
  );
}
