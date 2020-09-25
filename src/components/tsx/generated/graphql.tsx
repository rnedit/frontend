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
  ObjectRedux: any;
};

/** Root */
export type Query = {
  __typename?: 'Query';
  getInternal?: Maybe<Internal>;
  internals?: Maybe<Array<Maybe<Internal>>>;
  getInternals?: Maybe<Internals>;
  searchInternals?: Maybe<Internals>;
  getProfile?: Maybe<Profile>;
};


/** Root */
export type QueryGetInternalArgs = {
  id: Scalars['ID'];
};


/** Root */
export type QueryGetInternalsArgs = {
  internalRequest?: Maybe<InternalTableRequest>;
};


/** Root */
export type QuerySearchInternalsArgs = {
  internalRequest?: Maybe<InternalTableRequest>;
};


/** Root */
export type QueryGetProfileArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addInternal?: Maybe<Internal>;
};


export type MutationAddInternalArgs = {
  internalSaveRequest?: Maybe<InternalSaveRequest>;
};

export type Internal = {
  __typename?: 'Internal';
  id: Scalars['ID'];
  version?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['String']>;
  recipientName?: Maybe<Scalars['String']>;
  creatorProfile?: Maybe<Profile>;
  creatorUser?: Maybe<User>;
  updateProfile?: Maybe<Profile>;
  profilesAllReaders?: Maybe<Array<Maybe<Profile>>>;
  subject: Scalars['String'];
  creationDate: Scalars['Date'];
  typeAgreement: Scalars['Int'];
  draft: Scalars['Boolean'];
  profileRecipient?: Maybe<Profile>;
  isAttachments?: Maybe<Scalars['Boolean']>;
  attachments?: Maybe<Array<Maybe<Scalars['String']>>>;
  attachmentNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  isAnotherAttachments?: Maybe<Scalars['Boolean']>;
  anotherAttachments?: Maybe<Array<Maybe<Scalars['String']>>>;
  anotherAttachmentNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type Internals = {
  __typename?: 'Internals';
  internalList?: Maybe<Array<Maybe<Internal>>>;
  totalCount?: Maybe<Scalars['Int']>;
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

export type InternalTableRequest = {
  userId: Scalars['String'];
  searchText?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  countExec?: Maybe<Scalars['Int']>;
};

export type InternalSaveRequest = {
  subject: Scalars['String'];
  recipient: Scalars['String'];
  recipientName?: Maybe<Scalars['String']>;
  typeAgreement: Scalars['Int'];
  draft: Scalars['Boolean'];
  creatorProfileId: Scalars['String'];
  creatorUserId: Scalars['String'];
  updateUserId?: Maybe<Scalars['String']>;
  updateProfileId?: Maybe<Scalars['String']>;
  creatorRolesId: Array<Maybe<Scalars['String']>>;
  isAttachments: Scalars['Boolean'];
  attachmentIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  attachmentNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  isAnotherAttachments: Scalars['Boolean'];
  anotherAttachmentIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  anotherAttachmentNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  _persist?: Maybe<Scalars['ObjectRedux']>;
};


export type AddInternalMutationVariables = Exact<{
  internalSaveRequest: InternalSaveRequest;
}>;


export type AddInternalMutation = (
  { __typename?: 'Mutation' }
  & { addInternal?: Maybe<(
    { __typename?: 'Internal' }
    & Pick<Internal, 'id'>
  )> }
);

export type SearchInternalsQueryVariables = Exact<{
  query: InternalTableRequest;
}>;


export type SearchInternalsQuery = (
  { __typename?: 'Query' }
  & { searchInternals?: Maybe<(
    { __typename?: 'Internals' }
    & InternalsTableFragment
  )> }
);

export type GetInternalsQueryVariables = Exact<{
  query: InternalTableRequest;
}>;


export type GetInternalsQuery = (
  { __typename?: 'Query' }
  & { getInternals?: Maybe<(
    { __typename?: 'Internals' }
    & InternalsTableFragment
  )> }
);

export type GetInternalQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetInternalQuery = (
  { __typename?: 'Query' }
  & { getInternal?: Maybe<(
    { __typename?: 'Internal' }
    & InternalFromMainDocumentFieldsFragment
  )> }
);

export type InternalsTableFragment = (
  { __typename?: 'Internals' }
  & Pick<Internals, 'totalCount'>
  & { internalList?: Maybe<Array<Maybe<(
    { __typename?: 'Internal' }
    & InternalFromTableFieldsFragment
  )>>> }
);

export type InternalFromTableFieldsFragment = (
  { __typename?: 'Internal' }
  & Pick<Internal, 'id' | 'draft' | 'number' | 'recipientName' | 'version' | 'subject' | 'creationDate'>
);

export type ProfileFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'name' | 'parentName'>
  & { access?: Maybe<Array<Maybe<(
    { __typename?: 'Access' }
    & Pick<Access, 'name' | 'info'>
  )>>>, user: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'firstName' | 'lastName'>
  ) }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'username' | 'firstName' | 'lastName' | 'email'>
  & { roles: Array<Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'name'>
  )>> }
);

export type InternalFromMainDocumentFieldsFragment = (
  { __typename?: 'Internal' }
  & Pick<Internal, 'id' | 'draft' | 'number' | 'version' | 'subject' | 'recipientName' | 'creationDate' | 'typeAgreement' | 'isAttachments' | 'attachments' | 'attachmentNames' | 'isAnotherAttachments' | 'anotherAttachments' | 'anotherAttachmentNames'>
  & { profilesAllReaders?: Maybe<Array<Maybe<(
    { __typename?: 'Profile' }
    & ProfileFragment
  )>>>, profileRecipient?: Maybe<(
    { __typename?: 'Profile' }
    & ProfileFragment
  )>, updateProfile?: Maybe<(
    { __typename?: 'Profile' }
    & ProfileFragment
  )>, creatorProfile?: Maybe<(
    { __typename?: 'Profile' }
    & ProfileFragment
  )>, creatorUser?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export const InternalFromTableFieldsFragmentDoc = gql`
    fragment internalFromTableFields on Internal {
  id
  draft
  number
  recipientName
  version
  subject
  creationDate
}
    `;
export const InternalsTableFragmentDoc = gql`
    fragment internalsTable on Internals {
  internalList {
    ...internalFromTableFields
  }
  totalCount
}
    ${InternalFromTableFieldsFragmentDoc}`;
export const ProfileFragmentDoc = gql`
    fragment profile on Profile {
  name
  parentName
  access {
    name
    info
  }
  user {
    username
    firstName
    lastName
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  username
  firstName
  lastName
  email
  roles {
    name
  }
}
    `;
export const InternalFromMainDocumentFieldsFragmentDoc = gql`
    fragment internalFromMainDocumentFields on Internal {
  id
  draft
  number
  version
  subject
  recipientName
  creationDate
  typeAgreement
  isAttachments
  attachments
  attachmentNames
  isAnotherAttachments
  anotherAttachments
  anotherAttachmentNames
  profilesAllReaders {
    ...profile
  }
  profileRecipient {
    ...profile
  }
  updateProfile {
    ...profile
  }
  creatorProfile {
    ...profile
  }
  creatorUser {
    ...user
  }
}
    ${ProfileFragmentDoc}
${UserFragmentDoc}`;
export const AddInternalDocument = gql`
    mutation addInternal($internalSaveRequest: InternalSaveRequest!) {
  addInternal(internalSaveRequest: $internalSaveRequest) {
    id
  }
}
    `;
export type AddInternalMutationFn = Apollo.MutationFunction<AddInternalMutation, AddInternalMutationVariables>;

/**
 * __useAddInternalMutation__
 *
 * To run a mutation, you first call `useAddInternalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInternalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInternalMutation, { data, loading, error }] = useAddInternalMutation({
 *   variables: {
 *      internalSaveRequest: // value for 'internalSaveRequest'
 *   },
 * });
 */
export function useAddInternalMutation(baseOptions?: Apollo.MutationHookOptions<AddInternalMutation, AddInternalMutationVariables>) {
        return Apollo.useMutation<AddInternalMutation, AddInternalMutationVariables>(AddInternalDocument, baseOptions);
      }
export type AddInternalMutationHookResult = ReturnType<typeof useAddInternalMutation>;
export type AddInternalMutationResult = Apollo.MutationResult<AddInternalMutation>;
export type AddInternalMutationOptions = Apollo.BaseMutationOptions<AddInternalMutation, AddInternalMutationVariables>;
export const SearchInternalsDocument = gql`
    query SearchInternals($query: InternalTableRequest!) {
  searchInternals(internalRequest: $query) {
    ...internalsTable
  }
}
    ${InternalsTableFragmentDoc}`;

/**
 * __useSearchInternalsQuery__
 *
 * To run a query within a React component, call `useSearchInternalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchInternalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchInternalsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchInternalsQuery(baseOptions?: Apollo.QueryHookOptions<SearchInternalsQuery, SearchInternalsQueryVariables>) {
        return Apollo.useQuery<SearchInternalsQuery, SearchInternalsQueryVariables>(SearchInternalsDocument, baseOptions);
      }
export function useSearchInternalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchInternalsQuery, SearchInternalsQueryVariables>) {
          return Apollo.useLazyQuery<SearchInternalsQuery, SearchInternalsQueryVariables>(SearchInternalsDocument, baseOptions);
        }
export type SearchInternalsQueryHookResult = ReturnType<typeof useSearchInternalsQuery>;
export type SearchInternalsLazyQueryHookResult = ReturnType<typeof useSearchInternalsLazyQuery>;
export type SearchInternalsQueryResult = Apollo.QueryResult<SearchInternalsQuery, SearchInternalsQueryVariables>;
export const GetInternalsDocument = gql`
    query GetInternals($query: InternalTableRequest!) {
  getInternals(internalRequest: $query) {
    ...internalsTable
  }
}
    ${InternalsTableFragmentDoc}`;

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
export const GetInternalDocument = gql`
    query GetInternal($id: ID!) {
  getInternal(id: $id) {
    ...internalFromMainDocumentFields
  }
}
    ${InternalFromMainDocumentFieldsFragmentDoc}`;

/**
 * __useGetInternalQuery__
 *
 * To run a query within a React component, call `useGetInternalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInternalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInternalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInternalQuery(baseOptions?: Apollo.QueryHookOptions<GetInternalQuery, GetInternalQueryVariables>) {
        return Apollo.useQuery<GetInternalQuery, GetInternalQueryVariables>(GetInternalDocument, baseOptions);
      }
export function useGetInternalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInternalQuery, GetInternalQueryVariables>) {
          return Apollo.useLazyQuery<GetInternalQuery, GetInternalQueryVariables>(GetInternalDocument, baseOptions);
        }
export type GetInternalQueryHookResult = ReturnType<typeof useGetInternalQuery>;
export type GetInternalLazyQueryHookResult = ReturnType<typeof useGetInternalLazyQuery>;
export type GetInternalQueryResult = Apollo.QueryResult<GetInternalQuery, GetInternalQueryVariables>;