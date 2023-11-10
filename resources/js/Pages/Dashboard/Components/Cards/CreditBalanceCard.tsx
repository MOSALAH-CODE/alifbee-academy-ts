// CreditBalanceCard.tsx
import React, { useEffect, useState } from "react";
import CreditIcon from "@/Components/Icons/CreditIcon";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import { PrimaryButton } from "@/Components/Buttons";
import { Link } from "@inertiajs/react";
import Card from "@/Components/Card";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

interface CreditBalanceCardProps {
    balance: number;
}

const CreditBalanceCard: React.FC<CreditBalanceCardProps> = ({ balance }) => {
    const MINUTES_PER_CREDIT = 30;

    // State to hold calculated time
    const [calculatedTime, setCalculatedTime] = useState({
        hours: 0,
        minutes: 0,
    });

    // Calculate time based on balance
    const calculateTime = () => {
        const totalMinutes = balance * MINUTES_PER_CREDIT;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        setCalculatedTime({ hours, minutes });
    };

    useEffect(() => {
        calculateTime();
    }, [balance]);

    return (
        <Card>
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <CreditIcon />
                    <div>
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold text-secondary-dark">
                                Credit balance:
                            </h2>
                            <HexagonIcon>{balance}</HexagonIcon>
                        </div>
                        <p className="text-xs text-secondary-600">
                            *{balance} Credits {calculatedTime.hours} hours{" "}
                            {calculatedTime.minutes} min lesson
                        </p>
                    </div>
                </div>

                <div>
                    <Link href={"/buy-credits"}>
                        <PrimaryButton>
                            <ControlPointRoundedIcon
                                className={"mr-2"}
                                fontSize={"small"}
                            />
                            Buy new credits
                        </PrimaryButton>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default CreditBalanceCard;
