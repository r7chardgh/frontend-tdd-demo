import NavMenu from "@/components/layout/NavMenu"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex h-svh bg-gray-100">
            <NavMenu />
            <section className="p-8">{children}</section>
        </main>
    )
}