import { MessageInterface } from 'interfaces/message';
import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from 'interfaces';

export interface ChannelInterface {
  id?: string;
  name: string;
  description?: string;
  team_id: string;
  created_at?: any;
  updated_at?: any;
  message?: MessageInterface[];
  team?: TeamInterface;
  _count?: {
    message?: number;
  };
}

export interface ChannelGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  team_id?: string;
}
