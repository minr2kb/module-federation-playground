import React, { useMemo } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  type QueryClientProviderProps,
} from '@tanstack/react-query';

type ClientProp = Partial<Pick<QueryClientProviderProps, 'client'>>;

const withQueryClient = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & ClientProp) => {
    const { client, ...rest } = props;
    const queryClient = useMemo(() => client || new QueryClient(), [client]);

    return (
      <QueryClientProvider client={queryClient}>
        <Component {...(rest as P)} />
      </QueryClientProvider>
    );
  };
};

export default withQueryClient;
