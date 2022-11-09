import { EggAlt } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import React from "react";

export default function AppSpin() {
  return (
    <div className="absolute flex justify-center items-center top-0 bottom-0 left-0 w-full h-full ">
      <div>
        <div className="py-0 ">
          <div className="py-4 px-4 flex justify-center items-center mb-4 bg-edge-blue rounded-md">
            <p className="text-snack-sky">
              <EggAlt style={{ width: 48, height: 48 }} />
            </p>
            <p className="font-extrabold ml-2 text-snack-sky">SNACK</p>
          </div>
        </div>
        <LinearProgress />
      </div>
    </div>
  );
}
