import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Configuration {
    server : string;
    username : string;
    password : string;

    defaultServer = "pinzisv.eastus.cloudapp.azure.com:8090";
    defaultUsername = "user";
    defaultPassword = "db80f345-ecf6-4596-a93f-4bde7092caeb";
    appVersion = "1.1";

    constructor(public storage: Storage) {
      console.log('load conf');
      this.setModel();
      console.log(this.server + this.username + this.password);
    }

    saveConf(server : string, username : string, password : string) {
      this.server  = server;
      this.username  = username;
      this.password  = password;
      this.storage.set('server_url', server);
      this.storage.set('username', username);
      this.storage.set('password', password);
      console.log(server);

    }
    setModel() {
      let instance : Configuration = this;
      this.getServerAsync().then((val) => {
        instance.server = val;
      });
      this.getUsernameAsync().then((val) => {
        instance.username = val;
      });
      this.getPasswordAsync().then((val) => {
        instance.password = val;
      });
    }

    async getServerOrDefaultServer() {
      let server = await this.getServerAsync();
      if(server == null) {
        return this.defaultServer;
      }
      return server;
    }
    async getUsernameOrDefaultUsername() {
      let username = await this.getUsernameAsync();
      if(username == null) {
        return this.defaultUsername;
      }
      return username;
    }
    async getPasswordOrDefaultPassword() {
      let password = await this.getPasswordAsync();
      if(password == null) {
        return this.defaultPassword;
      }
      return password;
    }

    getServerAsync() {
      return this.storage.get('server_url');
    }
    getUsernameAsync() {
      return this.storage.get('username');
    }
    getPasswordAsync() {
      return this.storage.get('password');
    }
}
