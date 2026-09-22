import { CITIES, PHONE_INTL } from "@/lib/site";

export interface RentalSearch {
  pickupLocation: string;
  dropoffLocation: string;
  sameDropoffLocation: boolean;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
}

export interface RentalSearchFormValues {
  pickupLocation: string;
  sameDropoffLocation: boolean;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
}

type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function todayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function isValidTime(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function formatRentalDate(iso: string): string {
  if (!isValidDate(iso)) return iso;
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatRentalTime(value: string): string {
  if (!isValidTime(value)) return value;
  const [hourStr, minute] = value.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}

export function validateRentalSearch(
  form: RentalSearchFormValues
): Record<string, string> {
  const errors: Record<string, string> = {};
  const pickup = form.pickupLocation.trim();
  const dropoff = form.dropoffLocation.trim();

  if (!pickup) errors.pickupLocation = "Please enter pickup location.";
  if (!form.sameDropoffLocation && !dropoff)
    errors.dropoffLocation = "Please enter drop-off location.";
  if (!form.pickupDate) errors.pickupDate = "Please select pickup date.";
  if (!form.pickupTime) {
    errors.pickupTime = "Please select pick-up time.";
  } else if (!isValidTime(form.pickupTime)) {
    errors.pickupTime = "Please select a valid pick-up time.";
  }
  if (!form.dropoffDate) {
    errors.dropoffDate = "Please select drop-off date.";
  } else if (form.pickupDate && form.dropoffDate < form.pickupDate) {
    errors.dropoffDate = "Drop-off date cannot be before pickup date.";
  }

  return errors;
}

export function serializeRentalSearch(search: RentalSearch): string {
  const params = new URLSearchParams({
    pickupLocation: search.pickupLocation,
    dropoffLocation: search.dropoffLocation,
    sameDropoffLocation: String(search.sameDropoffLocation),
    pickupDate: search.pickupDate,
    pickupTime: search.pickupTime,
    dropoffDate: search.dropoffDate,
  });
  return `?${params.toString()}`;
}

export function parseRentalSearch(
  params: RawSearchParams
): RentalSearch | null {
  const pickupLocation = first(params.pickupLocation).trim();
  const pickupDate = first(params.pickupDate);
  const pickupTime = first(params.pickupTime);
  const dropoffDate = first(params.dropoffDate);
  const sameDropoffLocation = first(params.sameDropoffLocation) !== "false";

  let dropoffLocation = first(params.dropoffLocation).trim();
  if (sameDropoffLocation) dropoffLocation = pickupLocation;

  if (!pickupLocation) return null;
  if (!isValidDate(pickupDate)) return null;
  if (!isValidTime(pickupTime)) return null;
  if (!isValidDate(dropoffDate)) return null;
  if (dropoffDate < pickupDate) return null;
  if (!sameDropoffLocation && !dropoffLocation) return null;

  return {
    pickupLocation,
    dropoffLocation,
    sameDropoffLocation,
    pickupDate,
    pickupTime,
    dropoffDate,
  };
}

export const PICKUP_TIME_OPTIONS: { value: string; label: string }[] = (() => {
  const options: { value: string; label: string }[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const value = `${pad(hour)}:${pad(minute)}`;
      options.push({ value, label: formatRentalTime(value) });
    }
  }
  return options;
})();

const AIRPORT_SUGGESTIONS = [
  "Jinnah International Airport, Karachi",
  "Allama Iqbal International Airport, Lahore",
  "Islamabad International Airport",
  "Karachi Airport",
  "Lahore Airport",
  "Islamabad Airport",
];

export const LOCATION_SUGGESTIONS: string[] = (() => {
  const suggestions = new Set<string>();
  for (const city of CITIES) {
    suggestions.add(city.name);
    suggestions.add(`${city.name} Airport`);
    for (const area of city.areas) suggestions.add(`${area}, ${city.name}`);
  }
  for (const airport of AIRPORT_SUGGESTIONS) suggestions.add(airport);
  return Array.from(suggestions);
})();

export function buildWhatsAppMessage(options: {
  vehicleName: string;
  search?: RentalSearch | null;
  name?: string;
  phone?: string;
}): string {
  const { vehicleName, search, name, phone } = options;
  const lines = [
    "Hello Nrently,",
    "",
    "I want to book/check availability for:",
    "",
    `Vehicle: ${vehicleName}`,
  ];

  if (search) {
    lines.push(
      `Pickup Location: ${search.pickupLocation}`,
      `Drop-off Location: ${search.dropoffLocation || search.pickupLocation}`,
      `Pickup Date: ${formatRentalDate(search.pickupDate)}`,
      `Pickup Time: ${formatRentalTime(search.pickupTime)}`,
      `Drop-off Date: ${formatRentalDate(search.dropoffDate)}`
    );
  }

  const customerName = name?.trim();
  const customerPhone = phone?.trim();
  if (customerName || customerPhone) {
    lines.push(
      "",
      `Customer Name: ${customerName || "____"}`,
      `Phone: ${customerPhone || "____"}`
    );
  }

  lines.push("", "Please confirm availability and price.");
  return lines.join("\n");
}

export function buildWhatsAppUrl(options: {
  vehicleName: string;
  search?: RentalSearch | null;
  name?: string;
  phone?: string;
}): string {
  const digits = PHONE_INTL.replace(/[^0-9]/g, "");
  const message = buildWhatsAppMessage(options);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
