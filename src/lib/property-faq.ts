import { formatZar, type Localized } from "@/lib/i18n-content";
import type { Property } from "@/types";

export interface FaqEntry {
  q: Localized<string>;
  a: Localized<string>;
}

const POOL_PROPERTIES = new Set([
  "16-on-bree",
  "the-rose",
  "the-docklands",
]);

const GYM_PROPERTIES = new Set(["16-on-bree", "the-rose"]);

// Parking differs by property: Flamingo Express has none, The Docklands is
// free, 16 On Bree is R75/night, and The Rose is paid at a rate that varies.
type ParkingInfo = { type: "none" | "free" | "paid"; rate?: number };

const PARKING: Record<string, ParkingInfo> = {
  "the-flamingo": { type: "none" },
  "the-docklands": { type: "free" },
  "16-on-bree": { type: "paid", rate: 75 },
  "the-rose": { type: "paid" },
};

function parkingAnswer(propName: string, parking: ParkingInfo): Localized<string> {
  if (parking.type === "none") {
    return {
      en: `${propName} doesn't have on-site parking. If you're arriving by car, message our Guest Relations team and we'll help you find a spot nearby.`,
      af: `${propName} het nie parkering op die perseel nie. As jy met die motor aankom, stuur vir ons Gasteverhoudinge-span 'n boodskap en ons sal jou help om 'n plek naby te vind.`,
      de: `${propName} verfügt über keine hauseigenen Parkplätze. Wenn Sie mit dem Auto anreisen, schreiben Sie unserem Guest-Relations-Team — wir helfen Ihnen, einen Platz in der Nähe zu finden.`,
      fr: `${propName} ne dispose pas de parking sur place. Si vous arrivez en voiture, contactez notre équipe Guest Relations et nous vous aiderons à trouver une place à proximité.`,
      da: `${propName} har ikke parkering på stedet. Hvis du ankommer i bil, så skriv til vores Guest Relations-team — vi hjælper dig med at finde en plads i nærheden.`,
    };
  }
  if (parking.type === "free") {
    return {
      en: `Yes — secure parking is available at ${propName} at no extra cost. Reserve your space when you book direct.`,
      af: `Ja — veilige parkering is by ${propName} teen geen ekstra koste beskikbaar nie. Bespreek jou plek wanneer jy direk bespreek.`,
      de: `Ja — gesicherte Parkplätze sind im ${propName} ohne Aufpreis verfügbar. Reservieren Sie Ihren Platz, wenn Sie direkt buchen.`,
      fr: `Oui — un parking sécurisé est disponible au ${propName} sans frais supplémentaires. Réservez votre place lorsque vous réservez en direct.`,
      da: `Ja — sikker parkering er til rådighed på ${propName} uden ekstra omkostninger. Reserver din plads, når du booker direkte.`,
    };
  }
  if (parking.rate) {
    const rate = `R${parking.rate}`;
    return {
      en: `Yes — secure parking is available at ${propName} for an additional ${rate} per night. Reserve your space when you book direct.`,
      af: `Ja — veilige parkering is by ${propName} teen 'n bykomende ${rate} per nag beskikbaar. Bespreek jou plek wanneer jy direk bespreek.`,
      de: `Ja — gesicherte Parkplätze sind im ${propName} für zusätzliche ${rate} pro Nacht verfügbar. Reservieren Sie Ihren Platz, wenn Sie direkt buchen.`,
      fr: `Oui — un parking sécurisé est disponible au ${propName} pour un supplément de ${rate} par nuit. Réservez votre place lorsque vous réservez en direct.`,
      da: `Ja — sikker parkering er til rådighed på ${propName} for et tillæg på ${rate} pr. nat. Reserver din plads, når du booker direkte.`,
    };
  }
  return {
    en: `Yes — secure parking is available at ${propName} for an additional charge. Reserve your space when you book direct.`,
    af: `Ja — veilige parkering is by ${propName} teen 'n bykomende koste beskikbaar. Bespreek jou plek wanneer jy direk bespreek.`,
    de: `Ja — gesicherte Parkplätze sind im ${propName} gegen einen Aufpreis verfügbar. Reservieren Sie Ihren Platz, wenn Sie direkt buchen.`,
    fr: `Oui — un parking sécurisé est disponible au ${propName} pour un supplément. Réservez votre place lorsque vous réservez en direct.`,
    da: `Ja — sikker parkering er til rådighed på ${propName} mod et tillæg. Reserver din plads, når du booker direkte.`,
  };
}

function formatPrice(min: number, max?: number): string {
  if (max) return `${formatZar(min)} – ${formatZar(max)}`;
  return formatZar(min);
}

/**
 * Property-specific FAQs generated from each property's data — used for
 * FAQPage JSON-LD and the "Common questions" section on the property page.
 *
 * These are intentionally factual (address, rate, pool/gym presence,
 * parking) so each property page emits unique schema rather than duplicating
 * the master /faq page.
 */
export function propertyFaqs(property: Property): FaqEntry[] {
  const entries: FaqEntry[] = [];
  const propName = `Urban Elephant at ${property.name}`;

  if (property.address) {
    entries.push({
      q: {
        en: `Where is ${propName} located?`,
        af: `Waar is ${propName} geleë?`,
        de: `Wo befindet sich ${propName}?`,
        fr: `Où se trouve ${propName} ?`,
        da: `Hvor ligger ${propName}?`,
      },
      a: {
        en: `${propName} is at ${property.address}. It's officially TGCSA-graded as a 4-star apartment hotel.`,
        af: `${propName} is geleë te ${property.address}. Dit is amptelik deur die TGCSA gegradeer as 'n 4-ster woonstelhotel.`,
        de: `${propName} befindet sich in ${property.address}. Es ist offiziell von der TGCSA als 4-Sterne-Apartmenthotel eingestuft.`,
        fr: `${propName} se situe à ${property.address}. Il est officiellement classé 4 étoiles par la TGCSA en tant qu'hôtel-appartement.`,
        da: `${propName} ligger på ${property.address}. Det er officielt TGCSA-klassificeret som et 4-stjernet lejlighedshotel.`,
      },
    });
  }

  if (property.priceRange) {
    const range = formatPrice(property.priceRange.min, property.priceRange.max);
    const hasMax = property.priceRange.max;
    const suffix = {
      en: hasMax ? "" : " per night",
      af: hasMax ? "" : " per nag",
      de: hasMax ? "" : " pro Nacht",
      fr: hasMax ? "" : " par nuit",
      da: hasMax ? "" : " pr. nat",
    };
    entries.push({
      q: {
        en: `How much does it cost to stay at ${property.name}?`,
        af: `Hoeveel kos 'n verblyf by ${property.name}?`,
        de: `Wie viel kostet ein Aufenthalt im ${property.name}?`,
        fr: `Combien coûte un séjour au ${property.name} ?`,
        da: `Hvad koster et ophold på ${property.name}?`,
      },
      a: {
        en: hasMax
          ? `Rates at ${propName} range from ${range} per night, depending on the apartment and dates. Book direct for the best available rate — we beat any cheaper rate found online by 10%.`
          : `Rates at ${propName} start from ${range}${suffix.en}. Book direct for the best available rate — we beat any cheaper rate found online by 10%.`,
        af: hasMax
          ? `Tariewe by ${propName} wissel van ${range} per nag, afhangende van die woonstel en datums. Bespreek direk vir die beste beskikbare tarief — ons klop enige goedkoper tarief wat aanlyn gevind word met 10%.`
          : `Tariewe by ${propName} begin vanaf ${range}${suffix.af}. Bespreek direk vir die beste beskikbare tarief — ons klop enige goedkoper tarief wat aanlyn gevind word met 10%.`,
        de: hasMax
          ? `Die Preise im ${propName} liegen je nach Apartment und Datum zwischen ${range} pro Nacht. Buchen Sie direkt für den besten verfügbaren Preis — wir unterbieten jeden günstigeren Online-Preis um 10%.`
          : `Die Preise im ${propName} beginnen bei ${range}${suffix.de}. Buchen Sie direkt für den besten verfügbaren Preis — wir unterbieten jeden günstigeren Online-Preis um 10%.`,
        fr: hasMax
          ? `Les tarifs au ${propName} varient de ${range} par nuit, selon l'appartement et les dates. Réservez en direct pour le meilleur tarif disponible — nous battons tout tarif moins cher trouvé en ligne de 10%.`
          : `Les tarifs au ${propName} commencent à ${range}${suffix.fr}. Réservez en direct pour le meilleur tarif disponible — nous battons tout tarif moins cher trouvé en ligne de 10%.`,
        da: hasMax
          ? `Priserne på ${propName} varierer fra ${range} pr. nat, afhængigt af lejligheden og datoerne. Book direkte for den bedste tilgængelige pris — vi slår enhver billigere pris fundet online med 10%.`
          : `Priserne på ${propName} starter fra ${range}${suffix.da}. Book direkte for den bedste tilgængelige pris — vi slår enhver billigere pris fundet online med 10%.`,
      },
    });
  }

  const hasPool = POOL_PROPERTIES.has(property.slug);
  const hasGym = GYM_PROPERTIES.has(property.slug);
  if (hasPool || hasGym) {
    entries.push({
      q: {
        en: `Does ${property.name} have a swimming pool and gym?`,
        af: `Het ${property.name} 'n swembad en gimnasium?`,
        de: `Verfügt ${property.name} über einen Swimmingpool und ein Fitnessstudio?`,
        fr: `${property.name} dispose-t-il d'une piscine et d'une salle de sport ?`,
        da: `Har ${property.name} en swimmingpool og et fitnesscenter?`,
      },
      a: {
        en:
          hasPool && hasGym
            ? `Yes — ${propName} has both a swimming pool and an on-site gym, alongside the full hotel-grade amenity set.`
            : hasPool
              ? `${propName} has a swimming pool. The on-site gym is available at our 16 On Bree and The Rose properties.`
              : `${propName} has an on-site gym. Swimming pools are available at our 16 On Bree, The Rose and The Docklands properties.`,
        af:
          hasPool && hasGym
            ? `Ja — ${propName} het beide 'n swembad en 'n gimnasium op die perseel, saam met die volledige stel geriewe op hotelvlak.`
            : hasPool
              ? `${propName} het 'n swembad. Die gimnasium op die perseel is by ons 16 On Bree- en The Rose-eiendomme beskikbaar.`
              : `${propName} het 'n gimnasium op die perseel. Swembaddens is by ons 16 On Bree-, The Rose- en The Docklands-eiendomme beskikbaar.`,
        de:
          hasPool && hasGym
            ? `Ja — ${propName} verfügt sowohl über einen Swimmingpool als auch über ein hauseigenes Fitnessstudio, zusätzlich zur kompletten Ausstattung auf Hotelniveau.`
            : hasPool
              ? `${propName} verfügt über einen Swimmingpool. Das hauseigene Fitnessstudio ist in unseren Häusern 16 On Bree und The Rose verfügbar.`
              : `${propName} verfügt über ein hauseigenes Fitnessstudio. Swimmingpools sind in unseren Häusern 16 On Bree, The Rose und The Docklands verfügbar.`,
        fr:
          hasPool && hasGym
            ? `Oui — ${propName} dispose à la fois d'une piscine et d'une salle de sport sur place, en plus de l'ensemble complet des équipements de niveau hôtelier.`
            : hasPool
              ? `${propName} dispose d'une piscine. La salle de sport sur place est disponible dans nos établissements 16 On Bree et The Rose.`
              : `${propName} dispose d'une salle de sport sur place. Des piscines sont disponibles dans nos établissements 16 On Bree, The Rose et The Docklands.`,
        da:
          hasPool && hasGym
            ? `Ja — ${propName} har både en swimmingpool og et fitnesscenter på stedet, ud over det fulde udvalg af faciliteter på hotelniveau.`
            : hasPool
              ? `${propName} har en swimmingpool. Fitnesscenteret på stedet er tilgængeligt på vores ejendomme 16 On Bree og The Rose.`
              : `${propName} har et fitnesscenter på stedet. Swimmingpools er tilgængelige på vores ejendomme 16 On Bree, The Rose og The Docklands.`,
      },
    });
  } else {
    entries.push({
      q: {
        en: `Does ${property.name} have a swimming pool or gym?`,
        af: `Het ${property.name} 'n swembad of gimnasium?`,
        de: `Verfügt ${property.name} über einen Swimmingpool oder ein Fitnessstudio?`,
        fr: `${property.name} dispose-t-il d'une piscine ou d'une salle de sport ?`,
        da: `Har ${property.name} en swimmingpool eller et fitnesscenter?`,
      },
      a: {
        en: `${propName} doesn't have an on-site pool or gym, but you're a short walk from Sea Point Promenade, with public pools and gyms nearby. Pools are available at our 16 On Bree, The Rose and The Docklands properties.`,
        af: `${propName} het nie 'n swembad of gimnasium op die perseel nie, maar jy is 'n kort entjie van die Sea Point-promenade af, met openbare swembaddens en gimnasiums naby. Swembaddens is by ons 16 On Bree-, The Rose- en The Docklands-eiendomme beskikbaar.`,
        de: `${propName} verfügt über keinen hauseigenen Pool oder ein Fitnessstudio, aber Sie sind nur einen kurzen Spaziergang von der Sea Point Promenade entfernt, mit öffentlichen Schwimmbädern und Fitnessstudios in der Nähe. Pools sind in unseren Häusern 16 On Bree, The Rose und The Docklands verfügbar.`,
        fr: `${propName} ne dispose pas de piscine ou de salle de sport sur place, mais vous êtes à quelques pas de la Sea Point Promenade, avec des piscines et des salles de sport publiques à proximité. Des piscines sont disponibles dans nos établissements 16 On Bree, The Rose et The Docklands.`,
        da: `${propName} har ikke en pool eller et fitnesscenter på stedet, men du er kun en kort gåtur fra Sea Point Promenade, med offentlige pools og fitnesscentre i nærheden. Pools er tilgængelige på vores ejendomme 16 On Bree, The Rose og The Docklands.`,
      },
    });
  }

  entries.push({
    q: {
      en: `Is parking available at ${property.name}?`,
      af: `Is daar parkering by ${property.name} beskikbaar?`,
      de: `Sind Parkplätze im ${property.name} verfügbar?`,
      fr: `Un parking est-il disponible au ${property.name} ?`,
      da: `Er der parkering til rådighed på ${property.name}?`,
    },
    a: parkingAnswer(propName, PARKING[property.slug] ?? { type: "paid" }),
  });

  entries.push({
    q: {
      en: `What time is check-in and check-out at ${property.name}?`,
      af: `Wanneer is inboek en uitboek by ${property.name}?`,
      de: `Wann sind Check-in und Check-out im ${property.name}?`,
      fr: `À quelle heure sont l'arrivée et le départ au ${property.name} ?`,
      da: `Hvornår er check-in og check-ud på ${property.name}?`,
    },
    a: {
      en: `Check-in is from 15h00 and check-out is at 10h30. Early check-in and late check-out can usually be arranged subject to availability — message Karin on WhatsApp once your booking is confirmed.`,
      af: `Inboek is vanaf 15h00 en uitboek is om 10h30. Vroeë inboek en laat uitboek kan gewoonlik gereël word, onderhewig aan beskikbaarheid — stuur vir Karin 'n boodskap op WhatsApp sodra jou bespreking bevestig is.`,
      de: `Check-in ist ab 15h00 und Check-out ist um 10h30. Früher Check-in und später Check-out können in der Regel je nach Verfügbarkeit arrangiert werden — schreiben Sie Karin auf WhatsApp, sobald Ihre Buchung bestätigt ist.`,
      fr: `L'arrivée se fait à partir de 15h00 et le départ à 10h30. Une arrivée anticipée et un départ tardif peuvent généralement être arrangés sous réserve de disponibilité — contactez Karin sur WhatsApp une fois votre réservation confirmée.`,
      da: `Check-in er fra 15h00, og check-ud er kl. 10h30. Tidligt check-in og sent check-ud kan normalt arrangeres efter tilgængelighed — skriv til Karin på WhatsApp, når din booking er bekræftet.`,
    },
  });

  return entries;
}
