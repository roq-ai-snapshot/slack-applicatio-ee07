import { AttachmentInterface } from 'interfaces/attachment';
import { UserInterface } from 'interfaces/user';
import { ChannelInterface } from 'interfaces/channel';
import { GetQueryInterface } from 'interfaces';

export interface MessageInterface {
  id?: string;
  content?: string;
  user_id: string;
  channel_id: string;
  created_at?: any;
  updated_at?: any;
  attachment?: AttachmentInterface[];
  user?: UserInterface;
  channel?: ChannelInterface;
  _count?: {
    attachment?: number;
  };
}

export interface MessageGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  user_id?: string;
  channel_id?: string;
}
