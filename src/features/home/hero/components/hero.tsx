"use client"

import { BackgroundLines } from "@/components/aceternity/background-lines"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"

export const Hero = () => {
    return (
        <BackgroundLines className="md:h-[60vh] flex items-center justify-center w-full flex-col px-4 space-y-6 mt-6 md:mt-0">
            <Badge variant="secondary" className="z-50 py-2">সম্পূর্ণ বিনামূল্যে</Badge>
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-3xl font-sans relative z-20 font-bold tracking-tight">
                বাসা <span className="text-primary">ভাড়ার </span> বিজ্ঞাপন দিন / <br />
                <span className="text-primary">অনুসন্ধান </span> করুন
            </h2>
            <p className="text-sm text-muted-foreground text-justify max-w-xl">
                 বিনামূল্যে আপনার বাসা ভাড়ার বিজ্ঞাপন দিন এবং আমাদের প্ল্যাটফর্মের মাধ্যমে সঠিক ভাড়াটিয়ার সন্ধান করুন। বাড়ি ভাড়ার ক্ষেত্রে আপনাকে সহায়তা করতে আমরা আছি সর্বদা। আমাদের প্ল্যাটফর্মটি সহজ, দ্রুত এবং সুবিধাজনক, যেখানে আপনি আপনার বাসার বিজ্ঞাপন পোস্ট করে প্রয়োজনীয় সাড়া পেতে পারবেন এবং পছন্দের বাসা ভাড়া নিতে পারেন। 
            </p>

            <div className="flex items-center justify-center gap-4">
                <Button variant="outline" className="z-50">অনুসন্ধান করুন </Button>
                <Button className="z-50">
                    <span>বিজ্ঞাপন দিন</span>
                    <ArrowRightIcon className="w-4 h-4" />
                </Button>
            </div>
        </BackgroundLines>
    )
}