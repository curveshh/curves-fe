import { Dumbbell, Footprints, HeartPulse, PersonStanding } from "lucide-react";
import React from "react";

export default function CurvesCircuitSection() {
  return (
    <section className="relative min-h-127 overflow-hidden rounded-3xl bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-purple-50" />

      {/* Left image */}
      <div className="absolute inset-y-0 left-0 w-[33%] overflow-hidden">
        <img
          src="/images/curves-workout.jpg"
          alt="Curves workout"
          className="h-full w-full object-cover"
        />

        {/* Fade image into content */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-linear-to-r from-transparent to-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 grid min-h-127 grid-cols-[36%_57%]">
        {/* Left spacing for image */}
        <div />

        {/* Right content */}
        <div className="flex items-center px-8 py-12 lg:px-12">
          <div className="grid w-full grid-cols-[minmax(260px,1fr)_minmax(320px,1fr)] items-center gap-6">
            {/* Text */}
            <div className="max-w-md">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Vòng tập 30 phút Curves
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600">
                Tập luyện theo vòng với 12 máy kháng lực thủy lực kết hợp bước
                chân trên sàn cardio và các bài tập giãn cơ.
                <br />
                Đơn giản – Hiệu quả – Dễ duy trì.
              </p>
            </div>

            {/* 30 minutes diagram */}
            <div className="relative mx-auto aspect-square w-full max-w-100">
              {/* Dashed circle */}
              <div className="absolute inset-[18%] rounded-full border-2 border-dashed border-purple-300" />

              {/* Center */}
              <div
                className="
                  absolute left-1/2 top-1/2
                  flex size-35 -translate-x-1/2 -translate-y-1/2
                  flex-col items-center justify-center
                  rounded-full
                  bg-white
                  shadow-[0_8px_30px_rgba(124,58,237,0.12)]
                "
              >
                <span className="text-6xl font-bold leading-none text-blue-700">
                  30
                </span>

                <span className="mt-2 text-xl font-bold text-blue-700">
                  PHÚT
                </span>
              </div>

              {/* Top */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <StepIcon icon={<HeartPulse />} />

                <div className="absolute right-full top-1/2 mr-5 w-35 -translate-y-1/2 text-right">
                  <p className="font-bold text-slate-900">1. Khởi động</p>
                  <p className="mt-1 text-sm text-slate-700">3 phút</p>
                </div>
              </div>

              {/* Right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <StepIcon icon={<Dumbbell />} />

                <div className="absolute left-full top-1/2 ml-5 w-42 -translate-y-1/2">
                  <p className="font-bold leading-5 text-slate-900">
                    2. 12 máy
                    <br />
                    kháng lực
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <StepIcon icon={<Footprints />} />

                <div className="absolute right-full top-1/2 mr-5 w-30 -translate-y-1/2 text-right">
                  <p className="font-bold text-slate-900">3. Cardio</p>
                  <p className="mt-1 text-sm text-slate-700">3 phút</p>
                </div>
              </div>

              {/* Left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <StepIcon icon={<PersonStanding />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div
      className="
        flex size-19 items-center justify-center
        rounded-full
        border border-purple-100
        bg-purple-50
        text-purple-700
        shadow-[0_8px_25px_rgba(124,58,237,0.12)]
      "
    >
      {React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement, {
            size: 36,
            strokeWidth: 1.8,
          })
        : icon}
    </div>
  );
}
