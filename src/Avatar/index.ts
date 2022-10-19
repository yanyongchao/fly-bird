import { default as OriginAvatar, AvatarProps } from './Avatar';
import Group from './Group';

export type ComposedAvatar = React.FC<AvatarProps> & { Group: typeof Group };

const Avatar = OriginAvatar as ComposedAvatar;

Avatar.Group = Group;

export { Group };
export default Avatar;
