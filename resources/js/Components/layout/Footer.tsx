import { Facebook, Instagram, Youtube } from "lucide-react";
import { ReactNode } from "react";

export default function Footer() {
    return (
        <footer className="hidden px-16 pt-16 text-white md:flex bg-footer-bg">
            <div className="w-4/6 space-y-12 ">
                <div className="flex gap-4 font-jakarta">
                    <FooterContent title="Navigation">
                        <div className="flex gap-2">
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                        </div>
                    </FooterContent>
                    <FooterContent title="Based On">
                        <p>Malang City</p>
                    </FooterContent>
                    <FooterContent title="Contact Us">
                        <p>+626117210912</p>
                    </FooterContent>
                    <FooterContent title="Our Social Media">
                        <div className="flex gap-4">
                            <Youtube size={20} /> <Instagram size={20} />{" "}
                            <Facebook size={20} />
                        </div>
                    </FooterContent>
                </div>

                <div className="h-[12rem] overflow-hidden mt-auto">
                    <p className="font-jakarta font-bold text-[10vw] leading-none tracking-tight self-end ">
                        CultureFest
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between w-2/6 pb-8 text-end">
                <div className="w-32 h-32 border rounded-full"></div>
                <p className="text-orange-500 font-neue">
                    Copyright &copy; CultureFest 2024
                </p>
            </div>
        </footer>
    );
}

const FooterContent = ({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) => {
    return (
        <div>
            <p className="text-[#A7A7A7] font-neue italic">{title}</p>
            {children}
        </div>
    );
};

// class v_form {
//     name: string = "";

//     checkField() {
//         if (this.name == "") {
//             return false;
//         }
//         return true;
//     }

//     handleSubmit() {
//         this.checkField()

//         // c_berita.submitForm()
//     }

//     renderView() {
//         return (
//             <div>
//                 <input value={this.name} onSubmit={this.handleSubmit}/>
//             </div>
//         );
//     }
// }
