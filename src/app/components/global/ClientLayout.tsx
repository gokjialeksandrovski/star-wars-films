"use client";

import { TranslationsProvider } from "./TranslationsProvider";

/**
 * Apollo Client setup for GraphQL queries (commented out because swapi.dev is down).
 * import { ApolloProvider } from "@apollo/client";
 * import client from "../../../../lib/apollo-client";
 */

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ApolloProvider client={client}>
    <TranslationsProvider>{children}</TranslationsProvider>
    // </ApolloProvider>
  );
}
