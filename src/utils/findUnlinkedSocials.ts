type TSocialPlatform = 'github' | 'kakao' | 'google';

function findUnlinkedSocials(linkedAccounts: TSocialPlatform[]): TSocialPlatform[] {
  const allSocialPlatforms: TSocialPlatform[] = ['github', 'kakao', 'google'];
  return allSocialPlatforms.filter((platform) => !linkedAccounts.includes(platform));
}

export default findUnlinkedSocials;
