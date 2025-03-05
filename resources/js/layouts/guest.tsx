
export default function GuestLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex min-h-screen flex-col items-center  pt-6 sm:justify-center sm:pt-0 ">
            <div className="mt-6 w-full  px-6 py-4 sm:max-w-md sm:rounded-lg ">
                {children}
            </div>
        </div>
    )
}
