import CarouselCard from "@/components/carousel";
import Topbar from "@/components/topbar";
import React, { useEffect, useState } from "react";
import ProgramOffer from "./Section/ProgramOffer";
import Footer from "@/components/Footer";
import ApplicationLogo from "@/components/ApplicationLogo";
import Branch from "@/components/Branch";
import Banner from "@/components/Banner";
import ChatBubbles from "@/components/ChatBubbles";
import VideoGuide from "./Section/VideoGuide";
import NoticeDialog from "@/components/noticeDialog";

export default function LandingPage({ FAQ = [], campus = [] }) {
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    useEffect(() => {
        const hasAccepted = sessionStorage.getItem("hasAcceptedNotice");
        if (!hasAccepted) {
            setIsDialogVisible(true);
        }
    }, []);

    const handleAccept = () => {
        sessionStorage.setItem("hasAcceptedNotice", "true");
        setIsDialogVisible(false);
    };
    return (
        <div className="bg-gray-200 overflow-x-hidden">
            {isDialogVisible && <NoticeDialog onAccept={handleAccept} />}
            <Topbar />
            <CarouselCard className="pt-20" />
            <Banner />
            <VideoGuide />
            <ProgramOffer />
            <Branch campus={campus} />
            <Footer className="">
                <ApplicationLogo className="h-20" />
            </Footer>
            <ChatBubbles FAQ={FAQ} className="fixed bottom-0 right-0 m-4" />
        </div>
    );
}
