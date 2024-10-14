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

    setButtonText(isFetching) {
      const loadingText = "Saving...";
      if (isFetching) {
        this._submitBtn.textContent = loadingText;
      } else {
        this._submitBtn.textContent = "Save";
      }
    }
  }