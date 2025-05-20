import LoginForm from "@/features/login/component/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Home() {
  const cookieStore = await cookies();
  if (!!cookieStore.has('secret')) {
    redirect('/home');
  }
  return (
    <main className={` pointer-events-none grayscale`}>
      <section className="h-svh flex justify-center items-center  bg-gray-300">
        <LoginForm />
      </section>
    </main>
  )
}
