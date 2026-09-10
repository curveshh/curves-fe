import { BaseSwiper } from "./swipper";

export const Review = () => {
  const rating = 5;

  return (
    <section className="testimonials" id="reviews">
      <div className="container">
        <h2 className="section-title">HỘI VIÊN NÓI GÌ VỀ CURVES?</h2>
        <BaseSwiper
          slidesPerView={1}
          spaceBetween={16}
          navigation
          pagination
          loop
          autoplay
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          paginationBulletClassName="w-2 h-2 rounded-full bg-gray-300"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-2xl bg-white p-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-purple-900">
                  Đánh giá CLB
                </span>

                <div className="flex text-[#F5B544]">
                  {"★★★★★".split("").map((star, index) => (
                    <span key={index}>{index < rating ? "★" : "☆"}</span>
                  ))}
                </div>

                <span className="text-xs text-gray-500">{rating}/5</span>
              </div>

              {/* Avatar + tên */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  N
                </div>

                <div>
                  <p className="font-semibold text-purple-900">
                    Nguyễn Thu Hương, 32 tuổi
                  </p>
                </div>
              </div>

              {/* Nội dung */}
              <p className="mt-3 text-sm leading-6 text-purple-900">
                Chỉ 30 phút mỗi ngày nhưng tôi cảm thấy khỏe hơn, tinh thần tôi
                tốt hơn rất nhiều!
              </p>
            </div>
          ))}
        </BaseSwiper>
      </div>
    </section>
  );
};
