import images from '~/assets/images';

export const resolveProfilePicURL = (url: string | null) => {
  switch (url) {
    case 'pic1':
      return images.portrait1;
    case 'pic2':
      return images.portrait2;
    case 'pic3':
      return images.portrait3;
    default:
      return images.portrait1;
  }
};

export const resolveEventThumbnailURL = (url: string | null) => {
  switch (url) {
    case 'events1':
      return images.events1;
    case 'events2':
      return images.events2;
    case 'events3':
      return images.events3;
    case 'events4':
      return images.events4;
    case 'events5':
      return images.events5;
    case 'events6':
      return images.events6;
    default:
      return images.events1;
  }
};

export const resolveOfferThumbnailURL = (url: string | null) => {
  switch (url) {
    case 'partners1':
      return images.partners1;
    case 'partners2':
      return images.partners2;
    case 'partners3':
      return images.partners3;
    case 'partners4':
      return images.partners4;
    default:
      return images.partners1;
  }
};
