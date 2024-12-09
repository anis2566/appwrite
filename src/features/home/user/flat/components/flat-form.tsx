"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { LoadingButton } from "@/components/loading-button"
import { FlatSchema, FlatSchemaType } from "../schemas"
import { useGetHouses } from "../api/use-get-houses"
import { FLOORS } from "@/constant"
import { useCreateFlat } from "../api/use-create-flat"


export const FlatForm = () => {
    const [flatNo, setFlatNo] = useState<number | undefined>(undefined)

    const { data, isLoading } = useGetHouses()

    const { mutate: createFlat, isPending } = useCreateFlat()

    const form = useForm<FlatSchemaType>({
        resolver: zodResolver(FlatSchema),
        defaultValues: {
            house_id: "",
            flat_no: "",
            room_count: 1,
        },
    })

    const onSubmit = (data: FlatSchemaType) => {
        createFlat(data)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Flat</CardTitle>
                <CardDescription>
                    Add a new flat to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="house_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>House</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setFlatNo(data?.find((house) => house.id === value)?.flat_count)
                                        }}
                                        disabled={isLoading || isPending}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a house" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data?.map((house) => (
                                                <SelectItem key={house.id} value={house.id}>
                                                    {house.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Collapsible open={flatNo !== undefined}>
                            <CollapsibleContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="flat_no"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Flat No</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                disabled={isPending}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a flat" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {FLOORS.slice(0, flatNo).map((floor) => (
                                                        <SelectItem key={floor} value={floor}>
                                                            {floor}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="room_count"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>No of Room</FormLabel>
                                            <FormControl>
                                                <Input {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} type="number" disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </CollapsibleContent>
                        </Collapsible>

                        <LoadingButton
                            type="submit"
                            isLoading={isPending}
                            title="Save"
                            loadingTitle="Saving..."
                            onClick={() => form.handleSubmit(onSubmit)}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
} 