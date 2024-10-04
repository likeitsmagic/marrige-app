export const getYandexUserAvatar = (
  id: string | null | undefined,
  defaultAvatarId: string,
) =>
  `https://avatars.yandex.net/get-yapic/${id ?? defaultAvatarId}/islands-retina-middle`;
