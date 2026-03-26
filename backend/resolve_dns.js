const dns = require('dns');

// Force Node to use Google DNS instead of the default blocked Windows Router DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const srvRecord = '_mongodb._tcp.cluster0.fiasskl.mongodb.net';

dns.resolveSrv(srvRecord, (err, addresses) => {
  if (err) {
    console.error('DNS Resolution completely failed via Google DNS:', err);
    process.exit(1);
  }
  
  if (addresses && addresses.length > 0) {
    // Generate the legacy mongodb:// string format
    const hosts = addresses.map(a => `${a.name}:${a.port}`).join(',');
    console.log(`\n✅ SHARDS FOUND:`);
    console.log(hosts);
    console.log(`\n✅ FINAL LEGACY URL:`);
    // Atlas replica sets usually require specific suffix parameters:
    console.log(`mongodb://finemedia_admin:finemedia@${hosts}/finemedia?ssl=true&replicaSet=atlas-fiasskl-shard-0&authSource=admin&retryWrites=true&w=majority`);
  } else {
    console.log('No shards found for this cluster block.');
  }
});
