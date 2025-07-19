"use client";

import * as React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { TrendingUp } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { year_level: "Grade 11", payment: 186 },
    { year_level: "Grade 12", payment: 305 },
    { year_level: "1st Year", payment: 237 },
    { year_level: "2nd Year", payment: 273 },
    { year_level: "3rd Year", payment: 209 },
    { year_level: "4th Year", payment: 214 },
];

const chartConfig = {
    payment: {
        label: "payment",
        color: "hsl(var(--chart-1))",
    },
};

export default function Component() {
    const [activeChart, setActiveChart] = React.useState("payment");

    const total = React.useMemo(
        () => ({
            payment: chartData.reduce((acc, curr) => acc + curr.payment, 0),
        }),
        []
    );

    return (
        <Card className="bg-gray-50">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Radar Chart</CardTitle>
                    <CardDescription>
                        Showing the number of payments for each year level.
                    </CardDescription>
                </div>
                <div className="flex">
                    <button
                        key="payment"
                        data-active={activeChart === "payment"}
                        className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => setActiveChart("payment")}
                    >
                        <span className="text-xs text-muted-foreground">
                            {chartConfig.payment.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total.payment.toLocaleString()}
                        </span>
                    </button>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 bg-[#EEEEEE]">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <PolarAngleAxis dataKey="year_level" />
                        <PolarGrid />
                        <Radar
                            dataKey={activeChart}
                            fill="var(--color-payment)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {/* <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this year_level{" "}
                    <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    January - June 2025
                </div>
            </CardFooter>
        </Card>
    );
}
