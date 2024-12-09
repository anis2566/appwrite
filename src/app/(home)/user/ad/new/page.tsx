import { Metadata } from "next"

import { AdForm } from "@/features/home/user/add/components/ad-form"

export const metadata: Metadata = {
    title: "Basabaree | New Ad",
    description: "Create a new ad for your property",
}

const NewAdPage = () => {
    return (
        <div className="space-y-4">
            <AdForm />
        </div>
    )
}

export default NewAdPage