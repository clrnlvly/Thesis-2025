import React from "react";
import educator from "../../../../../assets/undraw_educator_6dgp.svg";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Announcement({ className = "" }) {
    return (
        <Card className={`${className} w-full h-36 bg-gray-50 shadow-md items-center`}>
            <CardHeader>
                <CardTitle className="text-gray-900">Announcement</CardTitle>
            </CardHeader>
            <CardContent className="font-medium h-full">
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="font-medium text-2xl">
                        <span className="text-primary">(</span>{" "}
                        <span className="text-red-500">˶</span>ˆᗜˆ
                        <span className="text-red-500">˶</span>{" "}
                        <span className="text-primary">)</span>
                    </span>
                    <p className="text-sm">No Announcement Yet</p>
                </div>
            </CardContent>
        </Card>
    );
}
