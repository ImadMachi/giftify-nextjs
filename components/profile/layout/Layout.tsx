import Header from "@/components/Header/Header";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ user, tab, title, children }: any) => {
    // console.log(session);
    return (
        <>
            <Header title={title} />
            <main className=" flex flex-col md:flex-row max-w-screen-2xl mx-auto bg-gray-100  px-14 pt-5 pb-8 gap-8">
                <section className="bg-white p-2 md:p-5 rounded-xl border">
                    <Sidebar data={{
                        ...user,
                        tab
                    }} />
                </section>
                <section className=" bg-white p-2 md:p-5 rounded-xl border md:w-full">
                    {children}
                </section>
            </main>
        </>
    );
};

export default Layout;
