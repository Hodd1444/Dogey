"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
function preformat(ret, ...args) {
    format(...args).forEach((a) => ret.push(a));
}
function format(...args) {
    const ret = [];
    for (let i = 0; i < args.length; ++i) {
        let arg = args[i];
        if (typeof arg === 'boolean') {
            arg = arg ? 'true' : 'false';
        }
        if (typeof arg === 'object') {
            if (arg instanceof Array) {
                preformat(ret, ...arg);
            }
            else if (('t' in arg) && ('v' in arg)) {
                preformat(ret, {
                    [arg.t]: arg.v
                });
            }
            else if ('emote' in arg) {
                ret.push({
                    t: 'emote',
                    v: arg.emote,
                });
            }
            else if ('url' in arg) {
                ret.push({
                    t: 'link',
                    v: arg.url,
                });
            }
            else if ('uri' in arg) {
                ret.push({
                    t: 'link',
                    v: arg.uri,
                });
            }
            else if ('link' in arg) {
                ret.push({
                    t: 'link',
                    v: arg.link,
                });
            }
            else if ('mention' in arg) {
                ret.push({
                    t: 'mention',
                    v: arg.mention,
                });
            }
            else if ('block' in arg) {
                ret.push({
                    t: 'block',
                    v: arg.block,
                });
            }
            else {
                preformat(ret, ...Object.keys(arg).map(key => arg[key]));
            }
        }
        else if (arg) {
            ret.push({
                t: 'text',
                v: arg.toString(),
            });
        }
    }
    return ret;
}
exports.format = format;
