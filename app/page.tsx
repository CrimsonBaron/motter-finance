import ProgressLoader from "@/components/progress-loader";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex-1 w-full h-full flex justify-center items-center">
          <ProgressLoader />
        </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        motter-finance
      </footer>
    </div>
  );
}
