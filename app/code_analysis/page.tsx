// Code_analysis.js

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Loader from "@/components/ui/loader";
import axios from "axios";


export default function CodeAnalysis() {
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash");
  const file = searchParams.get("file");
  const type = searchParams.get("type");
  const [ line , setLine] = useState(null)
  const lines = searchParams.get('lines')?.split(',')
  console.log(lines);
  


  
  
  
  console.log(hash, file, type);
  // Consider hardcoding if always 'apk'
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // Set initial data to null for clarity

  // Enhanced error handling and user feedback
  const [error, setError] = useState(null);

  async function getCode() {
    setLoading(true); // Set loading state before fetch
    setError(null); // Clear previous errors

    try {
      const data = {
        hash: hash,
        file: file,
        type: type,
      };
      console.log(data, "DATA");

      axios
        .post("http://127.0.0.1:8000/api/v1/view_source", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `${process.env.NEXT_PUBLIC_MOBSF_API_KEY}`,
          },
        })
        .then((response) => {
          console.log(response.data); // Handle the response data
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error fetching code:", error);
    } finally {
      setLoading(false); // Set loading state after fetch, even on errors
    }
  }

  useEffect(() => {
    getCode();
    const lines = searchParams.get('lines')?.split(',')
    setLine(lines)
  }, []); // Empty dependency array ensures fetching on component mount

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <p className="error-message">Error: {error}</p>
          {/* Optionally display a retry button */}
        </div>
      ) : (
        <div>
          <SyntaxHighlighter language="java" style={dracula}
           showLineNumbers
           wrapLines
           lineProps={lineNumber => {
             let style = { display: "block" };
             if (lines.includes(String(lineNumber))) {
               style.backgroundColor = "red"; // Highlight specific line
             }
             return { style };
           }}
          >
            {/* Replace 'hi' with data.data if available */}
            {data?.data || "No data available"}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
