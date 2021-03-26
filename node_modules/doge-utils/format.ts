/**********************************
 * Message formatter
 * 
 * Usage: format(...chunks)
 * 
 * Valid formats are:
 * 	Any string, number, bigint, boolean
 * 	{ emote: string }
 * 	{ link: string }
 * 	{ mention: string }
 * 	Or any combination of the above
 * 
 * It is very fault-tolerant.
 * Pass it anything, it will work.
 * ( except recursive structures ) -> but why would you do that
 * 
 * If something doesn't work, report an issue.
 * 
*/

export type UnformattedMessageChunk = UnformattedMessageChunkLiteral | UnformattedMessageChunkObject;

export type UnformattedMessageChunkLiteral = number | string | bigint | boolean;

export type UnformattedMessageChunkObject =
  UnformattedMessageChunk[]
| FormattedMessageChunk
| UMC_Emote
| UMC_URL
| UMC_URI
| UMC_Link
| UMC_Mention
| UMC_Block
| UMC_Undefined

interface UMC_Emote {
	emote: string;
}
interface UMC_URL {
	url: string;
}
interface UMC_URI {
	uri: string;
}
interface UMC_Link {
	link: string;
}
interface UMC_Mention {
	mention: string;
}
interface UMC_Block {
	block: string;
}
interface UMC_Undefined {
	// As the name might suggest, this may lead to undefined behaviour.
	[index: string]: string;
}

export interface FormattedMessageChunk {
	t:
		  'text'
		| 'mention'
		| 'link'
		| 'emote'
		| 'block'
	;
	v: string;
}

function preformat (ret: FormattedMessageChunk[], ...args: UnformattedMessageChunk[]): void {
	format(...args).forEach((a: FormattedMessageChunk) => ret.push(a));
}

export function format (...args: UnformattedMessageChunk[]): FormattedMessageChunk[] {
	const ret: FormattedMessageChunk[] = [];
	for (let i=0; i<args.length; ++i) {
		let arg = args[i];
		if (typeof arg === 'boolean') {
			arg = arg ? 'true' : 'false';
		}
		if (typeof arg === 'object') {
			if (arg instanceof Array) {
				preformat(ret, ...arg);
			} else if (('t' in arg) && ('v' in arg)) {
				preformat(ret, {
					[arg.t]: arg.v
				});
			} else if ('emote' in arg) {
				ret.push({
					t: 'emote',
					v: arg.emote,
				});
			} else if ('url' in arg) {
				ret.push({
					t: 'link',
					v: arg.url,
				});
			} else if ('uri' in arg) {
				ret.push({
					t: 'link',
					v: arg.uri,
				});
			} else if ('link' in arg) {
				ret.push({
					t: 'link',
					v: arg.link,
				});
			} else if ('mention' in arg) {
				ret.push({
					t: 'mention',
					v: arg.mention,
				});
			} else if ('block' in arg) {
				ret.push({
					t: 'block',
					v: arg.block,
				});
			} else {
				preformat(ret, ...Object.keys(arg).map(key => (arg as UMC_Undefined)[key]));
			}
		} else if (arg) {
			ret.push({
				t: 'text',
				v: arg.toString(),
			});
		}
	}
	return ret;
}