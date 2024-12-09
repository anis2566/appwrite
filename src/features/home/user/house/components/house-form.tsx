"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { useGetCity } from "@/features/location/api/use-get-city"
import { useGetArea } from "@/features/location/api/use-get-area"

export const HouseForm = () => {
    const { data: cities, isLoading } = useGetCity();

    const form = useForm<HouseSchemaType>({
        resolver: zodResolver(HouseSchema),
        defaultValues: {
            name: "",
            address: "",
            city_id: undefined,
            zone_id: undefined,
            flat_count: 1,
            hasLift: false,
        },
    });

    const { data: areas, isLoading: isLoadingAreas } = useGetArea(form.watch("city_id")?.toString());

    // const { data: zones } = useZonesByCityId({ city_id: form.watch("city_id") });

    const onSubmit = async (values: HouseSchemaType) => {
        // createHouse(values);
    }

    let isPending = false;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add House</CardTitle>
                <CardDescription>
                    Add a new house to your account
                </CardDescription>
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
                                            disabled={isPending || isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a city" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities?.map((city) => (
                                                    <SelectItem key={city.$id} value={city.cityId.toString()}>
                                                        {city.nameBangla}
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
                                            disabled={isPending || form.watch("city_id") === undefined || isLoadingAreas}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a zone" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {areas?.map((area) => (
                                                    <SelectItem key={area.$id} value={area.areaId.toString()}>
                                                        {area.nameBangla}
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