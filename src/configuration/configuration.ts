import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Configuration {
    serverUrl : string;
    username : string;
    password : string;
    appVersion = "1.10";

    constructor(public storage: Storage) {
      console.log('Load configuration');
      this.setModel();
    }

    public saveConf(serverUrl : string, username : string, password : string) {
      this.serverUrl  = serverUrl;
      this.username  = username;
      this.password  = password;
      this.storage.set('server_url', serverUrl);
      this.storage.set('username', username);
      this.storage.set('password', password);
      console.log(serverUrl);

    }
    private setModel() {
      let instance : Configuration = this;
      this.getServerAsync().then((val) => {
        instance.serverUrl = val;
      });
      this.getUsernameAsync().then((val) => {
        instance.username = val;
      });
      this.getPasswordAsync().then((val) => {
        instance.password = val;
      });
    }

    async getServer() {
      let server = await this.getServerAsync();
      if(server == null) {
        return "";
      }
      return server;
    }
    async getUsername() {
      let username = await this.getUsernameAsync();
      if(username == null) {
        return "";
      }
      return username;
    }
    async getPassword() {
      let password = await this.getPasswordAsync();
      if(password == null) {
        return "";
      }
      return password;
    }

    private getServerAsync() {
      return this.storage.get('server_url');
    }
    private getUsernameAsync() {
      return this.storage.get('username');
    }
    private getPasswordAsync() {
      return this.storage.get('password');
    }
}
