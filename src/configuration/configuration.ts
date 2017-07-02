import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Configuration {
    server : string;
    constructor(public storage: Storage) {
      this.setModelServer();
    }

    saveServer(server : string) {
      this.server  = server;
      this.storage.set('server_url', server);
      console.log(server);

    }
    setModelServer() {
      let instance : Configuration = this;
      this.getServerAsync().then((val) => {
        console.log(val);
        instance.server = val;
      });
    }

    getServerAsync() {
      console.log('Async')
      return this.storage.get('server_url');
    }
}
