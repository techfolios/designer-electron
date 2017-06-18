import React from 'react';
import fs from 'fs';
import os from 'os';
import swal from 'sweetalert2';
import mkdir from 'mkdirp';
import $ from 'jquery';
import Git from 'nodegit';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: []
    };
    this.searchToObject = this.searchToObject.bind(this);
    this.ajaxSetup = this.ajaxSetup.bind(this);
    this.cloneTechfolios = this.cloneTechfolios.bind(this);
    this.directory = this.directory.bind(this);
    this.populateRepos = this.populateRepos.bind(this);
  }
  componentDidMount() {
    this.ajaxSetup();
    this.directory();
    this.cloneTechfolios();
    this.populateRepos();
  }
  searchToObject() {
    let pairs = window.location.search.substring(1).split("&"),
      obj = {},
      pair,
      i;
    for (i in pairs) {
      if (pairs[i] === "") continue;
      pair = pairs[i].split("=");
      obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return obj;
  }
  ajaxSetup() {
    let obj = this.searchToObject();
    $.ajaxSetup({
      headers : {
        'Authorization' : `token ${obj.access_token}`
      }
    });
  }
  cloneTechfolios() {
    $.get('https://api.github.com/user', function (data) {
      Git.Clone(`https://github.com/${data.login}/${data.login}.github.io`, `${os.homedir()}/.techfolios/${data.login}.github.io`)
        .catch(function(err) { console.log(err); });
    });
  }
  directory() {
    if (!fs.existsSync(`${os.homedir()}/.techfolios`)) {
      swal({
        title: '~/.techfolios',
        text: "Do we have your permission to create the above directory? (You need to say yes for techfolios to work.)",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create it!'
      }).then(function () {
        mkdir(`${os.homedir()}/.techfolios`, function (err) {
          if (err) console.error(err);
          else {
            swal(
              'Success!',
              'Your directory has been created!',
              'success'
            )
        }
      });
      }, function (dismiss) {
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'The directory has not been created. (???)',
            'error'
          )
        }
      });
    }
  }
  populateRepos() {
    $.getJSON('https://api.github.com/user/repos', (data) => {
      this.setState({repos: data});
    });
  }
  render() {
    return (
      <div className="ui container center aligned">
        <div className="ui text container">
          <h1 className="ui dividing header">DownGit 2.0</h1>
          <h3 className="first">Download Me</h3>
          <div className="ui search">
            <div className="ui icon input">
              <input id="search" className="prompt" type="text" placeholder="Search..." />
              <i className="search icon"></i>
            </div>
            <div className="results"></div>
          </div>
        </div>
        <br />
        <div id="repos" className="ui text container">
          {this.state.repos.map(function(e, i) {
            return (<div key={i} className="ui raised very padded text container segment">
              <h2 className="ui header"><a href="#">{e.full_name}</a></h2>
              <a href={e.html_url + "/archive/" + e.default_branch + ".zip"}><button className="download ui button">Download</button></a>
            </div>);
          })}
        </div>
      </div>
    );
  }
}

export default Main;
