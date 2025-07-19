import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import { useForm } from "@inertiajs/react";
import { ArrowDown, ArrowRight, Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function FAQ({ faq = [] }) {
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    const {
        data,
        setData,
        post,
        delete: onDelete,
    } = useForm({
        question: "",
        answer: "",
    });

    const handleSubmit = () => {
        post(route("admin.setting.general.faq"), {
            onSuccess: () => {
                toast("FAQ has been created.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setData({
                    answer: "",
                    question: "",
                });
            },
        });
    };

    const handleDelete = (faq) => {
        onDelete(route("admin.setting.general.faq-destroy", { id: faq.id }), {
            onSuccess: () => {
                toast("FAQ has been deleted.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
            },
        });
    };

    const handleCancel = () => {
        setData({
            answer: "",
            question: "",
        });
    };

    const handleEdit = (faq) => {
        setSelectedFAQ((prev) => (prev && prev.id === faq.id ? null : faq));
    };

    const handleUpdate = () => {
        post(
            route("admin.setting.general.faq-update", { id: selectedFAQ.id }),
            {
                onSuccess: () => {
                    toast("FAQ has been updated.", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setData({
                        answer: "",
                        question: "",
                    });
                    setSelectedFAQ(null);
                },
            }
        );
    };

    return (
        <div className="space-y-4">
            <h1 className="text-lg font-medium text-gray-900">FAQ</h1>

            <div className="border shadow-sm ">
                <div className="p-4 w-[500px] space-y-4">
                    <div className="flex items-center gap-4">
                        <Label className="w-24">Question</Label>
                        <Input
                            name="question"
                            id="question"
                            value={data.question}
                            onChange={(e) =>
                                setData("question", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Label className="w-24">Answer</Label>
                        <Textarea
                            className="h-24"
                            name="answer"
                            id="answer"
                            value={data.answer}
                            onChange={(e) => setData("answer", e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button
                            disabled={
                                data.question.length <= 0 ||
                                data.answer.length <= 0
                            }
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                        <Button
                            className="bg-gray-600 hover:bg-gray-500"
                            disabled={
                                data.question.length <= 0 ||
                                data.answer.length <= 0
                            }
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border shadow-sm ">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200">
                        <thead className="ltr:text-left rtl:text-right bg-slate-50 ">
                            <tr className="*:font-medium table-fixed *:text-gray-700">
                                <th className="w-1/12 text-sm py-1 text-wrap">
                                    Question
                                </th>
                                <th className="w-1/12 text-sm py-1 text-wrap">
                                    Answer
                                </th>
                                <th className="w-1/12 text-sm py-1 text-wrap">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                            {faq.map((faqItem) => (
                                <React.Fragment key={faqItem.id}>
                                    <tr className="*:text-gray-900 table-fixed *:first:font-medium">
                                        <td className="w-1/12 text-sm py-1 text-center text-wrap">
                                            {faqItem.question}
                                        </td>
                                        <td className="w-1/12 text-sm py-1 text-center text-wrap">
                                            {faqItem.answer}
                                        </td>

                                        <td className="w-1/12 py-1 text-wrap">
                                            <div className="flex justify-center gap-2">
                                                <Edit
                                                    className="h-5 text-green-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleEdit(faqItem)
                                                    }
                                                />
                                                <Trash
                                                    className="h-5 text-red-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleDelete(faqItem)
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    {selectedFAQ &&
                                        selectedFAQ.id === faqItem.id && (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="py-2 px-4 text-center"
                                                >
                                                    <div className="bg-gray-100 p-4 rounded-md">
                                                        <h2 className="font-semibold">
                                                            Question:
                                                        </h2>
                                                        <div className="flex flex-col items-center">
                                                            {faqItem.question}
                                                            <ArrowDown className="h-5 " />
                                                            <Input
                                                                className=" max-w-96"
                                                                name="question"
                                                                id="question"
                                                                value={
                                                                    data.question
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "question",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <h2 className="font-semibold mt-4">
                                                            Answer:
                                                        </h2>
                                                        <div className="flex flex-col items-center">
                                                            {faqItem.answer}
                                                            <ArrowDown className="h-5" />
                                                            <Textarea
                                                                className="h-24 max-w-96"
                                                                name="answer"
                                                                id="answer"
                                                                value={
                                                                    data.answer
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "answer",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="space-x-4 mt-4">
                                                            <Button
                                                                disabled={
                                                                    data
                                                                        .question
                                                                        .length <=
                                                                        0 ||
                                                                    data.answer
                                                                        .length <=
                                                                        0
                                                                }
                                                                onClick={
                                                                    handleUpdate
                                                                }
                                                            >
                                                                Update
                                                            </Button>
                                                            <Button
                                                                className="bg-gray-600 hover:bg-gray-500"
                                                                disabled={
                                                                    data
                                                                        .question
                                                                        .length <=
                                                                        0 ||
                                                                    data.answer
                                                                        .length <=
                                                                        0
                                                                }
                                                                onClick={
                                                                    handleCancel
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
