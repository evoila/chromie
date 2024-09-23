import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

import { readAppointment } from "@/actions/appointments";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["appointment"],
    queryFn: async () => await readAppointment(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
