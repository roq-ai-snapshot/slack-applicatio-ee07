import queryString from 'query-string';
import { ChannelInterface, ChannelGetQueryInterface } from 'interfaces/channel';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';
import { convertQueryToPrismaUtil, getOrderByOptions } from 'lib/utils';
import { fetcher } from 'lib/api-fetcher';

export const getChannels = async (
  query: ChannelGetQueryInterface = {},
): Promise<PaginatedInterface<ChannelInterface>> => {
  const { offset: skip, limit: take, order, ...restQuery } = query;
  const pagination = {
    skip,
    take,
  };
  const params = convertQueryToPrismaUtil(restQuery, 'channel');
  const [response, count] = await Promise.all([
    fetcher(
      '/api/model/channel/findMany',
      {},
      {
        ...params,
        ...pagination,
        ...(order && {
          orderBy: getOrderByOptions(order),
        }),
      },
    ),
    fetcher('/api/model/channel/count', {}, { where: params.where }),
  ]);
  return {
    ...response,
    totalCount: count.data,
  };
};

export const createChannel = async (channel: ChannelInterface) => {
  return fetcher('/api/model/channel', { method: 'POST', body: JSON.stringify({ data: channel }) });
};

export const updateChannelById = async (id: string, channel: ChannelInterface) => {
  return fetcher('/api/model/channel/update', {
    method: 'PUT',
    body: JSON.stringify({
      where: {
        id,
      },
      data: channel,
    }),
  });
};

export const getChannelById = async (id: string, query: GetQueryInterface = {}) => {
  const { relations = [] } = query;
  const response = await fetcher(
    '/api/model/channel/findFirst',
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

export const deleteChannelById = async (id: string) => {
  return fetcher(
    '/api/model/channel/delete',
    { method: 'DELETE' },
    {
      where: {
        id,
      },
    },
  );
};
