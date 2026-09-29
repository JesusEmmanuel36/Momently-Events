import { redirect } from "next/navigation";

export default function LegacyNewEvent() {
  redirect("/admin");
}
