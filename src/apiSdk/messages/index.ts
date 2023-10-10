import queryString from 'query-string';
import { MessageInterface, MessageGetQueryInterface } from 'interfaces/message';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';
import { convertQueryToPrismaUtil, getOrderByOptions } from 'lib/utils';
import { fetcher } from 'lib/api-fetcher';

export const getMessages = async (
  query: MessageGetQueryInterface = {},
): Promise<PaginatedInterface<MessageInterface>> => {
  const { offset: skip, limit: take, order, ...restQuery } = query;
  const pagination = {
    skip,
    take,
  };
  const params = convertQueryToPrismaUtil(restQuery, 'message');
  const [response, count] = await Promise.all([
    fetcher(
      '/api/model/message/findMany',
      {},
      {
        ...params,
        ...pagination,
        ...(order && {
          orderBy: getOrderByOptions(order),
        }),
      },
    ),
    fetcher('/api/model/message/count', {}, { where: params.where }),
  ]);
  return {
    ...response,
    totalCount: count.data,
  };
};

export const createMessage = async (message: MessageInterface) => {
  return fetcher('/api/model/message', { method: 'POST', body: JSON.stringify({ data: message }) });
};

export const updateMessageById = async (id: string, message: MessageInterface) => {
  return fetcher('/api/model/message/update', {
    method: 'PUT',
    body: JSON.stringify({
      where: {
        id,
      },
      data: message,
    }),
  });
};

export const getMessageById = async (id: string, query: GetQueryInterface = {}) => {
  const { relations = [] } = query;
  const response = await fetcher(
    '/api/model/message/findFirst',
    {},
    {
      where: {
        id,
      },
      include: relations.reduce((acc, el) => ({ ...acc, [el.split('.')[0]]: true }), {}),
    },
  );
  return response.data;
};

export const deleteMessageById = async (id: string) => {
  return fetcher(
    '/api/model/message/delete',
    { method: 'DELETE' },
    {
      where: {
        id,
      },
    },
  );
};
