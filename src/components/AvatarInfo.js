export default class AvatarInfo {
    constructor(img) {
      this._img = img;
    }

    getAvatarInfo() {
      return {
        name: this._img.src,
      };
    }
  
    setAvatarInfo({ avatar }) {
      if (avatar) {
        this._img.src = avatar;
      }
    }
  }