import { MapPin, Phone, Clock } from "lucide-react";

export default function TopBar() {
  return (
    <div className="stripes-bg bg-navy text-ivory/85">
      <div className="container-hosp flex flex-wrap items-center justify-between gap-2 py-2 text-xs sm:text-[0.8rem]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-teal-300" />
            13 Gbajobi St, Allen, Ikeja, Lagos
          </span>
          <a href="tel:+2347035099735" className="hidden items-center gap-1.5 hover:text-white sm:flex">
            <Phone className="h-3.5 w-3.5 text-teal-300" />
            0703 509 9735
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-ivory/60 md:inline">Serving Ikeja since 1978</span>
          <span className="flex items-center gap-1.5 font-medium text-teal-300">
            <Clock className="h-3.5 w-3.5" />
            Open now · 24 hrs
          </span>
        </div>
      </div>
    </div>
  );
}
