export interface MemberFeedback {
  id: string;

  fullName: string;
  clubName: string;
  clubId: string | null;

  attendanceTime: string | null;
  rating: number;
  favoriteAspect: string | null;
  content: string;

  imageUrl: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface FeedbackPage {
  items: MemberFeedback[];
  hasMore: boolean;
}
