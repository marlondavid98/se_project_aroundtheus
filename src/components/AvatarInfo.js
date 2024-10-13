export default class AvatarInfo {
    constructor(img) {
      this._img = img;
    }

    getAvatarInfo() {
      return {
        name: this._img.src,
      };
    }
  
    setAvatarInfo({ newLink }) {
      if (newLink) {
        this._img.src = newLink;
      }
    }
  }