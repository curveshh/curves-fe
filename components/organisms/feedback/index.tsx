"use client";

import { CardContent } from "@/components/ui/card";
import {
  MemberFeedbackFormValues,
  memberFeedbackSchema,
} from "@/schemas/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SubmitForm } from "./Submit";
import { ThanksForm } from "./Thanks";

type ImageItem = {
  id: string;
  src: string;
  name: string;
};

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export default function FeedbackForm() {
  const form = useForm<MemberFeedbackFormValues>({
    resolver: zodResolver(memberFeedbackSchema),
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    club: "",
    story: "",
  });
  const [rating, setRating] = useState<Rating>(0);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values: MemberFeedbackFormValues) => {};

  const resetForm = () => {
    form.reset();
    setErrors({
      name: "",
      phone: "",
      club: "",
      story: "",
    });
    setRating(0);
    setImages([]);
    setSubmitted(false);
  };

  return (
    <div className="bg-violet-50 rounded-2xl">
      {/* FORM CARD */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="p-4">
            {!submitted ? <SubmitForm /> : <ThanksForm />}
          </CardContent>
        </form>
      </FormProvider>
    </div>
  );
}
