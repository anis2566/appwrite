import { Header } from "@/features/home/header/components/header";
import { Navbar } from "@/features/home/navbar/components/navbar";

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return <div className="w-full max-w-screen-xl mx-auto px-3 relative">
        <Header />
        <Navbar />
        {children}
    </div>
}

export default HomeLayout;