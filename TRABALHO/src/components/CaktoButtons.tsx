import { useEffect } from "react";

const SRC = "https://caktoscripts.nyc3.cdn.digitaloceanspaces.com/upsell.js";

type Props = { offerId: string; offerType: "upsell" | "downsell"; rejectUrl: string; acceptLabel: string; rejectLabel: string };

export function CaktoButtons({ offerId, offerType, rejectUrl, acceptLabel, rejectLabel }: Props) {
  useEffect(() => {
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);
  const El = "cakto-upsell-buttons" as any;
  const Accept = "cakto-upsell-accept" as any;
  const Reject = "cakto-upsell-reject" as any;
  return (
    <div className="cakto-wrap">
      <El>
        <Accept bg-color="#0f7865" text-color="#ffffff" upsell-accept-url="members_area" offer-id={offerId}
          app-base-url="https://app.cakto.com.br" offer-type={offerType} upsell-reject-url={rejectUrl}>
          {acceptLabel}
        </Accept>
        <Reject upsell-reject-url={rejectUrl}>{rejectLabel}</Reject>
      </El>
    </div>
  );
}
