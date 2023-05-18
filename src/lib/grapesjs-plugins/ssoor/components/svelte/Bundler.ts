import Worker from './workers/bundler/index.worker?worker';

const workers = new Map<string,Worker>();

let uid:number = 1;

export default class Bundler {
	private worker:Worker;
	private handlers:Map<number,(result:any)=>void>;

	constructor({ packagesUrl, svelteUrl, onstatus }:{packagesUrl:string,svelteUrl:string,onstatus:(msg?:string)=>void}) {
		const hash = `${packagesUrl}:${svelteUrl}`;

		if (!workers.has(hash)) {
			const worker = new Worker();
			worker.postMessage({ type: 'init', packagesUrl, svelteUrl });
			workers.set(hash, worker);
		}

		this.worker = workers.get(hash)!;

		this.handlers = new Map();

		this.worker.addEventListener('message', (event: MessageEvent<any>) => {
			const handler = this.handlers.get(event.data.uid);

			if (handler) {
				// if no handler, was meant for a different REPL
				if (event.data.type === 'status') {
					onstatus(event.data.message);
					return;
				}

				onstatus();
				handler(event.data);
				this.handlers.delete(event.data.uid);
			}
		});
	}

	bundle(components:any):Promise<any> {
		return new Promise((fulfil) => {
			this.handlers.set(uid, fulfil);

			this.worker.postMessage({
				uid,
				type: 'bundle',
				components
			});

			uid += 1;
		});
	}

	destroy() {
		this.worker.terminate();
	}
}
