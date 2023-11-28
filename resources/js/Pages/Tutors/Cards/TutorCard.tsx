import ComplatedIcon from "@/Components/Icons/ComplatedIcon";
import EduTimeIcon from "@/Components/Icons/EduTimeIcon";
import Card from "@/Components/Card";
import { Tutor } from "@/types";
import { OutlineButton, PrimaryButton } from "@/Components/Buttons";
import EmailIcon from "@/Components/Icons/EmailIcon";
import { Link } from "@inertiajs/react";

interface TutorCardProps {
    tutor: Tutor;
}

const TutorCard = ({ tutor }: TutorCardProps) => {
    return (
        <div>
            <div className="flex divide-x-2 bg-white shadow-sm rounded-xl">
                <Link href={route("tutors.show", { id: tutor.id })}>
                    <div className="flex items-center gap-4 p-6 rounded-l-xl hover:bg-slate-50 transition ease-in-out duration-150">
                        <img
                            style={{ height: 140, width: 140 }}
                            className="rounded-lg"
                            src={tutor?.profile_picture}
                        />
                        <div className="grid gap-2">
                            <h3 className="text-xl">{tutor?.name}</h3>
                            <p className="text-base text-secondary-400">
                                Hello, I am Amanda! Let me introduce myself. I
                                live in Austria, I have attended the 250 hour
                                expert level course from Global Language
                                Training. From this I received a Diploma
                                certificate in Teaching English As a Foreign
                                Language and in Teaching
                            </p>
                        </div>
                    </div>
                </Link>

                <div className="flex flex-col justify-center flex-shrink w-1/3 gap-2 p-6">
                    <Link
                        className="w-full"
                        href={route("bookLesson", { id: tutor.id })}
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
            </div>
        </div>
    );
};

export default TutorCard;
