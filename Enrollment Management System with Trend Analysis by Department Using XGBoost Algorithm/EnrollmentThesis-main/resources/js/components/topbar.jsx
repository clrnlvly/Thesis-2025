import React from "react";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuIcon } from "lucide-react";
import ApplicationLogo from "./application-logo";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";

const navigation = [
    { name: "Login", href: route("login"), current: false },
    {
        name: "Apply Now",
        href: route("landing-page.section.application"),
        current: false,
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Topbar() {
    const about = [
        {
            title: "FAQ",
            href: route("landing-page.section.FAQ"),
        },
    ];

    const admission = [
        {
            title: "Requirements",
            href: route("landing-page.section.Requirements"),
        },
        {
            title: "Tuition Fee",
            href: route("public.payment.details"),
        },
        {
            title: "Payment Form",
            href: route("public.payment.submit"),
        },
        {
            title: "Admission Guide",
            href: route("public.admission.guide"),
        },
    ];

    const program = [
        {
            title: "Senior High School",
            href: route("landing-page.section.SHS"),
        },
        {
            title: "College",
            href: route("landing-page.section.College"),
        },
    ];

    return (
        <Disclosure
            as="nav"
            className="bg-white border-b shadow-sm fixed top-0 right-0 left-0 z-40"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-end">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset z-50 md:z-50">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon />
                        </DisclosureButton>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="opacity-0 md:opacity-100 shrink-0 items-center pr-4">
                            <ApplicationLogo className="h-14 w-auto" />
                        </div>
                        <div className="flex shrink-0 items-center md:hidden absolute right-0 pr-4">
                            <ApplicationLogo className="h-14 w-auto" />
                        </div>
                        <div className="hidden sm:ml-6 md:flex items-center justify-center">
                            <div className="flex">
                                <NavigationMenu>
                                    <NavigationMenuItem>
                                        <Link
                                            className="text-black inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                            href={route("home")}
                                        >
                                            Home
                                        </Link>
                                    </NavigationMenuItem>
                                </NavigationMenu>
                                <NavigationMenu>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>
                                            About
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid p-4 w-[200px]">
                                                {about.map((component) => (
                                                    <ListItem
                                                        key={component.title}
                                                        title={component.title}
                                                        href={component.href}
                                                    >
                                                        {component.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenu>
                                <NavigationMenu>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>
                                            Admission
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid p-4 w-[200px]">
                                                {admission.map((admission) => (
                                                    <ListItem
                                                        key={admission.title}
                                                        title={admission.title}
                                                        href={admission.href}
                                                    >
                                                        {admission.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenu>
                                <NavigationMenu>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>
                                            Program
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid p-4 w-[200px]">
                                                {program.map((program) => (
                                                    <ListItem
                                                        key={program.title}
                                                        title={program.title}
                                                        href={program.href}
                                                    >
                                                        {program.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenu>
                            </div>
                        </div>
                    </div>

                    {/* Right-side buttons */}
                    <div className="hidden gap-2 inset-y-0 right-0 md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Link href={route("login")}>
                            <Button>Login</Button>
                        </Link>
                        <Link href={route("landing-page.section.application")}>
                            <Button className="group flex items-center bg-transparent relative overflow-hidden border border-indigo-600 px-8 py-3 focus:ring-3 focus:outline-hidden">
                                <span className="absolute inset-y-0 right-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
                                <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                    Apply Now
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current
                                    ? "bg-primary text-white"
                                    : "text-gray-900 hover:bg-primary hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}

                    {/* About */}
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <DisclosureButton className="w-full font-medium text-left p-3 rounded-md hover:bg-primary hover:text-white focus:bg-gray-50 focus:text-gray-900">
                                    About
                                    <span className="px-2">⮯</span>
                                </DisclosureButton>
                                <DisclosurePanel className="pl-4">
                                    <ul>
                                        <li>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <DisclosureButton className="w-full font-medium text-left hover:bg-primary rounded-lg hover:text-white focus:bg-primary focus:text-white">
                                                            <Link
                                                                href={route(
                                                                    "landing-page.section.FAQ"
                                                                )}
                                                                className="block px-4 py-2 text-gray-900  hover:text-white"
                                                            >
                                                                {" "}
                                                                <span className="pr-2">
                                                                    ↳
                                                                </span>
                                                                FAQ
                                                            </Link>
                                                        </DisclosureButton>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </li>
                                    </ul>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>

                    {/* Admission */}
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <DisclosureButton className="w-full font-medium text-left p-3 rounded-md hover:bg-primary hover:text-white focus:bg-gray-50 focus:text-gray-900">
                                    Admission
                                    <span className="px-2">⮯</span>
                                </DisclosureButton>
                                <DisclosurePanel className="pl-4">
                                    <ul>
                                        <li>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <DisclosureButton className="w-full font-medium text-left hover:bg-primary rounded-lg hover:text-white focus:bg-primary focus:text-white">
                                                            <Link
                                                                href={route(
                                                                    "landing-page.section.Requirements"
                                                                )}
                                                                className="block px-4 py-2 text-gray-900  hover:text-white"
                                                            >
                                                                {" "}
                                                                <span className="pr-2">
                                                                    ↳
                                                                </span>
                                                                Requirements
                                                            </Link>
                                                        </DisclosureButton>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </li>
                                        <li>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <DisclosureButton className="w-full font-medium text-left hover:bg-primary rounded-lg hover:text-white focus:bg-customBlue focus:text-white">
                                                            <Link
                                                                href={route(
                                                                    "public.payment.details"
                                                                )}
                                                                className="block px-4 py-2 text-gray-900  hover:text-white"
                                                            >
                                                                <span className="pr-2">
                                                                    ↳
                                                                </span>
                                                                Tuition Fee
                                                            </Link>
                                                        </DisclosureButton>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </li>
                                        <li>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <DisclosureButton className="w-full font-medium text-left hover:bg-primary rounded-lg hover:text-white focus:bg-customBlue focus:text-white">
                                                            <Link
                                                                href={route(
                                                                    "public.admission.guide"
                                                                )}
                                                                className="block px-4 py-2 text-gray-900  hover:text-white"
                                                            >
                                                                <span className="pr-2">
                                                                    ↳
                                                                </span>
                                                                Admission Guide
                                                            </Link>
                                                        </DisclosureButton>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </li>
                                    </ul>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>

                    {/* Program */}
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <DisclosureButton className="w-full font-medium text-left p-3 rounded-md hover:bg-primary hover:text-white focus:bg-gray-50 focus:text-gray-900">
                                    Program
                                    <span className="px-2">⮯</span>
                                </DisclosureButton>
                                <DisclosurePanel className="pl-4">
                                    <ul>
                                        <li>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <DisclosureButton className="w-full font-medium text-left hover:bg-primary rounded-lg hover:text-white focus:bg-primary focus:text-white">
                                                            <Link
                                                                href={route(
                                                                    "landing-page.section.SHS"
                                                                )}
                                                                className="block px-4 py-2 text-gray-900  hover:text-white"
                                                            >
                                                                {" "}
                                                                <span className="pr-2">
                                                                    ↳
                                                                </span>
                                                                Senior High
                                                                School
                                                            </Link>
                                                        </DisclosureButton>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </li>
                                        <li>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <DisclosureButton className="w-full font-medium text-left hover:bg-primary rounded-lg hover:text-white focus:bg-customBlue focus:text-white">
                                                            <Link
                                                                href={route(
                                                                    "landing-page.section.College"
                                                                )}
                                                                className="block px-4 py-2 text-gray-900  hover:text-white"
                                                            >
                                                                <span className="pr-2">
                                                                    ↳
                                                                </span>
                                                                College
                                                            </Link>
                                                        </DisclosureButton>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </li>
                                    </ul>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}

const ListItem = React.forwardRef(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">
                            {title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    }
);

ListItem.displayName = "ListItem";

export { ListItem };
