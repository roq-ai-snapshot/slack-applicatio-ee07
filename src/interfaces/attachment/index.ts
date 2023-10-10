import { MessageInterface } from 'interfaces/message';
import { GetQueryInterface } from 'interfaces';

export interface AttachmentInterface {
  id?: string;
  name: string;
  type?: string;
  size?: number;
  message_id: string;
  created_at?: any;
  updated_at?: any;

  message?: MessageInterface;
  _count?: {};
}

export interface AttachmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type?: string;
  message_id?: string;
}
