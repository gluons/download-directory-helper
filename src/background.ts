const GITHUB_HOSTNAME = 'github.com';
const DOWNLOAD_DIRECTORY_URL = 'https://download-directory.github.io/';
const repoDirRegex = /^[/](.+[/].+)[/]tree[/]([^/]+)[/](.*)/; // Regex from download-directory

const createDownloadURL = (githubUrl: string): string => {
	const url = new URL(DOWNLOAD_DIRECTORY_URL);
	url.searchParams.set('url', githubUrl);

	return url.toString();
};

browser.browserAction.onClicked.addListener(tab => {
	const urlStr = tab.url;

	// If no url, stop!
	if (!urlStr) {
		return;
	}

	const url = new URL(urlStr);

	// If it isn't GitHub directory, stop!
	if ((url.hostname !== GITHUB_HOSTNAME) || !repoDirRegex.test(url.pathname)) {
		return;
	}

	const downloadUrl = createDownloadURL(urlStr);
	browser.tabs.create({
		url: downloadUrl
	})
	.catch(err => {
		console.error(err);
	});
});
