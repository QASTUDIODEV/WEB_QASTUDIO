type TSocialPlatform = 'GITHUB' | 'KAKAO' | 'GOOGLE' | 'LOCAL';

function findUnlinkedSocials(linkedAccounts: TSocialPlatform[]): TSocialPlatform[] {
  const allSocialPlatforms: TSocialPlatform[] = ['GITHUB', 'KAKAO', 'GOOGLE', 'LOCAL'];
  if (!Array.isArray(linkedAccounts)) {
    return allSocialPlatforms;
  }
  return allSocialPlatforms.filter((platform) => !linkedAccounts.includes(platform));
}

export default findUnlinkedSocials;
