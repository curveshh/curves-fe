export const Footer = () => {
  return (
    <footer
      className="footer container mt-2 border-t border-t-slate-200 py-2"
      id="footer"
    >
      <div className="footer-grid">
        <div>
          <a className="brand" href="#top">
            Curves
          </a>
          <p style={{ marginTop: 16 }}>
            30 phút mỗi ngày,
            <br />
            phiên bản tốt hơn của bạn.
          </p>
        </div>
        <div>
          <h4>VỀ CURVES</h4>
          <a href="#about">Giới thiệu</a>
          <a href="#workout">Phương pháp Curves</a>
          <a href="#clubs">Câu chuyện thành viên</a>
        </div>
        <div>
          <h4>HỖ TRỢ</h4>
          <a href="#clubs">Câu hỏi thường gặp</a>
          <a href="#workout">Quy định hội viên</a>
          <a href="#">Chính sách bảo mật</a>
        </div>
        <div>
          <h4>LIÊN HỆ</h4>
          <p>Hotline: 1900 1234</p>
          <p>Email: info@curves.com.vn</p>
          <p>Giờ mở cửa: 06:00 - 21:00</p>
        </div>
      </div>
      <div className="copyright">
        © 2024 Curves Việt Nam. All rights reserved.
      </div>
    </footer>
  );
};
