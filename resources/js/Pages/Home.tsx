import BlurredCircle from "@/Components/BlurredCircle";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import PageLayout from "@/Layouts/PageLayout";
import { formatDate } from "@/lib/utils";
import { Event } from "@/types/common";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Dot, UserRound } from "lucide-react";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

export default function Home({ events }: { events: Event[] }) {
    return (
        <PageLayout withTopPadding={false}>
            <section className="h-screen py-16 text-white bg-black">
                <div className="container flex flex-col h-full gap-12 ">
                    <div className="h-[60%] flex flex-col mt-auto justify-between">
                        <h1 className="flex flex-col gap-4 text-8xl font-neue text-nowrap w-fit">
                            <span className="font-bold leading-none">
                                Get Ready to
                            </span>
                            <span className="text-4xl italic font-thin leading-none">
                                Experience the
                            </span>
                            <span className="ml-[30%] font-normal leading-none">
                                Best Events
                            </span>
                        </h1>

                        <div className="flex w-[40%] justify-between font-neue">
                            <div className="flex items-center justify-center w-32 h-32 text-black transition-all -rotate-90 bg-orange-500 rounded-full hover:rotate-0">
                                <ArrowDownRight size={60} strokeWidth={0.8} />
                            </div>

                            <p className="mt-auto text-2xl text-neutral-300">
                                Buying tickets in <br />
                                our platform is easy
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <SecondSection events={events} />

            <Marquee />

            <section className="py-16">
                <p className="grid font-normal leading-none text-center text-7xl">
                    <span className="text-4xl italic font-thin">Meet our</span>
                    <span>Partners</span>
                </p>

                <div className="grid grid-cols-4 gap-y-16 w-[70%] mx-auto  mt-20">
                    {PartnersData.map((partner, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center"
                        >
                            <img
                                src={partner.imgUrl}
                                alt="Partner Logo"
                                className="h-16"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative py-16">
                <div className="container flex flex-col h-full gap-20">
                    <p className="grid mx-auto font-normal leading-none text-7xl">
                        <span className="text-4xl italic font-thin">
                            Frequently ask
                        </span>
                        <span className="ml-[20%] ">Question</span>
                    </p>

                    <BlurredCircle />

                    <div className="w-[70%] mx-auto ">
                        <Accordion type="single" collapsible>
                            {FAQData.map((faq, index) => (
                                <React.Fragment key={index}>
                                    <AccordionItem value={faq.q}>
                                        <AccordionTrigger
                                            key={index}
                                        >
                                            <p className="space-x-8">
                                                <span className="text-xl">
                                                    {(index + 1)
                                                        .toString()
                                                        .padStart(2, "0")}
                                                </span>
                                                <span className="text-3xl font-medium">
                                                    {faq.q}
                                                </span>
                                            </p>
                                            <ArrowDownRight
                                                strokeWidth={1}
                                                size={38}
                                            />
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="pt-2 text-xl">{faq.a}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    {/* {activeFaqs === index && (
                                        <p className="mt-8 text-xl animate-accordion-up">
                                            {faq.a}
                                        </p>
                                    )} */}
                                </React.Fragment>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

function Marquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.to(".marquee__part", {
                xPercent: -100,
                repeat: -1,
                duration: 40,
                ease: "linear",
            }).totalProgress(0.5);
        },
        { scope: marqueeRef }
    );

    return (
        <section>
            {/* Marquee */}'
            <div
                className="h-[100px] flex gap-12 overflow-hidden"
                ref={marqueeRef}
            >
                <div className="flex items-center gap-12 marquee__part">
                    {marqueeData.map((data, index) => (
                        <React.Fragment key={index}>
                            <p className="font-bold text-[5rem] font-neue">
                                {data}
                            </p>
                            <svg
                                width="70"
                                height="70"
                                viewBox="0 0 99 99"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M99 35.5507L86.4141 13.9493C82.5045 16.1812 66.1696 28.2705 56.1277 38.1015C59.6892 24.5507 62.0725 4.46377 62.0725 0H36.9275C36.9275 4.46377 39.3108 24.5773 42.8723 38.1015C32.8304 28.2705 16.4688 16.1812 12.5859 13.9493L0 35.5507C3.90966 37.7826 22.6278 45.8068 36.2313 49.5C22.6278 53.2198 3.90966 61.2174 0 63.4493L12.5859 85.0507C16.4955 82.8188 32.8304 70.7295 42.8723 60.8986C39.3108 74.4493 36.9275 94.5362 36.9275 99H62.0725C62.0725 94.5362 59.6892 74.4227 56.1277 60.8986C66.1696 70.7295 82.5312 82.8188 86.4141 85.0507L99 63.4493C95.0903 61.2174 76.3722 53.1932 62.7687 49.5C76.3722 45.7802 95.0903 37.7826 99 35.5507Z"
                                    fill="#FF4D08"
                                />
                            </svg>
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex items-center gap-12 marquee__part">
                    {marqueeData.map((data, index) => (
                        <React.Fragment key={index}>
                            <p className="font-bold text-[5rem] font-neue">
                                {data}
                            </p>
                            <svg
                                width="70"
                                height="70"
                                viewBox="0 0 99 99"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M99 35.5507L86.4141 13.9493C82.5045 16.1812 66.1696 28.2705 56.1277 38.1015C59.6892 24.5507 62.0725 4.46377 62.0725 0H36.9275C36.9275 4.46377 39.3108 24.5773 42.8723 38.1015C32.8304 28.2705 16.4688 16.1812 12.5859 13.9493L0 35.5507C3.90966 37.7826 22.6278 45.8068 36.2313 49.5C22.6278 53.2198 3.90966 61.2174 0 63.4493L12.5859 85.0507C16.4955 82.8188 32.8304 70.7295 42.8723 60.8986C39.3108 74.4493 36.9275 94.5362 36.9275 99H62.0725C62.0725 94.5362 59.6892 74.4227 56.1277 60.8986C66.1696 70.7295 82.5312 82.8188 86.4141 85.0507L99 63.4493C95.0903 61.2174 76.3722 53.1932 62.7687 49.5C76.3722 45.7802 95.0903 37.7826 99 35.5507Z"
                                    fill="#FF4D08"
                                />
                            </svg>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SecondSection({ events }: { events: Event[] }) {
    const sectRef = useRef<HTMLDivElement>(null);
    const racesRef = useRef<HTMLDivElement>(null);
    const [cards, setCards] = useState(
        racesRef.current?.querySelectorAll(".card") ?? []
    );
    let cardWidth = 0;

    gsap.registerPlugin(useGSAP, ScrollTrigger);

    useEffect(() => {
        setCards(racesRef.current?.querySelectorAll(".card") ?? []);
    }, []);

    useGSAP(
        () => {
            const timeline = gsap.timeline();

            function initCard() {
                timeline.clear();
                cardWidth = (cards[0] as HTMLElement)?.offsetWidth ?? 0;
                cards.forEach((card, index) => {
                    gsap.set(card, { x: index * cardWidth * 1.02 });

                    timeline.to(
                        card,
                        {
                            x: index * 40,
                            ease: "none",
                            duration: 1 * index,
                        },
                        0.1
                    );
                });
            }

            initCard();

            function getScrollAmount() {
                let racesWidth = racesRef.current?.scrollWidth ?? 0;
                return -(racesWidth * 0.8 - window.innerWidth);
            }

            ScrollTrigger.create({
                animation: timeline,
                trigger: ".races-cont",
                start: "-10% top",
                pin: sectRef.current,
                end: () => `+=${getScrollAmount()}`,
                scrub: 1,
            });
        },
        {
            scope: sectRef,
            dependencies: [cards],
        }
    );

    return (
        <section
            ref={sectRef}
            className="container h-screen py-16 overflow-x-hidden overflow-clip font-neue wrapper"
        >
            <div className="h-screen races-cont">
                <div className="font-neue">
                    <p className="font-normal text-7xl">
                        <span className="text-4xl italic font-thin">
                            Choose your
                        </span>{" "}
                        <br />
                        <span className="ml-[5%]">Experience</span>
                    </p>
                </div>

                <div
                    className="relative mt-20 "
                    style={{
                        height: cardWidth * 1.08,
                    }}
                >
                    <div className="inline-flex races" ref={racesRef}>
                        {events.map((event, index) => (
                            <NewCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const NewCard = ({ event }: { event: Event }) => {
    return (
        <div className="card absolute grid text-white bg-[#1D1A1B] aspect-square h-[450px] border border-white rounded-2xl px-10 py-8">
            <div className="flex justify-between">
                <p>
                    {formatDate(event.start_date)} -{" "}
                    {formatDate(event.end_date)}
                </p>

                <span className="italic text-green-400">{event.status}</span>
            </div>
            <div className="mt-auto space-y-4">
                <h1 className="text-5xl font-medium">
                    {event.name.slice(0, 20)}
                </h1>
                <p className="text-xl line-clamp-2">{event.description}</p>

                <div>
                    <div className="flex justify-between">
                        <p className="w-[80%]">{event.location}</p>
                        <p className="flex items-center gap-1">
                            <UserRound size={16} /> {event.max_participants}
                        </p>
                    </div>
                    <div className="flex justify-between gap-8 text-sm">
                        <p className="flex items-center">
                            {event.categories.map((category, idx) => {
                                return (
                                    <React.Fragment key={category.id}>
                                        <span>{category.name}</span>
                                        {idx != event.categories.length - 1 && (
                                            <Dot
                                                className="text-orange-500"
                                                size={28}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </p>
                        <p className="font-medium text-orange-500 animate-pulse">
                            2 Tickets left
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQData = [
    {
        q: "How to exchange e-tickets for physical tickets?",
        a: "You can exchange your e-tickets for physical tickets at the event venue. Please bring your ID and the e-ticket to the ticket counter.",
    },
    {
        q: "What if you have paid for the ticket but have not received the e-ticket?",
        a: "Please check your spam folder. If you still can't find it, please contact us",
    },
    {
        q: "How to buy a ticket from the website?",
        a: "You can buy a ticket from the website by clicking the 'Buy Ticket' button and following the instructions.",
    },
];

const PartnersData = [
    {
        imgUrl: "/images/partners/Fictional company logo.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-1.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-2.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-3.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-4.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-5.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-6.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-7.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-8.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-9.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-10.png",
    },
    {
        imgUrl: "/images/partners/Fictional company logo-11.png",
    },
];

const marqueeData = ["Immersive", "Unforgettable", "Experience", "Informative"];
