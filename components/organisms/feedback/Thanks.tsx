import { Button } from "@/components/ui";
import { ROUTE } from "@/contants/route";
import { Heart } from "lucide-react";
import Link from "next/link";

type Props = {};

export const ThanksForm = ({}: Props) => {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-purple-700 to-purple-500 shadow-lg shadow-purple-300">
        <Heart className="h-9 w-9 fill-white text-white" />
      </div>
      <h2 className="text-2xl font-semibold text-purple-950">
        Cảm ơn bạn đã chia sẻ!
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        Câu chuyện của bạn có thể truyền cảm hứng đến rất nhiều phụ nữ khác trên
        hành trình khỏe đẹp cùng Curves.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3 text-sm font-bold">
        <Link href={ROUTE.HOME}>
          <Button className="text-white hover:underline">
            Quay về trang chủ
          </Button>
        </Link>
        <span className="text-purple-200">|</span>
        <Link href={ROUTE.FEEDBACK}>
          <Button className="text-white hover:underline">
            Xem câu chuyện thành công
          </Button>
        </Link>
      </div>
    </div>
  );
};
