import { User } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";
import withPageProps from "../withPageProps";
import Card from "@/Components/Card";
import { OutlineButton, PrimaryButton } from "@/Components/Buttons";
import EmailIcon from "@/Components/Icons/EmailIcon";
import { Link } from "@inertiajs/react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Show = () => {
    const pageProps = useSelector(selectPageProps);
    const tutor = pageProps.tutor;
    const aboutTutor = `My name is Robert Telp from beautiful, sunny South Africa. I enjoy cooking, baking, outdoors, watching movies and reading. I am outgoing, dedicated and open-minded. I love meeting new people and learning about different cultures. I am a hard working, honest individual. I am friendly, diligent, helpful and polite. I am a Human Resource Management student.\n\nI am also taking TEFL certification courses to boost my qualifications in teaching Arabic.\nAt the moment, I can not help with test preparation but hopefully soon!\n\nBecause I am also learning languages myself, I understand the process and the challenges of learning a language. I know that talking to people in your target language, especially native speakers, is the best way to improve. I want to make sure that all my students feel comfortable speaking with me as that is the most important part of effectively being able to learn and improve. I also get to know all of my students so that I can give them learning material specifically adapted to their needs and interests.`;

    return (
        <Authenticated user={pageProps.auth.user}>
            <div
                className="hidden md:block"
                style={{
                    position: "absolute",
                    top: 80,
                    left: 25,
                    zIndex: 10,
                }}
            >
                <Link
                    href="/tutors"
                    className="shadow flex gap-2 items-center bg-white rounded-lg py-1.5 px-4 w-fit text-secondary-dark hover:bg-gray-50 transition ease-in-out duration-150"
                >
                    <ArrowBackIosNewRoundedIcon style={{ fontSize: 15 }} />
                    <p className="font-bold">Back</p>
                </Link>
            </div>
            <div className="md:mt-4">
                <div className="grid gap-6 grid-cols-12">
                    {/* Left Section */}
                    <div className="col-span-12 space-y-6 md:col-span-8">
                        <Card>
                            <div className="flex items-center gap-8 pb-8">
                                <img
                                    style={{ height: 140, width: 140 }}
                                    className="rounded-lg"
                                    src={tutor?.profile_picture}
                                />
                                <h3 className="text-xl font-bold text-secondary-dark">
                                    {tutor?.name}
                                </h3>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-secondary-dark">
                                    About
                                </h3>

                                <p
                                    className="text-base text-secondary-400"
                                    dangerouslySetInnerHTML={{
                                        __html: aboutTutor.replace(
                                            /\n/g,
                                            "<br/>"
                                        ),
                                    }}
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Right Section */}
                    <div
                        className="col-span-12 w-full h-fit md:space-y-6 md:block md:col-span-4"
                        style={{
                            position: "sticky",
                            top: 0,
                            width: "100%",
                            zIndex: 0,
                        }}
                    >
                        <Card>
                            <div className="flex flex-col gap-2">
                                <Link
                                    className="w-full"
                                    href={`/tutors/book-lesson/${tutor.id}`}
                                >
                                    <PrimaryButton className="w-full">
                                        Book lesson
                                    </PrimaryButton>
                                </Link>
                                <OutlineButton>
                                    <div className="flex justify-center gap-2">
                                        <EmailIcon />
                                        <p>Contact</p>
                                    </div>
                                </OutlineButton>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default withPageProps(Show);
