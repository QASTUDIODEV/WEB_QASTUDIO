import { SOCIAL } from '@/enums/enums';

type TSocialPlatform = SOCIAL;

function findUnlinkedSocials(linkedAccounts: TSocialPlatform[]): TSocialPlatform[] {
  const allSocialPlatforms: TSocialPlatform[] = Object.values(SOCIAL);
  if (!Array.isArray(linkedAccounts)) {
    return allSocialPlatforms;
  }
  return allSocialPlatforms.filter((platform) => !linkedAccounts.includes(platform));
}

export default findUnlinkedSocials;
