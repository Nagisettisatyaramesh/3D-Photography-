import type { ImageKey } from "./images";

// Placeholder testimonials with generic stock portraits — pending the
// studio's real client reviews via the admin Testimonials module (Phase B).
export type Testimonial = {
  names: string;
  location: string;
  quote: string;
  image: ImageKey;
};

export const testimonials: Testimonial[] = [
  {
    names: "Aarav & Meera",
    location: "Hyderabad",
    quote:
      "We didn't just receive photographs. We received our memories back.",
    image: "coupleCloseOutdoors",
  },
  {
    names: "Riya & Arjun",
    location: "Jaipur",
    quote:
      "They disappeared into the day and somehow still caught everything that mattered.",
    image: "coupleSunsetPortrait",
  },
  {
    names: "Kavya & Dev",
    location: "Goa",
    quote:
      "Watching our film back felt like living the wedding a second time, from the outside.",
    image: "coupleEmbraceBacklit",
  },
  {
    names: "Ananya & Rohan",
    location: "Udaipur",
    quote:
      "Not one posed, stiff photograph in the entire album. Every page feels like us.",
    image: "coupleFormalWalking",
  },
  {
    names: "Sanya & Karthik",
    location: "Kerala",
    quote:
      "Our families still talk about how comfortable the team made everyone feel.",
    image: "coupleSilhouetteSunset",
  },
];
