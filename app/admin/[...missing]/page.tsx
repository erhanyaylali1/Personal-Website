import { notFound } from "next/navigation";

/** Mistyped /admin/… addresses render app/admin/not-found.tsx inside the admin layout. */
export default function AdminMissing() {
  notFound();
}
