import { FeedbackPage, MemberFeedback } from "@/types/feedback";

const PAGE_SIZE = 6;

const feedbacks = [
  [
    "Lan Anh",
    "Curves Quận 3",
    5,
    "Không khí tập luyện rất tích cực, huấn luyện viên luôn để ý và động viên tôi mỗi ngày.",
    "Lớp tập và sự tận tâm của huấn luyện viên",
  ],
  [
    "Minh Thư",
    "Curves Phú Nhuận",
    5,
    "Sau ba tháng, tôi khỏe hơn và thấy việc tập luyện đã trở thành khoảng thời gian yêu thích trong ngày.",
    "Chương trình tập 30 phút",
  ],
  [
    "Ngọc Hà",
    "Curves Tân Bình",
    4,
    "Các bài tập vừa sức nhưng vẫn đủ thử thách. Tôi đặc biệt thích cảm giác tập cùng các chị em.",
    "Cộng đồng Curves",
  ],
  [
    "Bảo Yến",
    "Curves Bình Thạnh",
    5,
    "Tôi được hướng dẫn rất kỹ từ buổi đầu tiên. Nhờ vậy tôi tự tin duy trì thói quen tập đều đặn.",
    "Sự hướng dẫn cá nhân",
  ],
  [
    "Thanh Vy",
    "Curves Gò Vấp",
    5,
    "Không gian sạch sẽ, lịch tập linh hoạt và mọi người đều rất thân thiện.",
    "Sự tiện lợi",
  ],
  [
    "Thu Trang",
    "Curves Quận 7",
    4,
    "Chỉ cần 30 phút nhưng cơ thể tôi vận động toàn diện. Tôi thấy tinh thần cũng nhẹ nhàng hơn.",
    "Hiệu quả tập luyện",
  ],
  [
    "Kim Ngân",
    "Curves Quận 1",
    5,
    "Tôi thích cách các huấn luyện viên điều chỉnh bài tập phù hợp với thể trạng của từng người.",
    "Sự quan tâm",
  ],
  [
    "Mai Phương",
    "Curves Thủ Đức",
    5,
    "Curves giúp tôi quay lại với việc chăm sóc bản thân sau thời gian bận rộn với gia đình.",
    "Môi trường tích cực",
  ],
  [
    "Khánh Linh",
    "Curves Quận 10",
    4,
    "Mỗi buổi tập đều vui và tràn năng lượng. Tôi đã rủ cả bạn thân cùng tham gia.",
    "Cộng đồng Curves",
  ],
  [
    "Hồng Nhung",
    "Curves Quận 5",
    5,
    "Tôi nhận ra mình có thể kiên trì hơn mình nghĩ. Cảm ơn Curves vì đã đồng hành.",
    "Động lực tập luyện",
  ],
  [
    "Tú Uyên",
    "Curves Tân Phú",
    5,
    "Tập đều đặn giúp tôi ngủ ngon hơn và có nhiều năng lượng cho công việc.",
    "Sức khỏe toàn diện",
  ],
  [
    "Diễm My",
    "Curves Quận 2",
    4,
    "Buổi tập ngắn gọn, hiệu quả và rất dễ sắp xếp vào lịch hằng ngày của tôi.",
    "Chương trình tập 30 phút",
  ],
  [
    "Quỳnh Nhi",
    "Curves Quận 6",
    5,
    "Từ một người ngại tập thể dục, giờ tôi luôn mong đến ngày đi tập cùng Curves.",
    "Không khí lớp tập",
  ],
  [
    "Hà My",
    "Curves Quận 11",
    5,
    "Tôi yêu sự khích lệ nhẹ nhàng và chuyên nghiệp của các huấn luyện viên ở đây.",
    "Huấn luyện viên",
  ],
  [
    "Trâm Anh",
    "Curves Quận 8",
    4,
    "Tôi thấy cơ thể linh hoạt hơn hẳn và có thêm thời gian chất lượng cho bản thân.",
    "Lịch tập linh hoạt",
  ],
  [
    "Thảo Nhi",
    "Curves Quận 4",
    5,
    "Đây là nơi tôi có thể tập trung vào sức khỏe trong một môi trường đầy sự tôn trọng.",
    "Môi trường tập luyện",
  ],
  [
    "Phương Ly",
    "Curves Quận 12",
    5,
    "Tập tại Curves là quyết định tuyệt vời nhất tôi làm cho sức khỏe của mình năm nay.",
    "Hiệu quả tập luyện",
  ],
  [
    "Yến Nhi",
    "Curves Hóc Môn",
    4,
    "Mọi người đều thân thiện, khiến một người mới như tôi cảm thấy được chào đón ngay lập tức.",
    "Cộng đồng Curves",
  ],
] as const;

const mockFeedbacks: MemberFeedback[] = feedbacks.map(
  ([fullName, clubName, rating, content, favoriteAspect], index) => ({
    id: `feedback-${index + 1}`,
    fullName,
    clubName,
    clubId: `club-${(index % 6) + 1}`,
    attendanceTime: `${(index % 12) + 1} tháng`,
    rating,
    favoriteAspect,
    content,
    imageUrl: null,
    createdAt: new Date(2026, 7, 28 - index).toISOString(),
    updatedAt: new Date(2026, 7, 28 - index).toISOString(),
  }),
);

export const feedbackService = {
  list: async (page: number, limit = PAGE_SIZE): Promise<FeedbackPage> => {
    await new Promise((resolve) => window.setTimeout(resolve, 650));

    const start = (page - 1) * limit;
    const items = mockFeedbacks.slice(start, start + limit);

    return { items, hasMore: start + items.length < mockFeedbacks.length };
  },
};
