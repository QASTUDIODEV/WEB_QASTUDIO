type TProfileProps = {
  profileImg: string;
};
export default function Profile({ profileImg }: TProfileProps) {
  return <img src={profileImg} alt="Profile Image" />;
}
