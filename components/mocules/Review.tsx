export const Review = () => {
  return (
    <section className="testimonials" id="reviews">
      <div className="container">
        <h2 className="section-title">HỘI VIÊN NÓI GÌ VỀ CURVES?</h2>
        <div className="testimonial-grid">
          <article className="testimonial">
            <div className="person">
              <span className="avatar">N</span>Nguyễn Thu Hương, 32 tuổi
            </div>
            Chỉ 30 phút mỗi ngày nhưng tôi cảm thấy khỏe hơn, tinh thần tươi tắn
            hơn rất nhiều!
          </article>
          <article className="testimonial">
            <div className="person">
              <span className="avatar">T</span>Trần Mỹ Linh, 45 tuổi
            </div>
            Tôi đã tìm được một nơi thật thoải mái để luyện tập và gặp gỡ những
            người bạn mới.
          </article>
          <article className="testimonial">
            <div className="person">
              <span className="avatar">P</span>Phạm Thanh Mai, 28 tuổi
            </div>
            Curves giúp tôi giảm cân an toàn và duy trì thói quen tập luyện đều
            đặn.
          </article>
        </div>
        <div className="dots">
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  );
};
