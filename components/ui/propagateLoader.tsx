import {  CSSProperties } from "react";
import { PropagateLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function PropagateLoaderr() {

  return (
    <div>
    <div className="flex items-center justify-center sweet-loading">
      <PropagateLoader
        color={`#111827`}
        loading={true}
        cssOverride={override}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      
    </div>
    <div>
    {/* <h1 className="text-lg text-center"></h1> */}
    </div>
    </div>
  );
}

export default PropagateLoaderr;