// Cleanup worker: removes the old offline copy of the game and unregisters
// itself, so phones always load the latest build from the server.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys()
			.then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
			.then(() => self.registration.unregister())
			.then(() => self.clients.matchAll({ type: 'window' }))
			.then((clients) => clients.forEach((c) => c.navigate(c.url)))
	);
});
