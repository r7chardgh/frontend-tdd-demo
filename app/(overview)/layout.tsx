import NavMenu from "@/components/layout/NavMenu"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex h-svh bg-gray-100">
            <NavMenu />
            <section className="p-8 flex-1 bg-red-800 overflow-scroll">{children}</section>
        </main>
    )   
}