import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Stats({
    card_title,
    card_footer,
    card_content,
    className = "",
}) {
    const content = {};

    return (
        <Card
            className={`${className} w-full h-24 bg-gray-50 grid grid-cols-[70%_30%] justify-center items-center`}
        >
            <div>
                <CardHeader>
                    <CardTitle className="text-gray-900">
                        {card_title}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="text-[12px] text-gray-500">
                    {card_footer}
                </CardFooter>
            </div>
            <div>
                <CardContent className="text-4xl font-medium text-end">
                    {card_content}
                </CardContent>
            </div>
        </Card>
    );
}
