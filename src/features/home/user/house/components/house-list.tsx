"use client"

import { House, City, Zone } from "@prisma/client"
import { Edit, MoreVerticalIcon, Trash2 } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

import { useDeleteHouse } from "@/hooks/use-house";
import { EmptyStat } from "@/components/empty-stat";

interface HouseWithRelation extends House {
    city: City
    zone: Zone
}

interface HouseListProps {
    houses: HouseWithRelation[]
}

export const HouseList = ({ houses }: HouseListProps) => {
    const { onOpen } = useDeleteHouse();

    if (houses.length === 0) {
        return <EmptyStat title="No Houses Found" />
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-accent hover:bg-accent/80">
                    <TableHead>Name</TableHead>
                    <TableHead>Flats</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {houses.map((house) => (
                    <TableRow key={house.id}>
                        <TableCell>{house.name}</TableCell>
                        <TableCell>{house.flat_count}</TableCell>
                        <TableCell>{house.city.city_name_bangla}</TableCell>
                        <TableCell>{house.zone.zone_name_bangla}</TableCell>
                        <TableCell>{house.address}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href={`/user/house/edit/${house.id}`} className="flex items-center gap-x-3">
                                            <Edit className="w-5 h-5" />
                                            <p>Edit</p>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(house.id)}>
                                        <Trash2 className="w-5 h-5 group-hover:text-rose-600" />
                                        <p className="group-hover:text-rose-600">Delete</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}