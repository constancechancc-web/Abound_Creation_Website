import { describe, expect, it } from "vitest";

import { contactDetails } from "@/data/contact-details";

describe("contactDetails", () => {
  it("builds the approved primary WhatsApp link", () => {
    expect(contactDetails.whatsAppUrl).toBe(`https://wa.me/60196609102?text=${encodeURIComponent("Hi Abound Creation, I'd like to discuss a project.")}`);
  });

  it("publishes both phones, email and address", () => {
    expect(contactDetails.primaryPhone).toEqual({ display: "019-660 9102", href: "tel:+60196609102" });
    expect(contactDetails.secondaryPhone).toEqual({ display: "013-776 6128", href: "tel:+60137766128" });
    expect(contactDetails.email).toEqual({ display: "aboundcreation@gmail.com", href: "mailto:aboundcreation@gmail.com" });
    expect(contactDetails.address.display).toBe("10, Jalan Seroja 39, Taman Johor Jaya, 81100 Johor Bahru, Johor.");
    expect(contactDetails.mapUrl).toContain("google.com/maps/search");
  });
});
