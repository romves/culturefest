import { cn } from "@/lib/utils";
import { User as UserType } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import {
    CreditCard,
    LayoutDashboard,
    LogOut,
    Settings,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface INavbarProps {
    variant?: "dark" | "light" | "default";
}

export default function Navbar({ variant = "default" }: INavbarProps) {
    const { user } = usePage().props.auth as { user: UserType };
    const role =
        user?.roles?.[0]?.name ??
        ("user" as "admin" | "event-organizer" | "user");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > (window.screen.availHeight / 100) * 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        });
    }, []);

    function getVariant(variant: string) {
        switch (variant) {
            case "dark":
                return "bg-neutral-300/30 text-black";
            case "light":
                return "bg-black/30 text-white";
            case "default":
                return "";
        }
    }

    return (
        <nav
            className={cn(
                "fixed w-screen h-16 z-50 transition-colors px-8 font-jakarta"
            )}
        >
            <div
                className={cn(
                    isScrolled && variant == "default"
                        ? "  bg-neutral-300/30"
                        : "text-white bg-neutral-500/30",
                    getVariant(variant),
                    "container flex md:grid items-center h-full grid-cols-3 my-4 rounded-full backdrop-blur-lg transition-all justify-between"
                )}
            >
                <ul className="hidden gap-4 text-lg md:flex">
                    {Links.map((link) => (
                        <li key={link.id}>
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                    ))}
                </ul>

                <Link href="/" className="flex items-center gap-3 md:mx-auto">
                    <WebLogo isScrolled={isScrolled} variant={variant} />
                    <h1 className="text-lg font-bold">CultureFest</h1>
                </Link>

                <div className="flex justify-end">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.pang" />
                                    <AvatarFallback>
                                        {user.name
                                            .split(" ")
                                            .map((name: string) => name[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {role == "admin" ||
                                        (role == "event-organizer" && (
                                            <DropdownMenuItem asChild>
                                                <Link href="/dashboard">
                                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                                    <span>Dashboard</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}

                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">
                                            <User className="w-4 h-4 mr-2" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={route("recent-order")}>
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            <span>Recent Order</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem>
                                        <Settings className="w-4 h-4 mr-2" />
                                        <span>Settings</span>
                                    </DropdownMenuItem> */}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => router.post(route("logout"))}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="ghost">
                            <Link href="/login" className="">
                                Login
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}

const Links = [
    {
        id: 1,
        name: "Home",
        href: "/",
    },
    {
        id: 2,
        name: "Event",
        href: "/events",
    },
    {
        id: 5,
        name: "Partnership",
        href: "/partnership",
    },
];

function WebLogo({
    isScrolled,
    variant,
}: {
    isScrolled: boolean;
    variant: "dark" | "light" | "default";
}) {
    return (
        <svg
            width="26"
            height="30"
            viewBox="0 0 26 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20.1842 18.1909L24.1755 14.0159C24.1755 11.1531 23.4912 8.40958 22.2369 6.0239L12.943 15.0299V30H14.7105C20.9254 30 26 24.7515 26 18.1909H20.1842Z"
                fill={
                    isScrolled && variant == "default"
                        ? "black"
                        : variant == "dark"
                        ? "black"
                        : "white"
                }
                style={{
                    transition: "fill 0.3s",
                }}
            />
            <path
                d="M5.81579 11.8091L1.82456 15.9841C1.82456 18.8469 2.50877 21.5905 3.76316 23.9761L13.057 14.9702V0H11.2895C5.07456 0 0 5.24851 0 11.8091H5.81579Z"
                fill={
                    isScrolled && variant == "default"
                        ? "black"
                        : variant == "dark"
                        ? "black"
                        : "white"
                }
                style={{
                    transition: "fill 0.3s",
                }}
            />
        </svg>
    );
}
