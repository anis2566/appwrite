import { Metadata } from "next";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { EditHouseForm } from "@/features/home/user/house/components/edit-house-form";

export const metadata: Metadata = {
    title: "Basabaree | Edit House",
    description: "Edit House",
}

interface Props {
    params: {
        houseId: string
    }
}

const EditHouse = async ({ params: { houseId } }: Props) => {
    const house = await db.house.findUnique({
        where: {
            id: houseId
        }
    })

    if (!house) redirect("/user/house")

    return <EditHouseForm house={house} />
}

export default EditHouse
