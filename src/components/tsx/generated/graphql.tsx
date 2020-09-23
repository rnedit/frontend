import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

/** Root */
export type Query = {
  __typename?: 'Query';
  internal?: Maybe<Internal>;
  internals?: Maybe<Array<Maybe<Internal>>>;
  getInternals?: Maybe<Array<Maybe<Internal>>>;
  getProfile?: Maybe<Profile>;
};


/** Root */
export type QueryInternalArgs = {
  id: Scalars['ID'];
};


/** Root */
export type QueryGetInternalsArgs = {
  internalRequest?: Maybe<InternalTableRequest>;
};


/** Root */
export type QueryGetProfileArgs = {
  id: Scalars['String'];
};

export type Internal = {
  __typename?: 'Internal';
  id: Scalars['String'];
  version?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['String']>;
  creatorProfile?: Maybe<Profile>;
  creatorUser?: Maybe<User>;
  updateProfile?: Maybe<Profile>;
  profilesAllReaders?: Maybe<Array<Maybe<Profile>>>;
  subject: Scalars['String'];
  creationDate: Scalars['Date'];
  typeAgreement: Scalars['Int'];
  draft: Scalars['Boolean'];
  profileRecipient: Profile;
};


export type Profile = {
  __typename?: 'Profile';
  name: Scalars['String'];
  parentName?: Maybe<Scalars['String']>;
  access?: Maybe<Array<Maybe<Access>>>;
  user: User;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  creationDate?: Maybe<Scalars['Date']>;
  roles: Array<Maybe<Role>>;
};

export type Access = {
  __typename?: 'Access';
  name: Scalars['String'];
  info?: Maybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['String'];
};

/** scalar InternalTableRequest */
export type InternalTableRequest = {
  userId: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
};

export type GetInternalsQueryVariables = Exact<{
  query: InternalTableRequest;
}>;


export type GetInternalsQuery = (
  { __typename?: 'Query' }
  & { getInternals?: Maybe<Array<Maybe<(
    { __typename?: 'Internal' }
    & Pick<Internal, 'id' | 'draft' | 'number' | 'version' | 'subject' | 'creationDate'>
  )>>> }
);


export const GetInternalsDocument = gql`
    query GetInternals($query: InternalTableRequest!) {
  getInternals(internalRequest: $query) {
    id
    draft
    number
    version
    subject
    creationDate
  }
}
    `;

/**
 * __useGetInternalsQuery__
 *
 * To run a query within a React component, call `useGetInternalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInternalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInternalsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetInternalsQuery(baseOptions?: Apollo.QueryHookOptions<GetInternalsQuery, GetInternalsQueryVariables>) {
        return Apollo.useQuery<GetInternalsQuery, GetInternalsQueryVariables>(GetInternalsDocument, baseOptions);
      }
export function useGetInternalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInternalsQuery, GetInternalsQueryVariables>) {
          return Apollo.useLazyQuery<GetInternalsQuery, GetInternalsQueryVariables>(GetInternalsDocument, baseOptions);
        }
export type GetInternalsQueryHookResult = ReturnType<typeof useGetInternalsQuery>;
export type GetInternalsLazyQueryHookResult = ReturnType<typeof useGetInternalsLazyQuery>;
export type GetInternalsQueryResult = Apollo.QueryResult<GetInternalsQuery, GetInternalsQueryVariables>;