import { Config } from '../conf';

class RPCClient {
    private static instance: RPCClient;
    private host:String;
  
    private constructor () {
        this.host = Config.host;
    }
  
    static getInstance (): RPCClient {
      if (!RPCClient.instance) {
        RPCClient.instance = new RPCClient();
      }
      return this.instance;
    }

    public getRoundIndex():number {
        return 1;
    }
  }

export default RPCClient;