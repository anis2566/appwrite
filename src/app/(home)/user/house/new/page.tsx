import { Metadata } from "next";

import { HouseForm } from "@/features/home/user/house/components/house-form";

export const metadata: Metadata = {
    title: "Basabaree | New House",
    description: "New House",
}

const NewHouse = () => {
    return <HouseForm />
}

export default NewHouse;