import { TrialistCommandCtx } from './trialistcmd.js';
import { gameToken} from '@polysensus/chaintrap-arenastate';

/**
 * Must be constructed at page global scope
 */
export class JoinGameCommandCtx extends TrialistCommandCtx {
  /**
   * 
   * @param {object} options 
   */
  constructor(options) {
    super();

    this.gid = options?.gid;
    if (!this.gid) throw new Error(`This command requires a gid`);
    this.result = undefined;
  }

  /**
   * 
   * @param {import('../console/completion.js').MatchResult} result 
   */
  async exec(result) {
    this.result = undefined;
    if (!(this.trialist)) {
      console.log(`trialist not ready`);
      return;
    }
    const txr = await this.trialist.joinGame(this.gid, {nickname: result?.values?.nickname});
    this.result = {nickhame:result?.values?.nickname, ...txr};
    return this.result;
  }
}
