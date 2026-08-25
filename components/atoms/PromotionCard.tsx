"use client";

import { PF_STYLES } from "@/contants/styles";
import { diffToParts } from "@/lib/utils";
import { Promotion } from "@/schemas/promotion";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui";
import { Countdown } from "./Countdown";

type Props = {
  promo: Promotion;
};

export const PromotionCard = ({ promo }: Props) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const parts = useMemo(
    () => (promo?.endDate && diffToParts(promo?.endDate)) || { expired: false },
    [promo.endDate, tick],
  );

  const expired = parts?.expired || undefined;
  const bgFrom = promo.bgFrom || "#9b6fd6";
  const bgTo = promo.bgTo || "#5b2a9e";
  const cardStyle =
    promo.bgType === "IMAGE" && promo.imageUrl
      ? {
          backgroundImage: `linear-gradient(180deg, rgba(30,10,60,.45), rgba(20,8,45,.78)), url(${promo.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {
          background: `radial-gradient(120% 140% at 20% 0%, ${bgFrom} 0%, ${bgTo} 100%)`,
        };

  return (
    <div
      className={`pf-card h-full ${expired ? "pf-card-expired" : ""}`}
      style={cardStyle}
    >
      <style>{PF_STYLES}</style>
      <div className="pf-card-glow" />
      {promo.bgType !== "IMAGE" && <div className="pf-card-dots" />}

      {expired && <div className="pf-ribbon">Hết hạn</div>}

      <div className="pf-card-body">
        <div className="pf-eyebrow">
          <Flame className="pf-eyebrow-icon" size={14} />
          <span>{promo.badge}</span>
        </div>

        {promo.endDate && (
          <div className="pf-countdown">
            <Countdown targetDate={promo.endDate} />
          </div>
        )}

        <>
          <div className="pf-title">{promo.title}</div>
          <div className="pf-discount">{promo.discount}</div>
          {promo.extra && <div className="pf-extra">{promo.extra}</div>}
        </>

        <Button className="pf-cta" disabled={expired}>
          {expired ? "Đã kết thúc" : promo.ctaText}
        </Button>

        {expired ? (
          <div className="pf-footer-link pf-footer-link-disabled">
            {promo.footerText}
            <ArrowRight size={13} style={{ marginLeft: 4 }} />
          </div>
        ) : (
          <Link
            className="pf-footer-link"
            href={promo.footerLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {promo.footerText}
            <ArrowRight size={13} style={{ marginLeft: 4 }} />
          </Link>
        )}
      </div>
    </div>
  );
};
