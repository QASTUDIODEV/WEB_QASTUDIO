import { SOCIAL } from '@/enums/enums';

type TSocialPlatform = SOCIAL[];

function findUnlinkedSocials(linkedAccounts: SOCIAL[]): SOCIAL[] {
  const allSocialPlatforms: TSocialPlatform = [SOCIAL.GITHUB, SOCIAL.GOOGLE, SOCIAL.KAKAO];
  return allSocialPlatforms.filter((platform) => !linkedAccounts.includes(platform));
}

export default findUnlinkedSocials;
