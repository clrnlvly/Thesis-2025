import Checkbox from "@/components/Checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Schedule({ subject, setSched, section, initialData }) {
    const [disable, setDisable] = useState(false);

    const { data, setData, errors, post, put } = useForm({
        section_name: section.name,
        subject_code: subject.code,
        prof_name: initialData?.prof_name || "",
        monday_start: initialData?.monday?.split(" - ")[0] || "",
        monday_end: initialData?.monday?.split(" - ")[1] || "",
        tuesday_start: initialData?.tuesday?.split(" - ")[0] || "",
        tuesday_end: initialData?.tuesday?.split(" - ")[1] || "",
        wednesday_start: initialData?.wednesday?.split(" - ")[0] || "",
        wednesday_end: initialData?.wednesday?.split(" - ")[1] || "",
        thursday_start: initialData?.thursday?.split(" - ")[0] || "",
        thursday_end: initialData?.thursday?.split(" - ")[1] || "",
        friday_start: initialData?.friday?.split(" - ")[0] || "",
        friday_end: initialData?.friday?.split(" - ")[1] || "",
        saturday_start: initialData?.saturday?.split(" - ")[0] || "",
        saturday_end: initialData?.saturday?.split(" - ")[1] || "",
    });

    const [enabledDays, setEnabledDays] = useState({
        monday: !!initialData?.monday,
        tuesday: !!initialData?.tuesday,
        wednesday: !!initialData?.wednesday,
        thursday: !!initialData?.thursday,
        friday: !!initialData?.friday,
        saturday: !!initialData?.saturday,
    });

    const toggleEnable = (day) => {
        const isEnabled = !enabledDays[day];
        setEnabledDays((prev) => ({
            ...prev,
            [day]: isEnabled,
        }));

        if (!isEnabled) {
            setData({
                ...data,
                [`${day}_start`]: null,
                [`${day}_end`]: null,
            });
        }
    };

    const handleSubmit = () => {
        if (initialData) {
            post(route("admin.schedule.update", initialData.id), {
                onSuccess: () => {
                    toast("Schedule has been updated", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setSched(false);
                },
            });
        } else {
            post(route("admin.schedule.store"), {
                onSuccess: () => {
                    toast("Schedule has been created", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setSched(false);
                },
            });
        }
    };

    return (
        <div className="mt-3 space-y-4">
            <div>
                <div>
                    <div className="flex justify-between">
                        <Label htmlFor="name">Subject</Label>
                        <p className="font-medium text-gray-900 underline">
                            {subject.code}: {subject.name}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <Label>Section:</Label>
                        <p className="font-medium text-gray-900 underline">
                            {section.name}
                        </p>
                    </div>
                </div>
                <div>
                    <Label htmlFor="prof_name">Professor Name</Label>
                    <Input
                        name="prof_name"
                        type="text"
                        value={data.prof_name}
                        onChange={(e) => setData("prof_name", e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col items-center w-24">
                    <Label htmlFor="monday">Monday</Label>
                    <Checkbox
                        className="mt-2"
                        name="monday"
                        checked={enabledDays.monday}
                        onClick={() => toggleEnable("monday")}
                    />
                </div>
                <div className="w-full grid gap-4 grid-cols-2">
                    <input
                        type="time"
                        id="monday_start"
                        name="monday_start"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.monday}
                        value={data.monday_start || ""}
                        onChange={(e) =>
                            setData("monday_start", e.target.value)
                        }
                    />
                    <input
                        type="time"
                        id="monday_end"
                        name="monday_end"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.monday}
                        value={data.monday_end || ""}
                        onChange={(e) => setData("monday_end", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col items-center w-24">
                    <Label htmlFor="tuesday">Tuesday</Label>
                    <Checkbox
                        className="mt-2"
                        name="tuesday"
                        checked={enabledDays.tuesday}
                        onClick={() => toggleEnable("tuesday")}
                    />
                </div>
                <div className="w-full grid gap-4 grid-cols-2">
                    <input
                        type="time"
                        id="tuesday_start"
                        name="tuesday_start"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.tuesday}
                        value={data.tuesday_start || ""}
                        onChange={(e) =>
                            setData("tuesday_start", e.target.value)
                        }
                    />
                    <input
                        type="time"
                        id="tuesday_end"
                        name="tuesday_end"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.tuesday}
                        value={data.tuesday_end || ""}
                        onChange={(e) => setData("tuesday_end", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col items-center w-24">
                    <Label htmlFor="wednesday">Wednesday</Label>
                    <Checkbox
                        className="mt-2"
                        name="wednesday"
                        checked={enabledDays.wednesday}
                        onClick={() => toggleEnable("wednesday")}
                    />
                </div>
                <div className="w-full grid gap-4 grid-cols-2">
                    <input
                        type="time"
                        id="wednesday_start"
                        name="wednesday_start"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.wednesday}
                        value={data.wednesday_start || ""}
                        onChange={(e) =>
                            setData("wednesday_start", e.target.value)
                        }
                    />
                    <input
                        type="time"
                        id="wednesday_end"
                        name="wednesday_end"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.wednesday}
                        value={data.wednesday_end || ""}
                        onChange={(e) =>
                            setData("wednesday_end", e.target.value)
                        }
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col items-center w-24">
                    <Label htmlFor="thursday">Thursday</Label>
                    <Checkbox
                        className="mt-2"
                        name="thursday"
                        checked={enabledDays.thursday}
                        onClick={() => toggleEnable("thursday")}
                    />
                </div>
                <div className="w-full grid gap-4 grid-cols-2">
                    <input
                        type="time"
                        id="thursday_start"
                        name="thursday_start"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.thursday}
                        value={data.thursday_start || ""}
                        onChange={(e) =>
                            setData("thursday_start", e.target.value)
                        }
                    />
                    <input
                        type="time"
                        id="thursday_end"
                        name="thursday_end"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.thursday}
                        value={data.thursday_end || ""}
                        onChange={(e) =>
                            setData("thursday_end", e.target.value)
                        }
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col items-center w-24">
                    <Label htmlFor="friday">Friday</Label>
                    <Checkbox
                        className="mt-2"
                        name="friday"
                        checked={enabledDays.friday}
                        onClick={() => toggleEnable("friday")}
                    />
                </div>
                <div className="w-full grid gap-4 grid-cols-2">
                    <input
                        type="time"
                        id="friday_start"
                        name="friday_start"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.friday}
                        value={data.friday_start || ""}
                        onChange={(e) =>
                            setData("friday_start", e.target.value)
                        }
                    />
                    <input
                        type="time"
                        id="friday_end"
                        name="friday_end"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.friday}
                        value={data.friday_end || ""}
                        onChange={(e) => setData("friday_end", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col items-center w-24">
                    <Label htmlFor="saturday">Saturday</Label>
                    <Checkbox
                        className="mt-2"
                        name="saturday"
                        checked={enabledDays.saturday}
                        onClick={() => toggleEnable("saturday")}
                    />
                </div>
                <div className="w-full grid gap-4 grid-cols-2">
                    <input
                        type="time"
                        id="saturday_start"
                        name="saturday_start"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.saturday}
                        value={data.saturday_start || ""}
                        onChange={(e) =>
                            setData("saturday_start", e.target.value)
                        }
                    />
                    <input
                        type="time"
                        id="saturday_end"
                        name="saturday_end"
                        className="h-10 rounded-md w-full"
                        disabled={!enabledDays.saturday}
                        value={data.saturday_end || ""}
                        onChange={(e) =>
                            setData("saturday_end", e.target.value)
                        }
                    />
                </div>
            </div>

            <Button className="mt-3" onClick={handleSubmit}>
                {initialData ? "Update" : "Save"}
            </Button>
        </div>
    );
}
