export const pricingPlans = [
  {
    variant: "free" as const,
    title: "PLANO GRÁTIS",
    description: "Publique seu anúncio gratuitamente e alcance milhares de pessoas interessadas",
    price: "R$ 0",
    originalPrice: "R$ 299",
    discount: "-100% OFF",
    badge: { text: "R$ 0,00", type: "simple" as const },
    features: [
      { text: "Visibilidade na plataforma" },
      { text: "Fotos e descrição completa" },
      { text: "Sem limite de tempo" }
    ],
    bottomBadge: "✨ Ideal para começar",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    )
  },
  {
    variant: "highlighted" as const,
    title: "PLANO DESTAQUE",
    description: "Seu anúncio em destaque no topo com até <strong>180x mais visibilidade</strong>",
    price: "R$ 0",
    originalPrice: "R$ 299",
    discount: "-100% OFF",
    period: "/mês",
    badge: { text: "Mais Popular", type: "popular" as const },
    features: [
      { text: "Posição privilegiada no topo" },
      { text: "Badge especial de destaque" },
      { text: "180x mais visualizações" },
      { text: "Venda mais rápido" },
      { text: "Venda mais rápido" },
      { text: "Venda mais rápido" }
    ],
    bottomBadge: "⚡ Máxima performance",
    icon: (
      <svg className="w-12 h-12" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.1827 4.37582C27.0607 4.36212 28.8819 4.59617 30.6166 5.04675L26.193 9.53328C25.8574 9.87516 25.562 10.2543 25.3125 10.6632L25.2286 10.6638C22.3268 10.685 19.4964 11.5662 17.0953 13.196C14.6943 14.8258 12.8304 17.131 11.7395 19.8201C10.6486 22.5091 10.3796 25.4613 10.9665 28.3033C11.5534 31.1453 12.9698 33.7494 15.0367 35.7863C17.1036 37.8233 19.7281 39.2016 22.5784 39.7469C25.4286 40.2923 28.3765 39.9802 31.0494 38.8501C33.7223 37.72 36 35.8228 37.5946 33.3982C39.1891 30.9736 40.0289 28.1307 40.0077 25.2288L40.0071 25.145C40.4105 24.8905 40.7822 24.5908 41.122 24.246L45.5456 19.7594C46.0215 21.4874 46.2821 23.3049 46.2958 25.1829C46.3803 36.7591 37.0649 46.2115 25.4887 46.2959C13.9124 46.3804 4.46014 37.0651 4.37564 25.4889C4.29115 13.9126 13.6065 4.46032 25.1827 4.37582ZM24.3917 14.8978C24.4047 16.6815 24.3299 18.491 24.4393 20.2719L23.3158 21.412C22.9293 21.8042 22.6238 22.2687 22.4168 22.7789C22.2098 23.2892 22.1053 23.8352 22.1093 24.3858C22.1134 24.9364 22.2258 25.4808 22.4402 25.988C22.6546 26.4952 22.9668 26.9551 23.359 27.3416C23.7512 27.7281 24.2157 28.0336 24.7259 28.2406C25.2362 28.4476 25.7822 28.5521 26.3328 28.548C26.8834 28.544 27.4278 28.4316 27.935 28.2172C28.4422 28.0028 28.9021 27.6905 29.2886 27.2983L30.4122 26.1582C32.1945 26.2417 34.0006 26.1404 35.7864 26.1274C35.6354 28.1205 34.9175 30.0289 33.7175 31.6274C32.5175 33.226 30.8854 34.448 29.0136 35.1494C27.1419 35.8508 25.1086 36.0023 23.1536 35.586C21.1986 35.1698 19.4033 34.2031 17.9797 32.8001C16.556 31.397 15.5632 29.6161 15.1185 27.6674C14.6737 25.7187 14.7956 23.6834 15.4696 21.8016C16.1436 19.9198 17.3416 18.27 18.9225 17.0468C20.5033 15.8236 22.401 15.0779 24.3917 14.8978ZM38.8171 4.54251C39.2008 4.69835 39.5298 4.96437 39.7625 5.30701C39.9952 5.64964 40.1211 6.05353 40.1244 6.46769L40.1524 10.3034L43.986 10.2754C44.4005 10.2725 44.8066 10.3925 45.1529 10.6203C45.4991 10.8481 45.7701 11.1734 45.9315 11.5552C46.0929 11.937 46.1375 12.3581 46.0596 12.7652C45.9818 13.1723 45.7849 13.5472 45.494 13.8425L38.1345 21.3018C37.7444 21.6977 37.213 21.9225 36.6571 21.9267L31.5994 21.9636L27.7959 25.8252C27.4055 26.2214 26.8737 26.4462 26.3175 26.4503C25.7613 26.4543 25.2262 26.2373 24.8301 25.8468C24.4339 25.4564 24.2091 24.9246 24.205 24.3684C24.2009 23.8122 24.418 23.2772 24.8084 22.881L28.6141 19.0236L28.5771 13.9638C28.5749 13.6883 28.6271 13.4149 28.7306 13.1595C28.8341 12.9041 28.987 12.6716 29.1804 12.4754L36.5357 5.01193C36.8267 4.71649 37.1988 4.51399 37.6049 4.43006C38.011 4.34613 38.4328 4.38454 38.8171 4.54042" fill="white" />
      </svg>
    )
  },
  {
    variant: "studio" as const,
    title: "IMOBLY STUDIO",
    description: "Seu espaço profissional com <strong>página personalizada</strong> e todos os benefícios do destaque",
    price: "R$ 149",
    originalPrice: "R$ 299",
    discount: "-50% OFF",
    period: "/mês",
    badge: { text: "Melhores Vantagens", type: "studio" as const },
    features: [
      { text: "🏢 Página personalizada da sua marca" },
      { text: "🎨 Logo e cores personalizadas" },
      { text: "🔗 URL personalizada (imobly.com/você)" },
      { text: "⚡ Todos anúncios em DESTAQUE automático" },
      { text: "📊 Analytics e estatísticas avançadas" },
      { text: "🎯 Suporte prioritário" }
    ],
    bottomBadge: "🚀 Conhecer IMOBLY STUDIO",
    icon: (
      <svg
        className="w-12 h-12 group-hover:animate-pulse"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M13 1.5L15.7 8.3L22.5 11L15.7 13.7L13 20.5L10.3 13.7L3.5 11L10.3 8.3L13 1.5Z"
          fill="currentColor"
        />
        <circle cx="21" cy="5" r="1.4" fill="currentColor" opacity="0.85" />
        <circle cx="5.5" cy="20" r="1" fill="currentColor" opacity="0.55" />
      </svg>
    )
  }
];

