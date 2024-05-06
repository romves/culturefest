import { Link, router, usePage } from "@inertiajs/react";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User as UserType } from "@/types";

export default function Navbar() {
    const { auth } = usePage().props as any;
    const user = auth.user as UserType;

    return (
        <nav className="h-16 shadow-md">
            <div className="container flex items-center justify-between h-full">
                <Link href="/">
                    <h1 className="text-lg font-bold ">Event Organizer</h1>
                </Link>

                {auth.user ? (
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
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    <span>Recent Order</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="w-4 h-4 mr-2" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.post("logout")}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button>
                        <Link href="/login" className="">
                            Login
                        </Link>
                    </Button>
                )}
            </div>
        </nav>
    );
}
