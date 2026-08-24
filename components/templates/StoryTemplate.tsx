import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui";

export async function StoryTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-fuchsia-50 via-purple-50 to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 md:grid-cols-2 md:px-5 md:py-4">
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold leading-tight text-purple-950 md:text-5xl">
              CÂU CHUYỆN
              <br />
              THÀNH CÔNG
            </h1>
            <span className="mt-2 inline-block text-2xl text-fuchsia-500">
              ✦
            </span>
            <p className="mt-5 max-w-md text-gray-600">
              Hàng ngàn phụ nữ đã thay đổi cuộc sống cùng Curves.
              <br />
              Bạn cũng có thể!
            </p>
            <Button className="mt-7 rounded-full bg-purple-900 px-6 py-6 font-semibold text-white hover:bg-purple-800">
              Đăng ký tập thử miễn phí
              <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-purple-200 to-fuchsia-100 shadow-xl relative">
              <Image
                src="/images/bg-story.png"
                alt="Phụ nữ tập luyện cùng Curves"
                fill
                className="object-cover object-[80%_center]"
              />
            </div>
            <span
              className="absolute right-2 top-4 text-3xl text-fuchsia-600 md:right-0 md:text-4xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              Curves
            </span>
          </div>
        </div>
      </section>
      {children}
      {/* CTA FOOTER */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-linear-to-r from-purple-950 via-purple-900 to-fuchsia-800 p-8 md:flex-row md:p-12">
          <div className="h-40 w-full shrink-0 overflow-hidden rounded-2xl md:h-48 md:w-64 relative">
            <Image
              src="/images/curves-workout.jpg?q=80&w=800&auto=format&fit=crop"
              alt="Nhóm phụ nữ tập luyện Curves"
              className="h-full w-full object-cover"
              fill
            />
          </div>
          <div className="flex-1 text-center text-white md:text-left">
            <h3 className="text-xl font-bold leading-snug md:text-2xl">
              Bạn sẽ là người tiếp theo
              <br />
              viết nên câu chuyện của chính mình!
            </h3>
            <p className="mt-2 text-sm text-purple-100">
              Đăng ký tập thử miễn phí ngay hôm nay
            </p>
            <Button className="mt-5 rounded-full bg-white px-6 py-6 font-semibold text-purple-900 hover:bg-purple-50">
              Đăng ký tập thử miễn phí
              <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                <Heart className="h-3.5 w-3.5" />
              </span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
