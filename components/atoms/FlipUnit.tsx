import { FlipDigit } from "./FlipDigit";

export function FlipUnit({ value, label }: { value: number; label: string }) {
  const digits = String(value).padStart(2, "0").split("");

  return (
    <div className="pf-unit">
      <div className="pf-unit-digits">
        {digits.map((digit, index) => (
          <FlipDigit key={index} value={digit} />
        ))}
      </div>

      <span className="pf-unit-label">{label}</span>
    </div>
  );
}
