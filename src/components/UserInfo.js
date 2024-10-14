export default class UserInfo {
  constructor(name, job, img) {
    this._name = name;
    this._job = job;
    
    this._img=img;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ newName, newJob }) {
    if (newName) {
      this._name.textContent = newName;
    }
    if (newJob) {
      this._job.textContent = newJob;
    }
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
