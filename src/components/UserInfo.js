export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
    
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
}
