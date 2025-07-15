const https = require('https');
const { performance } = require('perf_hooks');

// Test image URL from your error
const testImageUrl = 'https://cdn.sanity.io/images/ytu6ofa6/production/b57674c9d5291a25af28a4b2aebf93dfb1dd985c-5843x3901.jpg?fit=max&auto=format&w=1920&q=75';

function testImageLoad(url) {
    return new Promise((resolve, reject) => {
        const startTime = performance.now();

        https.get(url, (res) => {
            const endTime = performance.now();
            const duration = endTime - startTime;

            console.log(`Image load time: ${duration.toFixed(2)}ms`);
            console.log(`Status: ${res.statusCode}`);
            console.log(`Content-Type: ${res.headers['content-type']}`);
            console.log(`Content-Length: ${res.headers['content-length']} bytes`);

            resolve({ duration, statusCode: res.statusCode });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function runTest() {
    console.log('Testing image loading performance...\n');

    try {
        await testImageLoad(testImageUrl);
    } catch (error) {
        console.error('Error testing image:', error.message);
    }
}

runTest(); 