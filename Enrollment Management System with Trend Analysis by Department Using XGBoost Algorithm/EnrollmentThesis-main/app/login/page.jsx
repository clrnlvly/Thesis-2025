import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import ApplicationLogo from "@/components/application-logo";

export default function LoginPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex max-w-sm flex-col gap-6">
                <a
                    href="#"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md  text-primary-foreground">
                        <ApplicationLogo />
                    </div>
                    <span className="font-bold text-lg">WITI</span>
                </a>
                <LoginForm />
            </div>
        </div>
    );
}
