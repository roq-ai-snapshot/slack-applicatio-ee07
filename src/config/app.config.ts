interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['End Customer'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'Admin', 'Team Member', 'Guest', 'End Customer'],
  tenantName: 'Company',
  applicationName: 'slack application for chat and support',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['View messages', 'View channels', 'View teams', 'View companies'],
  ownerAbilities: [
    'Manage personal user information',
    'View company information',
    'View team information',
    'View and manage personal messages and attachments',
  ],
  getQuoteUrl: 'https://roq-wizzard-git-qa03-roqtech.vercel.app/proposal/41eb507f-5128-4b90-b910-1716d3919ad3',
};
