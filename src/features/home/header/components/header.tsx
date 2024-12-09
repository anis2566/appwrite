import { Mail, MapPin } from "lucide-react"
import { ImFacebook } from "react-icons/im"
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

import { SocialIconBox } from "@/components/social-icon-box"

export const Header = () => {
    return (
        <div className="w-full bg-background hidden md:flex items-center justify-between p-2 z-50">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground text-sm">info@basabaree.com</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground text-sm">Bongshal, Dhaka, Bangladesh</span>
                </div>
            </div>
            <div className="flex items-center gap-x-1">
                <SocialIconBox icon={<ImFacebook />} href="https://www.facebook.com/basabaree" color="text-[#3b5998]" />
                <SocialIconBox icon={<FaXTwitter />} href="https://www.twitter.com/basabaree" color="text-[#00acee]" />
                <SocialIconBox icon={<IoLogoYoutube />} href="https://www.youtube.com/basabaree" color="text-[#ff0000]" />
                <SocialIconBox icon={<FaInstagram />} href="https://www.instagram.com/basabaree" color="text-[#c32aa3]" />
            </div>
        </div>
    )
}