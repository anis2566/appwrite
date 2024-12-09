import { Metadata } from "next";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { HouseList } from "@/features/home/user/house/components/house-list";
import { Header } from "@/features/home/user/house/components/header";

export const metadata: Metadata = {
    title: "Basabaree | My Houses",
    description: "My Houses",
}

interface Props {
    searchParams: {
        query?: string;
        sort?: "desc" | "asc";
        page?: string;
        limit?: string;
    }
}

const House = async ({ searchParams }: Props) => {
    // const { query, sort, page, limit } = searchParams;

    // const pageNumber = parseInt(page || "1");
    // const limitNumber = parseInt(limit || "5");

    // const { user } = await GET_USER()

    // const [houses, totalCount] = await Promise.all([
    //     db.house.findMany({
    //         where: {
    //             userId: user.id,
    //             ...(query && {
    //                 name: {
    //                     contains: query,
    //                     mode: "insensitive"
    //                 }
    //             })
    //         },
    //         include: {
    //             city: true,
    //             zone: true
    //         },
    //         orderBy: {
    //             createdAt: sort === "asc" ? "asc" : "desc"
    //         },
    //         skip: (pageNumber - 1) * limitNumber,
    //         take: limitNumber
    //     }),
    //     db.house.count({
    //         where: {
    //             userId: user.id,
    //             ...(query && {
    //                 name: {
    //                     contains: query,
    //                     mode: "insensitive"
    //                 }
    //             })
    //         }
    //     })
    // ])

    return (
        <div className="space-y-4">
            <Button asChild>
                <Link href="/user/house/new">
                    <PlusIcon className="w-4 h-4" />
                    Add House
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>My Houses</CardTitle>
                    <CardDescription>Manage your houses</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* <Header />
                    <HouseList houses={houses} />
                    <CustomPagination pageSize={limitNumber} totalCount={totalCount} /> */}
                </CardContent>
            </Card>
        </div>
    )
}

export default House;