import React from "react";
import FacebookIcon from "./Icons/SocialMedia/FacebookIcon";
import InstagramIcon from "./Icons/SocialMedia/InstagramIcon";
import TwitterIcon from "./Icons/SocialMedia/TwitterIcon";
import YoutubeIcon from "./Icons/SocialMedia/YoutubeIcon";
import FooterLink from "./FooterLink";

const PageFooter: React.FC = () => {
    return (
        <footer className="flex flex-col-reverse items-center justify-between gap-3 pt-4 pb-12 text-sm text-center bg-white shadow-sm md:pb-4 md:px-6 lg:flex-row text-secondary-dark">
            <div className="flex gap-4">
                <p className="text-secondary-600">
                    &copy; 2022 AlifBee. All rights reserved.
                </p>
                <FooterLink href="#">Terms | Privacy</FooterLink>
            </div>

            <div className="hidden gap-4 md:flex">
                <div className="flex items-center gap-2">
                    <FooterLink href="#">Help</FooterLink>
                    <FooterLink href="#">About</FooterLink>
                    <FooterLink href="#">Alifbee for Business</FooterLink>
                    <FooterLink href="#">Blog</FooterLink>
                </div>

                <div className="flex gap-2">
                    <FooterLink href="#">
                        <FacebookIcon />
                    </FooterLink>
                    <FooterLink href="#">
                        <InstagramIcon />
                    </FooterLink>
                    <FooterLink href="#">
                        <TwitterIcon />
                    </FooterLink>
                    <FooterLink href="#">
                        <YoutubeIcon />
                    </FooterLink>
                </div>
            </div>
        </footer>
    );
};

export default PageFooter;
