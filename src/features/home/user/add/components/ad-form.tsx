"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useUserHouses } from "../api/use-user-house"
import { AdSchema, AdSchemaType } from "../schemas"
export const AdForm = () => {
    const { data: houses } = useUserHouses()

    const form = useForm<AdSchemaType>({
        resolver: zodResolver(AdSchema),
        defaultValues: {
            house_id: "",
        },
    })

    const onSubmit = (data: AdSchemaType) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>House</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a house" />
                                </SelectTrigger>
                                <SelectContent>
                                    {houses?.map((house) => (
                                        <SelectItem key={house.id} value={house.id.toString()}>
                                            {house.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    )
}