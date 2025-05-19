const esbuild = require('esbuild');

// esbuild.build({
//   entryPoints: ['src/javascript/memberships.js'], // Your main JavaScript file
//   bundle: true,
//   minify: true,           // Optional, but recommended for production
//   outfile: 'dist/bundle.js', // Output file
//   format: 'esm',        // Important for modern browsers
// }).catch(() => process.exit(1));
// 
esbuild.build({
  entryPoints: {
    'memberships': 'src/javascript/memberships.js', // First entry point and output name (without .js)
    'about': 'src/javascript/about.js', // Second entry point and output name
    // Add more entry points as needed
  },
  bundle: true,
  minify: true,
  outdir: 'dist', // Output directory for both bundles
  format: 'esm',
}).catch(() => process.exit(1));