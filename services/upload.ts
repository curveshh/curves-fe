import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { type BaseResponse } from "@/types/base";

type UploadedImage = {
  url: string;
};

export const uploadService = {
  uploadImages: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return await http.post<BaseResponse<UploadedImage>>(
      API.UPLOAD_IMAGES,
      formData,
    );
  },
};
