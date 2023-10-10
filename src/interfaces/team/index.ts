import { ChannelInterface } from 'interfaces/channel';
import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  name: string;
  description?: string;
  company_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  channel?: ChannelInterface[];
  company?: CompanyInterface;
  user?: UserInterface;
  _count?: {
    channel?: number;
  };
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  company_id?: string;
  user_id?: string;
}
