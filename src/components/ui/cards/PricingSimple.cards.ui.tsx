"use client";

interface PlanCardProps {
  badgeText: string;
  badgeGradient: string;
  title: string;
  subtitle: string;
  price: string;
  priceColor: string;
  benefits: string[];
  bulletColor: string;
  buttonGradient: string;
  buttonBorderColor: string;
  buttonShadowColor: string;
  borderColor: string;
}

export function PlanCard({
  badgeText,
  badgeGradient,
  title,
  subtitle,
  price,
  priceColor,
  benefits,
  bulletColor,
  buttonGradient,
  buttonBorderColor,
  buttonShadowColor,
  borderColor,
}: PlanCardProps) {
  return (
    <div
      className={`
        relative group overflow-hidden rounded-3xl p-8
        transition-all duration-500 transform hover:-translate-y-2
        bg-white shadow-xl border ${borderColor}
      `}
    >
      {/* Badge */}
      <div
        className={`
          absolute -right-6 top-6 w-40 rotate-45 origin-top-right z-20
          ${badgeGradient}
          text-white text-xs font-bold py-2 text-center shadow-lg
        `}
      >
        {badgeText}
      </div>

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className={`text-4xl font-extrabold ${priceColor}`}>{price}</p>
        <p className="text-gray-500 text-xs">por mês</p>
      </div>

      {/* Benefits */}
      <ul className="space-y-3 text-gray-700 mb-6">
        {benefits.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className={`${bulletColor} font-bold`}>•</span> {b}
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        className={`
          w-full py-3 font-bold text-white rounded-xl
          ${buttonGradient}
          border ${buttonBorderColor}
          shadow-[0_4px_0_var(--shadow-color)]
          transition-all duration-300 ease-out
          hover:-translate-y-[3px]
          active:translate-y-px
        `}
        style={{
          ["--shadow-color" as any]: buttonShadowColor,
        }}
      >
        Escolher plano
      </button>
    </div>
  );
}

