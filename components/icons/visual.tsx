export const VisualIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Soft decorative circles */}
      <circle cx="400" cy="90" r="100" fill="#A66BC9" opacity="0.18" />

      <circle cx="70" cy="430" r="120" fill="#E9CE9A" opacity="0.1" />

      {/* Glow */}
      <ellipse
        cx="240"
        cy="300"
        rx="150"
        ry="170"
        fill="#FFFFFF"
        opacity="0.06"
      />

      {/* Person */}
      <g opacity="0.95">
        {/* Head */}
        <circle cx="240" cy="145" r="58" fill="#F4E9FF" />

        {/* Hair */}
        <path
          d="
            M184 150
            C180 105 202 70 241 70
            C282 70 307 102 302 151
            C293 126 275 112 250 109
            C226 107 203 120 184 150Z
          "
          fill="#E5D0F2"
        />

        {/* Neck */}
        <path
          d="M218 192H262V225C262 239 250 248 240 248C230 248 218 239 218 225V192Z"
          fill="#F4E9FF"
        />

        {/* Body / shoulders */}
        <path
          d="
            M218 220
            C190 224 164 241 145 270
            C126 300 116 350 112 410
            H368
            C364 350 354 300 335 270
            C316 241 290 224 262 220
            C257 244 249 258 240 258
            C231 258 223 244 218 220Z
          "
          fill="#F4E9FF"
        />

        {/* Clothing detail */}
        <path
          d="
            M190 238
            C207 263 222 276 240 276
            C258 276 273 263 290 238
            L307 270
            C288 292 267 304 240 304
            C213 304 192 292 173 270
            L190 238Z
          "
          fill="#D8BCEB"
          opacity="0.65"
        />

        {/* Soft lower shadow */}
        <ellipse
          cx="240"
          cy="420"
          rx="125"
          ry="20"
          fill="#14051F"
          opacity="0.12"
        />
      </g>

      {/* Decorative sparkles */}
      <circle cx="92" cy="145" r="5" fill="#E9CE9A" opacity="0.7" />
      <circle cx="380" cy="245" r="4" fill="#FFFFFF" opacity="0.35" />
      <circle cx="100" cy="330" r="3" fill="#FFFFFF" opacity="0.3" />
    </svg>
  );
};
