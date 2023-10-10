import queryString from 'query-string';
import { AttachmentInterface, AttachmentGetQueryInterface } from 'interfaces/attachment';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';
import { convertQueryToPrismaUtil, getOrderByOptions } from 'lib/utils';
import { fetcher } from 'lib/api-fetcher';

export const getAttachments = async (
  query: AttachmentGetQueryInterface = {},
): Promise<PaginatedInterface<AttachmentInterface>> => {
  const { offset: skip, limit: take, order, ...restQuery } = query;
  const pagination = {
    skip,
    take,
  };
  const params = convertQueryToPrismaUtil(restQuery, 'attachment');
  const [response, count] = await Promise.all([
    fetcher(
      '/api/model/attachment/findMany',
      {},
      {
        ...params,
        ...pagination,
        ...(order && {
          orderBy: getOrderByOptions(order),
        }),
      },
    ),
    fetcher('/api/model/attachment/count', {}, { where: params.where }),
  ]);
  return {
    ...response,
    totalCount: count.data,
  };
};

export const createAttachment = async (attachment: AttachmentInterface) => {
  return fetcher('/api/model/attachment', { method: 'POST', body: JSON.stringify({ data: attachment }) });
};

export const updateAttachmentById = async (id: string, attachment: AttachmentInterface) => {
  return fetcher('/api/model/attachment/update', {
    method: 'PUT',
    body: JSON.stringify({
      where: {
        id,
      },
      data: attachment,
    }),
  });
};

export const getAttachmentById = async (id: string, query: GetQueryInterface = {}) => {
  const { relations = [] } = query;
  const response = await fetcher(
    '/api/model/attachment/findFirst',
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

export const deleteAttachmentById = async (id: string) => {
  return fetcher(
    '/api/model/attachment/delete',
    { method: 'DELETE' },
    {
      where: {
        id,
      },
    },
  );
};
