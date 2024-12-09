"use client"

import { House } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"
import { Switch } from "@/components/ui/switch"

import { HouseSchema, HouseSchemaType } from "../schemas"
import { useCities } from "../api/use-cities";
import { useZonesByCityId } from "../api/use-zone";
import { useEditHouse } from "../api/use-edit-house";

interface EditHouseFormProps {
    house: House
}

export const EditHouseForm = ({ house }: EditHouseFormProps) => {
    const { data: cities } = useCities();

    const { mutate: editHouse, isPending } = useEditHouse();

    const form = useForm<HouseSchemaType>({
        resolver: zodResolver(HouseSchema),
        defaultValues: {
            name: house.name,
            flat_count: house.flat_count,
            address: house.address,
            city_id: house.city_id,
            zone_id: house.zone_id,
            hasLift: house.hasLift,
        },
    });

    const { data: zones } = useZonesByCityId({ city_id: form.watch("city_id") });

    const onSubmit = async (values: HouseSchemaType) => {
        editHouse({ id: house.id, values })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit House</CardTitle>
                <CardDescription>Edit your house information</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>House Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(parseInt(value));
                                                form.resetField("zone_id");
                                            }}
                                            disabled={isPending}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a city" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities?.map((city) => (
                                                    <SelectItem key={city.id} value={city.city_id.toString()}>
                                                        {city.city_name_bangla}
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
                                name="zone_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Zone</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(parseInt(value));
                                            }}
                                            disabled={isPending}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a zone" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {zones?.map((zone) => (
                                                    <SelectItem key={zone.id} value={zone.zone_id.toString()}>
                                                        {zone.zone_name_bangla}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="মহল্লা/গলি, রোডের নাম, রোডের নাম্বার লিখুন"
                                            className="resize-none"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="flat_count"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>No of Flat</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" value={field.value.toString()} onChange={(e) => field.onChange(parseInt(e.target.value))} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hasLift"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between">
                                        <div className="space-y-0.5">
                                            <FormLabel>Do You Have Lifts?</FormLabel>
                                            <FormDescription>
                                                check if you have lifts in your house
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                aria-readonly
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <LoadingButton
                            type="submit"
                            isLoading={isPending}
                            title="Update"
                            loadingTitle="Updating..."
                            onClick={() => form.handleSubmit(onSubmit)}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
