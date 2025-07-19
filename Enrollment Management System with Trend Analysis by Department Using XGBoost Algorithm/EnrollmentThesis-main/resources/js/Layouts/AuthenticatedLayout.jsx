import ApplicationLogo from "@/Components/ApplicationLogo";
import DashboardNavLink from "@/Components/Breadcrumbs";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        // <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        //     <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
        //         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        //             <div className="flex h-16 justify-between">
        //                 <div className="flex">
        //                     <div className="flex shrink-0 items-center">
        //                         <Link href="/">
        //                             <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
        //                         </Link>
        //                     </div>

        //                     <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
        //                         <NavLink
        //                             href={route('dashboard')}
        //                             active={route().current('dashboard')}
        //                         >
        //                             Dashboard
        //                         </NavLink>
        //                     </div>
        //                 </div>

        //                 <div className="hidden sm:ms-6 sm:flex sm:items-center">
        //                     <div className="relative ms-3">
        //                         <Dropdown>
        //                             <Dropdown.Trigger>
        //                                 <span className="inline-flex rounded-md">
        //                                     <button
        //                                         type="button"
        //                                         className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
        //                                     >
        //                                         {user.name}

        //                                         <svg
        //                                             className="-me-0.5 ms-2 h-4 w-4"
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             viewBox="0 0 20 20"
        //                                             fill="currentColor"
        //                                         >
        //                                             <path
        //                                                 fillRule="evenodd"
        //                                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                                                 clipRule="evenodd"
        //                                             />
        //                                         </svg>
        //                                     </button>
        //                                 </span>
        //                             </Dropdown.Trigger>

        //                             <Dropdown.Content>
        //                                 <Dropdown.Link
        //                                     href={route('profile.edit')}
        //                                 >
        //                                     Profile
        //                                 </Dropdown.Link>
        //                                 <Dropdown.Link
        //                                     href={route('logout')}
        //                                     method="post"
        //                                     as="button"
        //                                 >
        //                                     Log Out
        //                                 </Dropdown.Link>
        //                             </Dropdown.Content>
        //                         </Dropdown>
        //                     </div>
        //                 </div>

        //                 <div className="-me-2 flex items-center sm:hidden">
        //                     <button
        //                         onClick={() =>
        //                             setShowingNavigationDropdown(
        //                                 (previousState) => !previousState,
        //                             )
        //                         }
        //                         className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
        //                     >
        //                         <svg
        //                             className="h-6 w-6"
        //                             stroke="currentColor"
        //                             fill="none"
        //                             viewBox="0 0 24 24"
        //                         >
        //                             <path
        //                                 className={
        //                                     !showingNavigationDropdown
        //                                         ? 'inline-flex'
        //                                         : 'hidden'
        //                                 }
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M4 6h16M4 12h16M4 18h16"
        //                             />
        //                             <path
        //                                 className={
        //                                     showingNavigationDropdown
        //                                         ? 'inline-flex'
        //                                         : 'hidden'
        //                                 }
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M6 18L18 6M6 6l12 12"
        //                             />
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>

        //         <div
        //             className={
        //                 (showingNavigationDropdown ? 'block' : 'hidden') +
        //                 ' sm:hidden'
        //             }
        //         >
        //             <div className="space-y-1 pb-3 pt-2">
        //                 <ResponsiveNavLink
        //                     href={route('dashboard')}
        //                     active={route().current('dashboard')}
        //                 >
        //                     Dashboard
        //                 </ResponsiveNavLink>
        //             </div>

        //             <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
        //                 <div className="px-4">
        //                     <div className="text-base font-medium text-gray-800 dark:text-gray-200">
        //                         {user.name}
        //                     </div>
        //                     <div className="text-sm font-medium text-gray-500">
        //                         {user.email}
        //                     </div>
        //                 </div>

        //                 <div className="mt-3 space-y-1">
        //                     <ResponsiveNavLink href={route('profile.edit')}>
        //                         Profile
        //                     </ResponsiveNavLink>
        //                     <ResponsiveNavLink
        //                         method="post"
        //                         href={route('logout')}
        //                         as="button"
        //                     >
        //                         Log Out
        //                     </ResponsiveNavLink>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>

        //     {header && (
        //         <header className="bg-white shadow dark:bg-gray-800">
        //             <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        //                 {header}
        //             </div>
        //         </header>
        //     )}

        //     <main>{children}</main>
        // </div>

        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                <div className="mx-auto max-w-7xl">
                    <div className="flex justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center gap-10">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                <h1 className="dark:text-white font-bold text-lg">
                                    Westbridge
                                </h1>
                            </div>
                        </div>
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <!-- Sidebar --> */}

            <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidenav"
                id="drawer-navigation"
            >
                <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                    <form action="#" method="GET" className="md:hidden mb-2">
                        <label htmlFor="sidebar-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="sidebar-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Search"
                            />
                        </div>
                    </form>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages"
                                data-collapse-toggle="dropdown-pages"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                    Pages
                                </span>
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-pages"
                                className="hidden py-2 space-y-2"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Kanban
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Calendar
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-sales"
                                data-collapse-toggle="dropdown-sales"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                    Sales
                                </span>
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-sales"
                                className="hidden py-2 space-y-2"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Billing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Invoice
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Messages
                                </span>
                                <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-primary-800 bg-primary-100 dark:bg-primary-200 dark:text-primary-800">
                                    4
                                </span>
                            </a>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-authentication"
                                data-collapse-toggle="dropdown-authentication"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                    Authentication
                                </span>
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-authentication"
                                className="hidden py-2 space-y-2"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Sign In
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Sign Up
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Forgot Password
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3">Docs</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                </svg>
                                <span className="ml-3">Components</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    width="24"
                                    fill="currentColor"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
                                </svg>
                                <span className="ml-3">Setting</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <main className="p-4 md:ml-64 h-auto pt-20">
                <div className="flex gap-10 mb-4">
                    {header && (
                        <header className=" dark:text-white">
                            <div className="mx-auto max-w-7xl py-2 font-medium text-lg">
                                Dashboard
                            </div>
                        </header>
                    )}
                    <DashboardNavLink />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                </div>
            </main>
        </div>
    );
}
