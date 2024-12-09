import { Metadata } from "next";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Flats",
    description: "Manage your flats",
};

const Flat = () => {
    return (
        <div className="space-y-4">
            <Button asChild>
                <Link href="/user/flat/new">
                    <PlusIcon className="w-4 h-4" />
                    Add Flat
                </Link>
            </Button>
        </div>
    )
};

export default Flat;
