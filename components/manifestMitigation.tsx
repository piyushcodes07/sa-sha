import { useState } from "react";
import { PropagateLoader } from "react-spinners";
import { format_instructions } from "@/app/api/manifest_analysis/route";

export default function ManifestMitigation(params: any) {
  console.log("LOG", params.params);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<format_instructions>();

  async function handelGetMitigations() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/manifest_analysis", {
        method: "POST",
        body: JSON.stringify(params.params),
      });

      const mitigation_report = await res.json();
      console.log(mitigation_report);
      setData(mitigation_report);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button
        type="button"
        className="text-white bg-gradient-to-br mb-4 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handelGetMitigations}
      >
        Mitigations Summary with
        <span className="text-wrap text-neon-700 text-xl font-bold"> AI</span>
      </button>

      <div>
        {loading ? (
          <div className="flex justify-center items-start">
            <PropagateLoader />
          </div>
        ) : (
            data?
           <div className="border-4 border-[#8a39e8] rounded-lg p-4">
            {data?.vulnerabilities.map((value, key) => (
              <div className="m-2" key={key}>
                <h1 className="flex justify-start font-medium  font-sans text-lg">
                  {key + 1 + ` )` + ` ${value.issue}`}
                </h1>
                <div>
                  <h1 className="ml-6">‣ Mitigation:</h1>
                  <h1 className="text-base ml-10 font-sarif">
                    {`• ` + value.mitigation}
                  </h1>
                </div>
              </div>
            ))}
          </div>:null
        )}
      </div>
    </div>
  );
}
