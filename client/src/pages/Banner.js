import { Link } from "react-router-dom";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-6">
            <SparklesIcon className="h-4 w-4 text-brand-300" />
            <span className="text-black">New arrivals every week</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-red sm:text-5xl lg:text-6xl">
            Style that fits
            <span className="block text-brand-300">your life</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-xl">
            Discover curated collections and exclusive deals. Quality products, fast delivery, and a seamless shopping experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/category"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent-600 hover:shadow-xl hover:-translate-y-0.5"
            >
              Shop collection
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-black backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
