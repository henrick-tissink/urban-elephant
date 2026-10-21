// The privacy policy, in English for every locale: a legal text is published
// in the language it was approved in, not machine-translated per locale.
// Written from what the systems actually collect (website forms, the
// Nightsbridge hand-off, the guest app, Yoco, WhatsApp, Google tags). When one
// of those changes, this changes with it, and `updated` moves.

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export const PRIVACY_POLICY = {
  updated: "21 October 2026",
  intro: [
    "Urban Elephant (PTY) Ltd runs the Urban Elephant apartment hotels in Cape Town. This policy explains what personal information we collect when you visit urbanelephant.co.za, book with us, stay with us or message us, why we collect it, who we share it with and the rights you have under the Protection of Personal Information Act, 2013 (POPIA).",
  ],
  sections: [
    {
      heading: "Who is responsible",
      paragraphs: [
        "Urban Elephant (PTY) Ltd is the responsible party for your personal information. Our Information Officer is Niles Hemming. For anything in this policy, email niles@urbanelephant.co.za.",
      ],
    },
    {
      heading: "What we collect",
      items: [
        "Enquiries and callback requests: your name, email address and/or phone number, your message, and the property, tour, dates and number of guests you ask about.",
        "Partner applications: your name, phone number, email address, the location of your property and the number of units.",
        "Bookings: when you book on our website you complete the booking with Nightsbridge, our reservations system. We receive your name, contact details, stay dates, number of guests and the booking's payment status.",
        "Your stay: our guest app holds your name, phone number, email address, stay details, the preferences you tell us (for example a high floor or dietary needs) and the requests you send us during your stay. If you allow notifications, your device's notification address is stored so we can send them.",
        "Payments: payment links are processed by Yoco. Your card details go to Yoco directly; we never see or store your card number.",
        "WhatsApp: we send your stay link and stay information to your WhatsApp number, and we receive the replies you send to that number.",
        "Website use: Google Analytics and Google Ads cookies record how the website is used, such as the pages visited, the device and browser, and an approximate location.",
      ],
    },
    {
      heading: "Why we use it",
      items: [
        "To answer your enquiry or call you back.",
        "To take, manage and look after your booking and your stay, including sending your stay link, arrival details and door codes.",
        "To take payment for your stay and any extras.",
        "To meet our legal, accounting and tax obligations.",
        "To understand how the website is used and improve it, and to measure our advertising.",
        "To send you news and offers, but only if you have agreed to it. You can stop these at any time.",
      ],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "We do not sell your personal information. We share it only with the service providers who help us run our business, and only what each needs:",
      ],
      items: [
        "Nightsbridge, for reservations.",
        "Yoco, for card payments.",
        "Meta (WhatsApp Business Platform), to send and receive WhatsApp messages.",
        "Resend, to send email.",
        "Supabase and Hetzner, who host our guest app and its database.",
        "Google, for website analytics and advertising measurement.",
      ],
    },
    {
      heading: "Information sent outside South Africa",
      paragraphs: [
        "Some of these providers store or process information outside South Africa. We use providers that are bound by data protection laws or agreements that give your information a level of protection comparable to POPIA.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep your personal information only for as long as we need it for the purposes above, and for as long as tax and company law requires us to keep records. After that we delete it or remove what identifies you.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Our website uses Google Analytics and Google Ads cookies. You can block or delete cookies in your browser settings; the website still works without them.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: ["Under POPIA you may:"],
      items: [
        "ask whether we hold personal information about you, and for a copy of it;",
        "ask us to correct or delete it;",
        "object to how we use it;",
        "ask us to stop sending you marketing.",
      ],
    },
    {
      heading: "Complaints",
      paragraphs: [
        "Email niles@urbanelephant.co.za first and we will do our best to put it right. You may also complain to the Information Regulator of South Africa at inforegulator.org.za.",
      ],
    },
    {
      heading: "Keeping it safe",
      paragraphs: [
        "We protect your information with access controls, encrypted connections and by limiting it to the people who need it to look after you.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy. The date at the top shows when it last changed.",
      ],
    },
  ] satisfies PolicySection[],
};
