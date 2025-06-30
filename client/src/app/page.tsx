import Link from "next/link";
import NoticeSection from "@/components/NoticeSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            All India Patent Office Welfare Association (AIPOWA)
          </h1>
          <p className="max-w-2xl text-lg md:text-2xl font-medium text-blue-100 mb-8">
            Empowering innovation, protecting rights, and fostering a culture of intellectual property excellence across India. AIPOWA is dedicated to supporting inventors, professionals, and the public through advocacy, education, and community engagement.
          </p>
          {/* <a href="#" className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-50 transition">Learn More</a> */}
        </div>
        <div className="absolute inset-0 opacity-20 bg-[url('/hero-bg.svg')] bg-cover bg-center pointer-events-none" />
      </section>
      <NoticeSection />
    </div>
  );
}
