import { Metadata } from "next";

import { FlatForm } from "@/features/home/user/flat/components/flat-form";

export const metadata: Metadata = {
    title: "New Flat",
    description: "Add a new flat",
};

const NewFlat = () => {
    return <FlatForm />
};

export default NewFlat;