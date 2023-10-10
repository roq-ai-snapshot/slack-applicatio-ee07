import queryString from 'query-string';
import { TeamInterface, TeamGetQueryInterface } from 'interfaces/team';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';
import { convertQueryToPrismaUtil, getOrderByOptions } from 'lib/utils';
import { fetcher } from 'lib/api-fetcher';

export const getTeams = async (query: TeamGetQueryInterface = {}): Promise<PaginatedInterface<TeamInterface>> => {
  const { offset: skip, limit: take, order, ...restQuery } = query;
  const pagination = {
    skip,
    take,
  };
  const params = convertQueryToPrismaUtil(restQuery, 'team');
  const [response, count] = await Promise.all([
    fetcher(
      '/api/model/team/findMany',
      {},
      {
        ...params,
        ...pagination,
        ...(order && {
          orderBy: getOrderByOptions(order),
        }),
      },
    ),
    fetcher('/api/model/team/count', {}, { where: params.where }),
  ]);
  return {
    ...response,
    totalCount: count.data,
  };
};

export const createTeam = async (team: TeamInterface) => {
  return fetcher('/api/model/team', { method: 'POST', body: JSON.stringify({ data: team }) });
};

export const updateTeamById = async (id: string, team: TeamInterface) => {
  return fetcher('/api/model/team/update', {
    method: 'PUT',
    body: JSON.stringify({
      where: {
        id,
      },
      data: team,
    }),
  });
};

export const getTeamById = async (id: string, query: GetQueryInterface = {}) => {
  const { relations = [] } = query;
  const response = await fetcher(
    '/api/model/team/findFirst',
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

export const deleteTeamById = async (id: string) => {
  return fetcher(
    '/api/model/team/delete',
    { method: 'DELETE' },
    {
      where: {
        id,
      },
    },
  );
};
