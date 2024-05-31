import BlurredCircle from "@/Components/BlurredCircle";
import { Button, buttonVariants } from "@/Components/ui/button";
import PageLayout from "@/Layouts/PageLayout";
import TicketTemplateImage from "@/assets/images/ticket-template.png";
import { cn, formatDate, formatDateTime } from "@/lib/utils";
import { PageProps } from "@/types";
import { Event, TicketType } from "@/types/common";
import { useGSAP } from "@gsap/react";
import { Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    UserRound,
} from "lucide-react";
import { useRef, useState } from "react";
import Slider from "react-slick";

export default function EventDetail({ event }: PageProps<{ event: Event }>) {
    const [activeSlide, setActiveSlide] = useState(0);
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        swipeToSlide: true,
        autoplaySpeed: 2500,
        pauseOnHover: false,
        prevArrow: <></>,
        nextArrow: <></>,
    };
    ``;

    // scroll to fullscreen
    gsap.to("[data-animate='move']", {
        scrollTrigger: {
            trigger: "[data-container='move']",
            toggleActions: "restart none none none",
            scrub: 1,
            start: "top top",
            end: "bottom bottom",
        },
        borderRadius: "0",
        margin: 0,
        duration: 5,
    });

    return (
        <PageLayout withTopPadding={false}>
            <section>
                <div className="relative z-10 w-full space-y-4">
                    <Slider
                        {...settings}
                        className="w-full h-screen overflow-hidden bg-neutral-400"
                    >
                        {event?.images_server.map((image, idx) => (
                            <img
                                key={idx}
                                src={`/${image.file_path}`}
                                className="object-cover w-full h-screen "
                            />
                        ))}
                    </Slider>

                    <div className="absolute inset-0 w-full h-screen bg-gradient-to-b from-black/10 via-transparent to-black/70 -top-4"></div>

                    <h1 className="absolute bottom-0 font-semibold text-[7vw] leading-none line-clamp-2 w-2/3 p-8 uppercase text-white">
                        {event.name.split("").slice(0, 20).join("")}
                    </h1>
                </div>
            </section>

            {/* <section className="flex pl-[2rem] max-w-[1760px] mx-auto justify-between min-h-screen py-16"> */}
            <TicketSlider
                event={event}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />

            {/* <section className="container items-center justify-between min-h-screen py-16 space-y-8">
                <div className="flex flex-col gap-4 2xl:flex-row">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <img
                            className="w-full md:w-fit md:h-[85vh]"
                            src={
                                "https://i.pinimg.com/736x/6f/49/ac/6f49ac14c53e8e462c7c7dde207f2fc4.jpg"
                            }
                        />
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.093123766903!2d144.95373531531674!3d-37.81720997975192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xb4b1f57c1911aef3!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1615980245613!5m2!1sen!2sau"
                            width="full"
                            height="full"
                            loading="lazy"
                            className="aspect-square w-full lg:w-[60vw]"
                        />
                    </div>
                    <div className="mt-auto">
                        <p className="text-xl font-semibold">
                            {event.location}
                        </p>
                        <p className="text-5xl font-bold leading-none tracking-tight uppercase md:text-7xl">
                            Venue Information
                        </p>
                    </div>
                </div>
            </section> */}

            {/* <section
                data-container="move"
                className="items-center justify-between h-screen pt-16 "
            >
                <div
                    data-animate="move"
                    className="flex mx-16 bg-black/30 h-screen rounded-[2rem]"
                >
                    <Link
                        href={`/events/${event.slug}/order`}
                        className={buttonVariants({
                            size: "lg",
                            className: "mx-auto my-auto",
                        })}
                    >
                        Order Now
                    </Link>
                </div>
            </section> */}
        </PageLayout>
    );
}

const TicketSlider = ({
    event,
    activeSlide,
    setActiveSlide,
}: {
    event: Event;
    activeSlide: number;
    setActiveSlide: (index: number) => void;
}) => {
    let sliderRef = useRef<Slider | null>();
    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: event.ticket_types.length,
        slidesToScroll: 1,
        vertical: true,
        prevArrow: <></>,
        nextArrow: <></>,
        autoplaySpeed: 2500,
        beforeChange: (_: unknown, next: number) => {
            setActiveSlide(next);
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                },
            },
        ],
    };

    return (
        <section className="relative flex flex-col md:flex-row pl-[2rem] justify-between py-16 min-h-screen">
            <div className="absolute w-full h-screen bg-[#0F0F0F] -z-20 top-0 left-0" />
            <div className="flex flex-col justify-between md:w-[40%] gap-8 mt-auto text-white">
                <div className="flex gap-12">
                    <div className="text-end justify-between font-neue w-[7rem] flex flex-col items-end">
                        <p>
                            {formatDate(event.start_date)} <br />-{" "}
                            {formatDate(event.start_date)}
                        </p>

                        <p className="flex flex-col items-end">
                            <span className="flex items-center gap-1">
                                <UserRound size={16} />
                                {event.max_participants}
                            </span>
                            Participants
                        </p>

                        <p className="flex flex-col items-end">
                            <span className="flex items-center gap-1">
                                <UserRound size={16} />
                                {
                                    event.ticket_types[
                                        (activeSlide + 1) %
                                            event.ticket_types.length
                                    ].max_tickets
                                }
                            </span>
                            {
                                event.ticket_types[
                                    (activeSlide + 1) %
                                        event.ticket_types.length
                                ].name
                            }
                        </p>

                        <p className="grid gap-2">
                            {event.categories.map((category) => (
                                <span
                                    key={category.id}
                                    className="px-2 text-xs font-medium text-orange-500 border border-orange-500 rounded-full"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="flex flex-col justify-between w-[30rem] font-neue space-y-4">
                        <div>
                            <h3 className="text-[1.5rem] font-semibold">
                                Description
                            </h3>
                            <p>{event.description}</p>
                        </div>

                        <p>
                            {event.location}
                            <br />
                            <div className="flex gap-1">
                                <Link
                                    href="/"
                                    className="text-sm text-[#A7A7A7] underline underline-offset-4"
                                >
                                    See venue{" "}
                                </Link>
                                <ArrowUpRight
                                    className="text-orange-500"
                                    size={20}
                                />
                            </div>
                        </p>

                        <div className="flex gap-4">
                            <div className="mt-auto">
                                <p>Ticket Type</p>
                                <h3 className="text-5xl font-bold">
                                    {
                                        event.ticket_types[
                                            (activeSlide + 1) %
                                                event.ticket_types.length
                                        ].name
                                    }
                                </h3>
                            </div>
                            <div className="flex gap-2 mt-auto ml-auto">
                                <button
                                    onClick={prevSlide}
                                    className="flex items-center justify-center w-10 h-10 border rounded-full"
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="flex items-center justify-center w-10 h-10 border rounded-full"
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Link
                    href={`/events/${event.slug}/order`}
                    className={buttonVariants({
                        size: "lg",
                        className: "my-auto",
                    })}
                >
                    Order Now
                </Link>

                <p className="font-bold tracking-tight uppercase text-7xl">
                    Choose <br /> your tickets
                </p>
            </div>

            <div className="absolute w-[30vw] aspect-square bg-orange-500/40 rounded-full right-[20vw] -top-[15vw] blur-full" />

            <Slider
                ref={(slider) => (sliderRef.current = slider)}
                {...settings}
                className="overflow-hidden text-white md:w-[51%] md:my-auto"
            >
                {(event.ticket_types ?? []).map((ticket, index) => (
                    <TicketCardSmall
                        key={ticket.id}
                        ticket={ticket}
                        event={event}
                        className={cn("transition duration-1000 md:ml-auto", {
                            "scale-[100%] md:translate-x-[0%]":
                                index ===
                                (activeSlide + 1) % event.ticket_types.length,
                            "scale-[90%] md:translate-x-[18%] blur-xs":
                                index !==
                                (activeSlide + 1) % event.ticket_types.length,
                        })}
                    />
                ))}
            </Slider>
        </section>
    );
};

export const TicketCard = ({
    className,
    ticket,
    event,
}: {
    className?: string;
    ticket: TicketType;
    event: Event;
}) => {
    return (
        <div className={cn(className, "relative font-jakarta w-[880px]")}>
            <img src={TicketTemplateImage} />

            <div className="absolute top-0 flex justify-between w-full p-4 text-[#231A35]">
                <div className="flex gap-8">
                    <div
                        className="h-64
                    bg-[#231A35]
                    rounded-xl aspect-square"
                    />

                    <div className="w-[25rem]">
                        <div className="space-y-4">
                            <div className="mb-8">
                                <h3 className="text-sm">EVENT NAME</h3>
                                <p className="text-2xl font-semibold line-clamp-1">
                                    {event.name}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-sm leading-none">
                                    LOCATION
                                </h3>
                                <p className="text-xl font-semibold leading-none line-clamp-1">
                                    {event.location}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm leading-none">
                                    START DATE
                                </h3>
                                <p className="text-xl font-semibold leading-none">
                                    {formatDateTime(event.start_date)}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm leading-none">
                                    END DATE
                                </h3>
                                <p className="text-xl font-semibold leading-none">
                                    {formatDateTime(event.end_date)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-between text-end">
                    <div className="bg-black h-28 aspect-square"></div>

                    <div>
                        <p className="text-sm font-semibold">TICKET TYPE</p>
                        <p className="mb-2 font-bold leading-none text-7xl">
                            {ticket.name.split("").slice(0, 3).join("")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TicketCardSmall = ({
    className,
    ticket,
    event,
}: {
    className?: string;
    ticket: TicketType;
    event: Event;
}) => {
    return (
        <div
            className={cn(
                className,
                "relative font-jakarta flex-shrink-0 w-[40rem]"
            )}
        >
            <img src={TicketTemplateImage} />

            <div className="absolute top-0 flex justify-between w-full p-1.5 text-[#231A35]">
                <div className="flex gap-4">
                    <div
                        className="h-[12rem]
                    bg-[#231A35]
                    rounded-xl aspect-square"
                    />

                    <div className="w-[18rem] p-1">
                        <div className="space-y-2">
                            <div className="mb-4">
                                <h3 className="text-[10px]">EVENT NAME</h3>
                                <p className="text-lg font-semibold line-clamp-1">
                                    {event.name}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-[10px] leading-none">
                                    LOCATION
                                </h3>
                                <p className="text-base font-semibold leading-none line-clamp-1">
                                    {event.location}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-[10px] leading-none">
                                    START DATE
                                </h3>
                                <p className="text-base font-semibold leading-none">
                                    {formatDateTime(event.start_date)}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-[10px] leading-none">
                                    END DATE
                                </h3>
                                <p className="text-base font-semibold leading-none">
                                    {formatDateTime(event.end_date)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-between p-1 text-end">
                    <div className="h-20 bg-black aspect-square"></div>

                    <div>
                        <p className="text-[10px] font-semibold">TICKET TYPE</p>
                        <p className="text-5xl font-bold leading-none">
                            {ticket.name.split("").slice(0, 3).join("")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
