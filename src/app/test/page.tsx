import { getCurrent } from "@/features/auth/action";

const Test = async () => {
    const user = await getCurrent();
    console.log(user);
    return (
        <div>
            User
        </div>
    )
}

export default Test
