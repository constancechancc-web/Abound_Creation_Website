const whatsAppMessage = "Hi Abound Creation, I'd like to discuss a project.";
const address = "10, Jalan Seroja 39, Taman Johor Jaya, 81100 Johor Bahru, Johor.";

export const contactDetails = {
  primaryPhone: { display: "019-660 9102", href: "tel:+60196609102" },
  secondaryPhone: { display: "013-776 6128", href: "tel:+60137766128" },
  email: { display: "aboundcreation@gmail.com", href: "mailto:aboundcreation@gmail.com" },
  address: { display: address },
  whatsAppMessage,
  whatsAppUrl: `https://wa.me/60196609102?text=${encodeURIComponent(whatsAppMessage)}`,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  facebook: "https://www.facebook.com/profile.php?id=61576845867548",
  instagram: "https://www.instagram.com/aboundcreation/?utm_source=ig_web_button_share_sheet",
} as const;
