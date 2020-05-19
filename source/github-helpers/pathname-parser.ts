interface Pathname {
	user?: string;
	repository?: string;
	viewType?: string;
	ref?: string;
	filePath?: string;
}
export default class Pathname { 
	constructor(pathname: string, replacer?: Pathname) {
		const [user, repository, viewType, ...next] = pathname.replace(/^\/|\/$/g, '').split('/');
		const parts = next.join('/');
		const currentBranch = getCurrentBranch();
		const isCurrentBranch = parts !== currentBranch && !parts.startsWith(currentBranch + '/');
		this.ref = isCurrentBranch ? currentBranch : parts[0];
		const slashCount = this.ref!.split('/').length - 1;
		this.filePath = next.slice(slashCount).join('/');
		Object.assign(this, {
			user,
			repository,
			viewType
		}, replacer);
	}
	toString() {
		return `/${this.user}/${this.repository}/${this.viewType}/${this.ref}/${this.filePather}`;
	}
}
