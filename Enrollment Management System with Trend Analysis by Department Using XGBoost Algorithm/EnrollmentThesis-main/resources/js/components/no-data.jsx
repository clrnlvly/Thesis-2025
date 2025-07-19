import React from "react";
import no_data from "../../assets/undraw_no-data_ig65.svg";
import { Label } from "./ui/label";

export default function NoData() {
    return (
        <div className="flex flex-col justify-center items-center">
            <img src={no_data} alt="no data" className="h-40" />
            <div className="text-primary text-center py-4">
                <Label>No Data</Label>
            </div>
        </div>
    );
}
