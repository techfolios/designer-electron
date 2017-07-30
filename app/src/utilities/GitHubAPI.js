import Git from 'nodegit';
import request from 'superagent';

class GitHubAPI {
  constructor() {
    this.accessToken = window.localStorage.getItem('githubtoken');
  }

  getUsername() {
    return request('GET', `https://api.github.com/user?access_token=${this.accessToken}`)
      .then((res) => {
        this.username = JSON.parse(res.text).login;
        return this.username;
      });
  }

  hasRemote() {
    return request('GET', `https://api.github.com/user/repos?sort=updated&access_token=${this.accessToken}`)
      .then((res) => {
        let result = false;
        const repos = JSON.parse(res.text);

        for (let i = 0; i < Object.keys(repos).length; i += 1) {
          if (repos[i].name === `${this.username}.github.io`) {
            result = true;
          }
        }

        return result;
      });
  }
}

module.exports = GitHubAPI;
