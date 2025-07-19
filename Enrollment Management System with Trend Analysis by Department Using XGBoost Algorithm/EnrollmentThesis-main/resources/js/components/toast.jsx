"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

toast("Event has been created", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
});

export function Sonner() {
    return <Button variant="outline"></Button>;
}
