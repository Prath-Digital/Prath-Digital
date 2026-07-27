// This script dynamically updates relative and absolute links based on whether 
// the site is running locally or deployed on GitHub Pages.
document.addEventListener('DOMContentLoaded', () => {
    // Check if running on localhost
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Set your GitHub repository name here
    const repoName = '/Prath-Digital'; 
    const baseUrl = isLocal ? '' : repoName;

    if (baseUrl) {
        // Fix standard anchor links (navbar, footer, etc.)
        document.querySelectorAll('a').forEach(link => {
            let href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                if (!href.startsWith(baseUrl)) {
                    link.setAttribute('href', baseUrl + href);
                }
            }
        });
        
        // Fix images, stylesheets, and scripts
        document.querySelectorAll('link[rel="stylesheet"], script, img').forEach(el => {
            let attr = el.tagName === 'LINK' ? 'href' : 'src';
            let val = el.getAttribute(attr);
            if (val && val.startsWith('/') && !val.startsWith('//')) {
                if (!val.startsWith(baseUrl)) {
                    el.setAttribute(attr, baseUrl + val);
                }
            }
        });
    }
});
