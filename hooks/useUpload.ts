import { useApiMutation } from "@/queries/use-api-mutation";
import { uploadService } from "@/services/upload";

type UploadedImage = {
  url: string;
};

export const useUpload = () => {
  const uploadImages = useApiMutation<UploadedImage, File>({
    mutationFn: (file: File) => uploadService.uploadImages(file),
  });

  return {
    uploadImages,
  };
};
