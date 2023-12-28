"use client";

import { useParams } from "next/navigation";

export default function VerificationRequestPage() {
  const { id } = useParams();

  console.log(id);

  return <>VerificationRequestPage</>;
}
