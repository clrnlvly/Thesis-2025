import { usePage } from "@inertiajs/react";
import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export default function Component() {
    const { shsEnrolledCount = [], collegeEnrolledCount = [] } =
        usePage().props;

    console.log(shsEnrolledCount);

    const chartData = React.useMemo(() => {
        const mergedData = [];

        shsEnrolledCount.forEach((shsData) => {
            const collegeData = collegeEnrolledCount.find(
                (college) => college.date === shsData.date
            );
            mergedData.push({
                date: shsData.date,
                Senior_High_School: shsData.count,
                College: collegeData ? collegeData.count : 0,
            });
        });

        collegeEnrolledCount.forEach((collegeData) => {
            if (!mergedData.find((item) => item.date === collegeData.date)) {
                mergedData.push({
                    date: collegeData.date,
                    Senior_High_School: 0,
                    College: collegeData.count,
                });
            }
        });

        return mergedData;
    }, [shsEnrolledCount, collegeEnrolledCount]);

    const total = React.useMemo(
        () => ({
            Senior_High_School: chartData.reduce(
                (acc, curr) => acc + curr.Senior_High_School,
                0
            ),
            College: chartData.reduce((acc, curr) => acc + curr.College, 0),
        }),
        [chartData]
    );

    const [activeChart, setActiveChart] = React.useState("Senior_High_School");

    return (
        <Card className="bg-gray-50">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Student Enrolled</CardTitle>
                    <CardDescription>
                        Showing total students enrolled
                    </CardDescription>
                </div>
                <div className="flex">
                    {["Senior_High_School", "College"].map((key) => {
                        return (
                            <button
                                key={key}
                                data-active={activeChart === key}
                                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(key)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {key}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 bg-[#EEEEEE]">
                <ChartContainer
                    config={{}} // Assuming config is not relevant to change
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey={activeChart}
                            type="monotone"
                            stroke={`var(--color-${activeChart})`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
